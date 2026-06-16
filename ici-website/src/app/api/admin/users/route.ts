import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin, requireSuperAdmin, hashPassword, generateTempPassword } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, forbidden, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const userStatus = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']),
  status: userStatus.optional(),
  password: z.string().min(8).optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
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
      orderBy: { name: 'asc' },
    });

    return jsonOk(users);
  } catch (err) {
    console.error('[admin/users GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireSuperAdmin();
  if (!session) return forbidden();

  try {
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const email = parsed.data.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return jsonError('A user with this email already exists', 409);

    const plainPassword = parsed.data.password ?? generateTempPassword();
    const hashedPassword = await hashPassword(plainPassword);

    const user = await prisma.user.create({
      data: {
        email,
        name: parsed.data.name,
        password: hashedPassword,
        role: parsed.data.role,
        status: parsed.data.status ?? 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await logActivity({
      action: 'ADMIN_USER_CREATED',
      entity: 'User',
      entityId: user.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ user, ...(parsed.data.password ? {} : { tempPassword: plainPassword }) }, 201);
  } catch (err) {
    console.error('[admin/users POST]', err);
    return serverError();
  }
}
