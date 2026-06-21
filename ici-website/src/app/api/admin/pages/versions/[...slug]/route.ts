import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { resolvePageSlug } from '@/lib/admin-utils';

type RouteParams = { params: Promise<{ slug: string[] }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug } = await params;
    const slug = resolvePageSlug(rawSlug);
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return notFound('Page not found');

    const versions = await prisma.pageVersion.findMany({
      where: { pageId: page.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        action: true,
        createdBy: true,
        createdByName: true,
        createdAt: true,
      },
    });

    return jsonOk(versions);
  } catch (err) {
    console.error('[admin/pages/versions/[...slug] GET]', err);
    return serverError();
  }
}
