import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { slugifyCoachName } from '@/lib/coach-labels';
import { coachApiError, coachUpdateSchema } from '@/lib/coach-admin';

type RouteParams = { params: Promise<{ id: string }> };

function revalidateCoachPages() {
  revalidatePath('/find-a-coach');
  revalidatePath('/faculty');
  revalidatePath('/about/leadership-faculty');
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.coach.findUnique({ where: { id } });
    if (!existing) return notFound('Coach not found');

    const body = await req.json();
    const parsed = coachUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    const slug = data.slug !== undefined ? slugifyCoachName(data.slug) : undefined;

    if (slug && slug !== existing.slug) {
      const taken = await prisma.coach.findFirst({
        where: { slug, NOT: { id } },
        select: { id: true },
      });
      if (taken) return jsonError('That URL slug is already in use');
    }

    const coach = await prisma.coach.update({
      where: { id },
      data: {
        ...(slug !== undefined ? { slug } : {}),
        ...(data.name !== undefined ? { name: data.name.trim() } : {}),
        ...(data.title !== undefined ? { title: data.title.trim() } : {}),
        ...(data.bio !== undefined ? { bio: data.bio.trim() } : {}),
        ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl?.trim() || null } : {}),
        ...(data.specialisation !== undefined ? { specialisation: data.specialisation } : {}),
        ...(data.credentialLevel !== undefined ? { credentialLevel: data.credentialLevel } : {}),
        ...(data.languages !== undefined ? { languages: data.languages.trim() || 'English' } : {}),
        ...(data.location !== undefined ? { location: data.location?.trim() || null } : {}),
        ...(data.availability !== undefined ? { availability: data.availability } : {}),
        ...(data.bookingUrl !== undefined ? { bookingUrl: data.bookingUrl } : {}),
        ...(data.email !== undefined ? { email: data.email?.trim() || null } : {}),
        ...(data.linkedinUrl !== undefined ? { linkedinUrl: data.linkedinUrl } : {}),
        ...(data.showOnFaculty !== undefined ? { showOnFaculty: data.showOnFaculty } : {}),
        ...(data.showInDirectory !== undefined ? { showInDirectory: data.showInDirectory } : {}),
        ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
        ...(data.displayOrder !== undefined ? { displayOrder: data.displayOrder } : {}),
      },
    });

    revalidateCoachPages();

    await logActivity({
      action: 'COACH_UPDATED',
      entity: 'Coach',
      entityId: coach.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(coach);
  } catch (err) {
    return coachApiError(err, '[admin/coaches/[id] PUT]');
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.coach.findUnique({ where: { id } });
    if (!existing) return notFound('Coach not found');

    await prisma.coach.delete({ where: { id } });

    revalidateCoachPages();

    await logActivity({
      action: 'COACH_DELETED',
      entity: 'Coach',
      entityId: id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    return coachApiError(err, '[admin/coaches/[id] DELETE]');
  }
}
