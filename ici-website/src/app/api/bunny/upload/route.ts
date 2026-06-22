import { NextRequest } from 'next/server';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { authorizeBunnyRequest } from '@/lib/bunny-auth';
import { detectMediaType, uploadToBunny } from '@/lib/bunny';

const MAX_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
];

export async function POST(req: NextRequest) {
  if (!(await authorizeBunnyRequest(req))) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = ((formData.get('folder') as string | null) ?? 'media').replace(/^\/+|\/+$/g, '');

    if (!file) return jsonError('No file uploaded');

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return jsonError('Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG, PDF.');
    }

    if (file.size > MAX_SIZE) {
      return jsonError('File size exceeds 10MB limit');
    }

    const ext = file.name.split('.').pop() ?? 'bin';
    const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '-');
    const fileName = `${baseName}.${ext}`;
    const buffer = await file.arrayBuffer();
    const { url, path } = await uploadToBunny(buffer, fileName, file.type, folder);

    return jsonOk({
      url,
      path,
      fileType: detectMediaType(file.type),
      fileName: file.name,
    });
  } catch (err) {
    console.error('[api/bunny/upload POST]', err);
    return serverError(err instanceof Error ? err.message : undefined);
  }
}
