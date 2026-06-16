import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireStudent } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  directoryOptIn: z.boolean().optional(),
});

export async function GET() {
  const session = await requireStudent();
  if (!session) return unauthorized();

  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!profile) return notFound('Student profile not found');
    return jsonOk(profile);
  } catch (err) {
    console.error('[dashboard/profile GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireStudent();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { name, ...profileData } = parsed.data;

    const profile = await prisma.$transaction(async (tx) => {
      if (name) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { name },
        });
      }

      return tx.studentProfile.update({
        where: { userId: session.user.id },
        data: profileData,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      });
    });

    return jsonOk(profile);
  } catch (err) {
    console.error('[dashboard/profile PUT]', err);
    return serverError();
  }
}
