import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { formRateLimiter } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/leads';

const subscribeSchema = z.object({
  email: z.string().email('Valid email is required'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    try {
      await formRateLimiter.check(30, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid email');
    }

    const email = parsed.data.email.trim().toLowerCase();

    const existingStudent = await prisma.user.findFirst({
      where: { email, role: 'STUDENT', status: 'ACTIVE' },
      select: { id: true },
    });
    if (existingStudent) {
      return jsonOk({
        message: 'You are already on our mailing list as a registered student.',
      });
    }

    const optedOut = await prisma.newsletterOptOut.findUnique({ where: { email } });
    if (optedOut) {
      await prisma.$transaction([
        prisma.newsletterOptOut.delete({ where: { email } }),
        prisma.newsletterSubscriber.upsert({
          where: { email },
          create: { email },
          update: { unsubscribedAt: null, subscribedAt: new Date() },
        }),
      ]);
      return jsonOk({ message: 'Welcome back! You have been re-subscribed.' });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email },
      update: { unsubscribedAt: null },
    });

    return jsonOk({ message: 'Subscribed successfully. Thank you!' });
  } catch (err) {
    console.error('[newsletter/subscribe POST]', err);
    return serverError();
  }
}
