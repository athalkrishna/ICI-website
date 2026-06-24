import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { slugifyCoachName } from '@/lib/coach-labels';

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);
const specialisation = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
]);
const availability = z.enum(['TAKING_CLIENTS', 'WAITLIST']);

const coachSchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
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

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = slugifyCoachName(base);
  if (!slug) slug = 'coach';
  let candidate = slug;
  let n = 0;
  while (true) {
    const existing = await prisma.coach.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    n += 1;
    candidate = `${slug}-${n}`;
  }
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');

    const coaches = await prisma.coach.findMany({
      where:
        published !== null && published !== ''
          ? { isPublished: published === 'true' }
          : undefined,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    return jsonOk(coaches);
  } catch (err) {
    console.error('[admin/coaches GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = coachSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    const slug = data.slug?.trim()
      ? slugifyCoachName(data.slug)
      : await uniqueSlug(data.name);

    const coach = await prisma.coach.create({
      data: {
        slug,
        name: data.name.trim(),
        title: data.title.trim(),
        bio: data.bio.trim(),
        imageUrl: data.imageUrl?.trim() || null,
        specialisation: data.specialisation ?? null,
        credentialLevel: data.credentialLevel ?? null,
        languages: data.languages?.trim() || 'English',
        location: data.location?.trim() || null,
        availability: data.availability ?? 'TAKING_CLIENTS',
        bookingUrl: data.bookingUrl?.trim() || null,
        email: data.email?.trim() || null,
        linkedinUrl: data.linkedinUrl?.trim() || null,
        showOnFaculty: data.showOnFaculty ?? false,
        showInDirectory: data.showInDirectory ?? true,
        isPublished: data.isPublished ?? false,
        displayOrder: data.displayOrder ?? 0,
      },
    });

    await logActivity({
      action: 'COACH_CREATED',
      entity: 'Coach',
      entityId: coach.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    revalidatePath('/find-a-coach');
    revalidatePath('/faculty');

    return jsonOk(coach, 201);
  } catch (err) {
    console.error('[admin/coaches POST]', err);
    return serverError();
  }
}
