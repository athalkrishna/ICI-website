import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { uploadToBunny, detectFileType } from '@/lib/bunny';

const MAX_SIZE = 100 * 1024 * 1024; // 100MB for course materials

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return jsonError('No file uploaded');

    if (file.size > MAX_SIZE) {
      return jsonError('File size exceeds 100MB limit');
    }

    const ext = file.name.split('.').pop() ?? 'bin';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const buffer = await file.arrayBuffer();
    const mimeType = file.type || 'application/octet-stream';

    const { url, path } = await uploadToBunny(buffer, fileName, mimeType, 'materials');
    const fileType = detectFileType(mimeType);

    return jsonOk({
      fileUrl: url,
      bunnyPath: path,
      fileName: file.name,
      fileType,
      fileSizeBytes: file.size,
      mimeType,
    });
  } catch (err) {
    console.error('[admin/materials/upload POST]', err);
    return serverError(err instanceof Error ? err.message : undefined);
  }
}
