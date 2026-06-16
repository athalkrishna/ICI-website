import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin, requireSuperAdmin, hashPassword } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, forbidden, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const userStatus = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']).optional(),
  status: userStatus.optional(),
  password: z.string().min(8).optional(),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatarUrl: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) return notFound('User not found');
    if (user.role === 'STUDENT') return notFound('User not found');
    return jsonOk(user);
  } catch (err) {
    console.error('[admin/users/[id] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireSuperAdmin();
  if (!session) return forbidden();

  try {
    const { id } = await params;

    if (id === session.user.id) {
      return jsonError('You cannot modify your own account through this endpoint');
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return notFound('User not found');
    if (existing.role === 'STUDENT') return notFound('User not found');

    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { password, email, ...rest } = parsed.data;

    if (email && email.toLowerCase().trim() !== existing.email) {
      const taken = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (taken) return jsonError('Email already in use', 409);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        ...(email ? { email: email.toLowerCase().trim() } : {}),
        ...(password ? { password: await hashPassword(password) } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatarUrl: true,
        lastLoginAt: true,
        updatedAt: true,
      },
    });

    await logActivity({
      action: 'ADMIN_USER_UPDATED',
      entity: 'User',
      entityId: user.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(user);
  } catch (err) {
    console.error('[admin/users/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireSuperAdmin();
  if (!session) return forbidden();

  try {
    const { id } = await params;

    if (id === session.user.id) {
      return jsonError('You cannot delete your own account');
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return notFound('User not found');
    if (existing.role === 'STUDENT') return notFound('User not found');

    await prisma.user.delete({ where: { id } });

    await logActivity({
      action: 'ADMIN_USER_DELETED',
      entity: 'User',
      entityId: id,
      details: existing.name,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/users/[id] DELETE]', err);
    return serverError();
  }
}
