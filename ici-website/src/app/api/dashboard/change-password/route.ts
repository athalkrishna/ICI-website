import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireStudent, verifyPassword, hashPassword } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: NextRequest) {
  const session = await requireStudent();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return unauthorized();

    const valid = await verifyPassword(parsed.data.currentPassword, user.password);
    if (!valid) {
      return jsonError('Current password is incorrect');
    }

    const hashedPassword = await hashPassword(parsed.data.newPassword);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[dashboard/change-password POST]', err);
    return serverError();
  }
}
