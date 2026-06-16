import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { uploadToBunny, detectMediaType } from '@/lib/bunny';
import { logActivity } from '@/lib/activity';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string | null) ?? null;

    if (!file) return jsonError('No file uploaded');

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return jsonError('Invalid file type. Allowed: JPEG, PNG, WebP, SVG, PDF.');
    }

    if (file.size > MAX_SIZE) {
      return jsonError('File size exceeds 5MB limit');
    }

    const ext = file.name.split('.').pop() ?? 'bin';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const buffer = await file.arrayBuffer();
    const mimeType = file.type;

    const { url, path } = await uploadToBunny(buffer, fileName, mimeType, 'media');
    const fileType = detectMediaType(mimeType);

    const mediaFile = await prisma.mediaFile.create({
      data: {
        fileName: file.name,
        bunnyUrl: url,
        bunnyPath: path,
        fileType,
        mimeType,
        fileSizeBytes: file.size,
        altText,
        uploadedBy: session.user.id,
      },
      include: {
        uploader: { select: { id: true, name: true } },
      },
    });

    await logActivity({
      action: 'MEDIA_UPLOADED',
      entity: 'MediaFile',
      entityId: mediaFile.id,
      details: file.name,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ url, id: mediaFile.id, mediaFile });
  } catch (err) {
    console.error('[admin/media/upload POST]', err);
    return serverError(err instanceof Error ? err.message : undefined);
  }
}
