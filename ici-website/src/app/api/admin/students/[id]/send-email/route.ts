import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { sendCustomEmail } from '@/lib/email';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const sendEmailSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function POST(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = sendEmailSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    const sent = await sendCustomEmail({
      to: profile.user.email,
      toName: profile.user.name,
      subject: parsed.data.subject,
      body: parsed.data.body,
    });

    await logActivity({
      action: 'CUSTOM_EMAIL_SENT',
      entity: 'StudentProfile',
      entityId: profile.id,
      details: parsed.data.subject,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ sent });
  } catch (err) {
    console.error('[admin/students/[id]/send-email POST]', err);
    return serverError();
  }
}
