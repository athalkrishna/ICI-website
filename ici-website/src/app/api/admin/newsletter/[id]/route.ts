import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await context.params;
    const newsletter = await prisma.newsletter.findUnique({ where: { id } });
    if (!newsletter) return notFound('Newsletter not found');

    await prisma.newsletter.delete({ where: { id } });

    await logActivity({
      action: 'NEWSLETTER_DELETED',
      entity: 'Newsletter',
      entityId: id,
      details: newsletter.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/newsletter/[id] DELETE]', err);
    return serverError();
  }
}
