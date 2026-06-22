import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { sendNewsletterToAll } from '@/lib/newsletter';
import {
  deriveLegacyFields,
  hasNewsletterContent,
  resolveNewsletterBlocks,
} from '@/lib/newsletter-payload';

const publishSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  blocks: z.array(z.unknown()).optional(),
  templateId: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = publishSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { id, title, templateId } = parsed.data;
    const image = parsed.data.imageUrl?.trim() || null;
    const blocks = resolveNewsletterBlocks(parsed.data.blocks, parsed.data.content, image);

    if (!hasNewsletterContent(blocks)) {
      return jsonError('Add at least one content block');
    }

    const legacy = deriveLegacyFields(blocks);

    let newsletter = id ? await prisma.newsletter.findUnique({ where: { id } }) : null;

    if (id && !newsletter) return notFound('Newsletter not found');

    if (newsletter) {
      newsletter = await prisma.newsletter.update({
        where: { id },
        data: {
          title,
          content: legacy.content,
          imageUrl: legacy.imageUrl,
          blocks,
          templateId: templateId ?? newsletter.templateId,
        },
      });
    } else {
      newsletter = await prisma.newsletter.create({
        data: {
          title,
          content: legacy.content,
          imageUrl: legacy.imageUrl,
          blocks,
          templateId: templateId ?? null,
          status: 'DRAFT',
        },
      });
    }

    const { recipientCount, sentCount, failedCount } = await sendNewsletterToAll({
      title,
      blocks,
    });

    const updated = await prisma.newsletter.update({
      where: { id: newsletter.id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        recipientCount,
        sentCount,
        failedCount,
      },
    });

    await logActivity({
      action: id ? 'NEWSLETTER_RESENT' : 'NEWSLETTER_PUBLISHED',
      entity: 'Newsletter',
      entityId: updated.id,
      details: `${updated.title} — ${sentCount}/${recipientCount} sent`,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({
      newsletter: updated,
      recipientCount,
      sentCount,
      failedCount,
    });
  } catch (err) {
    console.error('[admin/newsletter/publish POST]', err);
    return serverError();
  }
}
