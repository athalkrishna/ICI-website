import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { publishPage, slugToPath, getPageWithFields } from '@/lib/cms';
import { logActivity } from '@/lib/activity';
import { resolvePageSlug } from '@/lib/admin-utils';

type RouteParams = { params: Promise<{ slug: string }> };

export async function POST(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug } = await params;
    const slug = resolvePageSlug(rawSlug);

    await publishPage(slug, session.user.id, session.user.name);
    revalidatePath(slugToPath(slug));
    if (slug === 'global') {
      revalidatePath('/', 'layout');
    }

    await logActivity({
      action: 'PAGE_PUBLISHED',
      entity: 'Page',
      entityId: slug,
      userId: session.user.id,
      userName: session.user.name,
    });

    const page = await getPageWithFields(slug);
    if (!page) return notFound('Page not found');
    return jsonOk(page);
  } catch (err) {
    if (err instanceof Error && err.message === 'Page not found') return notFound();
    console.error('[admin/pages/[slug]/publish POST]', err);
    return serverError();
  }
}
