import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { deleteFromBunny } from '@/lib/bunny';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  altText: z.string().max(500).nullable(),
});

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) return jsonError('Invalid alt text');

    const existing = await prisma.mediaFile.findUnique({ where: { id } });
    if (!existing) return notFound('Media file not found');

    const altText = parsed.data.altText?.trim() || null;

    const media = await prisma.mediaFile.update({
      where: { id },
      data: { altText },
      include: {
        uploader: { select: { id: true, name: true } },
      },
    });

    await logActivity({
      action: 'MEDIA_UPDATED',
      entity: 'MediaFile',
      entityId: id,
      details: `alt: ${altText ?? '(cleared)'}`,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(media);
  } catch (err) {
    console.error('[admin/media/[id] PATCH]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const media = await prisma.mediaFile.findUnique({ where: { id } });
    if (!media) return notFound('Media file not found');

    await prisma.mediaFile.delete({ where: { id } });

    try {
      await deleteFromBunny(media.bunnyPath);
    } catch (bunnyErr) {
      console.warn('[admin/media/[id] DELETE] Bunny delete failed:', bunnyErr);
    }

    await logActivity({
      action: 'MEDIA_DELETED',
      entity: 'MediaFile',
      entityId: id,
      details: media.fileName,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/media/[id] DELETE]', err);
    return serverError();
  }
}
