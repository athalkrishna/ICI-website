import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, serverError } from '@/lib/api';

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '25', 10)));
    const skip = (page - 1) * limit;
    const template = searchParams.get('template');
    const status = searchParams.get('status');

    const where = {
      ...(template ? { templateUsed: template as never } : {}),
      ...(status ? { status: status as never } : {}),
    };

    const [logs, total] = await Promise.all([
      prisma.emailLog.findMany({
        where,
        orderBy: { sentAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.emailLog.count({ where }),
    ]);

    return jsonOk({ logs, total, page, limit });
  } catch (err) {
    console.error('[admin/email-logs GET]', err);
    return serverError();
  }
}
