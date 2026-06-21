import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { restorePageVersion, getPageWithFields } from '@/lib/cms';
import { logActivity } from '@/lib/activity';
import { resolvePageSlug } from '@/lib/admin-utils';

type RouteParams = { params: Promise<{ versionId: string; slug: string[] }> };

export async function POST(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug, versionId } = await params;
    const slug = resolvePageSlug(rawSlug);

    await restorePageVersion(slug, versionId, session.user.id, session.user.name);

    await logActivity({
      action: 'PAGE_VERSION_RESTORED',
      entity: 'Page',
      entityId: slug,
      details: versionId,
      userId: session.user.id,
      userName: session.user.name,
    });

    const page = await getPageWithFields(slug);
    if (!page) return notFound('Page not found');
    return jsonOk(page);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Page not found') return notFound('Page not found');
      if (err.message === 'Version not found') return notFound('Version not found');
    }
    console.error('[admin/pages/restore/[versionId]/[...slug] POST]', err);
    return serverError();
  }
}
