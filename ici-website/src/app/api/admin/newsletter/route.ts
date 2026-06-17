import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const newsletterSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return jsonOk(newsletters);
  } catch (err) {
    console.error('[admin/newsletter GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { id, title, content, imageUrl } = parsed.data;
    const image = imageUrl?.trim() || null;

    let newsletter;

    if (id) {
      const existing = await prisma.newsletter.findUnique({ where: { id } });
      if (!existing) return jsonError('Newsletter not found', 404);

      newsletter = await prisma.newsletter.update({
        where: { id },
        data: {
          title,
          content,
          imageUrl: image,
          ...(existing.status === 'DRAFT' ? { status: 'DRAFT' as const } : {}),
        },
      });
    } else {
      newsletter = await prisma.newsletter.create({
        data: { title, content, imageUrl: image, status: 'DRAFT' },
      });
    }

    await logActivity({
      action: id ? 'NEWSLETTER_DRAFT_UPDATED' : 'NEWSLETTER_DRAFT_CREATED',
      entity: 'Newsletter',
      entityId: newsletter.id,
      details: newsletter.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(newsletter, id ? 200 : 201);
  } catch (err) {
    console.error('[admin/newsletter POST]', err);
    return serverError();
  }
}
