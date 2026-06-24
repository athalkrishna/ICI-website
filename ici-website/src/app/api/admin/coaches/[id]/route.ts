import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { slugifyCoachName } from '@/lib/coach-labels';

type RouteParams = { params: Promise<{ id: string }> };

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);
const specialisation = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
]);
const availability = z.enum(['TAKING_CLIENTS', 'WAITLIST']);

const updateCoachSchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  imageUrl: z.string().optional().nullable(),
  specialisation: specialisation.optional().nullable(),
  credentialLevel: enrolledLevel.optional().nullable(),
  languages: z.string().optional(),
  location: z.string().optional().nullable(),
  availability: availability.optional(),
  bookingUrl: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal('')),
  linkedinUrl: z.string().url().optional().nullable().or(z.literal('')),
  showOnFaculty: z.boolean().optional(),
  showInDirectory: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

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
    const parsed = updateCoachSchema.safeParse(body);
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
        ...(data.bookingUrl !== undefined ? { bookingUrl: data.bookingUrl?.trim() || null } : {}),
        ...(data.email !== undefined ? { email: data.email?.trim() || null } : {}),
        ...(data.linkedinUrl !== undefined ? { linkedinUrl: data.linkedinUrl?.trim() || null } : {}),
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
    console.error('[admin/coaches/[id] PUT]', err);
    return serverError();
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
    console.error('[admin/coaches/[id] DELETE]', err);
    return serverError();
  }
}
