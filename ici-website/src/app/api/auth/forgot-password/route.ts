import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { sendPasswordReset } from '@/lib/email';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user || user.status !== 'ACTIVE') {
      return jsonOk({ success: true });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    await sendPasswordReset({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[auth/forgot-password POST]', err);
    return serverError();
  }
}
