import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, forbidden, serverError } from '@/lib/api';
import { getPageWithFields, savePageDraft } from '@/lib/cms';
import { logActivity } from '@/lib/activity';
import { resolvePageSlug } from '@/lib/admin-utils';

type RouteParams = { params: Promise<{ slug: string[] }> };

const saveDraftSchema = z.object({
  fields: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string().nullable(),
    })
  ),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug } = await params;
    const slug = resolvePageSlug(rawSlug);
    const page = await getPageWithFields(slug);
    if (!page) return notFound('Page not found');
    return jsonOk(page);
  } catch (err) {
    console.error('[admin/pages/[...slug] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug } = await params;
    const slug = resolvePageSlug(rawSlug);
    const body = await req.json();
    const parsed = saveDraftSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    await savePageDraft(slug, parsed.data.fields, session.user.id, session.user.name);

    await logActivity({
      action: 'PAGE_DRAFT_SAVED',
      entity: 'Page',
      entityId: slug,
      userId: session.user.id,
      userName: session.user.name,
    });

    const page = await getPageWithFields(slug);
    return jsonOk(page);
  } catch (err) {
    if (err instanceof Error && err.message === 'Page not found') return notFound();
    console.error('[admin/pages/[...slug] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { slug: rawSlug } = await params;
    const slug = resolvePageSlug(rawSlug);
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return notFound('Page not found');
    if (page.isSystem) return forbidden('System pages cannot be deleted');

    await prisma.page.delete({ where: { id: page.id } });

    await logActivity({
      action: 'PAGE_DELETED',
      entity: 'Page',
      entityId: page.id,
      details: slug,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/pages/[...slug] DELETE]', err);
    return serverError();
  }
}
