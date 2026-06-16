import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { deleteFromBunny } from '@/lib/bunny';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

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
