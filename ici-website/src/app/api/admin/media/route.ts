import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, serverError } from '@/lib/api';

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const fileType = searchParams.get('fileType');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10)));
    const skip = (page - 1) * limit;

    const where = fileType ? { fileType: fileType as 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' } : {};

    const [files, total] = await Promise.all([
      prisma.mediaFile.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          uploader: { select: { id: true, name: true } },
        },
      }),
      prisma.mediaFile.count({ where }),
    ]);

    return jsonOk({ files, total, page, limit });
  } catch (err) {
    console.error('[admin/media GET]', err);
    return serverError();
  }
}
