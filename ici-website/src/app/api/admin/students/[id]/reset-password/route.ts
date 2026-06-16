import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, hashPassword, generateTempPassword } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { sendCustomEmail } from '@/lib/email';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    const tempPassword = generateTempPassword();
    const hashedPassword = await hashPassword(tempPassword);

    await prisma.user.update({
      where: { id: profile.userId },
      data: { password: hashedPassword },
    });

    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;

    await sendCustomEmail({
      to: profile.user.email,
      toName: profile.user.name,
      subject: 'Your ICI password has been reset',
      body: `<p>Dear ${profile.user.name},</p>
        <p>An administrator has reset your password.</p>
        <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a><br>
        <strong>Email:</strong> ${profile.user.email}<br>
        <strong>Temporary password:</strong> ${tempPassword}</p>
        <p>Please log in and change your password immediately.</p>`,
    });

    await logActivity({
      action: 'PASSWORD_RESET_BY_ADMIN',
      entity: 'User',
      entityId: profile.userId,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({
      email: profile.user.email,
      name: profile.user.name,
      tempPassword,
      loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`,
    });
  } catch (err) {
    console.error('[admin/students/[id]/reset-password POST]', err);
    return serverError();
  }
}
