import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const eventType = z.enum(['WEBINAR', 'SUMMIT', 'WORKSHOP', 'MASTERCLASS', 'COMMUNITY_CALL', 'OTHER']);
const locationType = z.enum(['ONLINE', 'IN_PERSON', 'HYBRID']);
const eventStatus = z.enum(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']);

const createEventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().min(1),
  fullDescription: z.string().min(1),
  coverImageUrl: z.string().url().optional().nullable(),
  eventType: eventType,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  timezone: z.string().optional(),
  locationType: locationType,
  locationDetail: z.string().optional().nullable(),
  registrationLink: z.string().url().optional().nullable(),
  isFree: z.boolean().optional(),
  status: eventStatus.optional(),
  featured: z.boolean().optional(),
  maxAttendees: z.number().int().positive().optional().nullable(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const events = await prisma.event.findMany({
      where: status ? { status: status as z.infer<typeof eventStatus> } : undefined,
      orderBy: { startDate: 'desc' },
    });

    return jsonOk(events);
  } catch (err) {
    console.error('[admin/events GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createEventSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    let slug = data.slug ?? slugify(data.title);

    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        fullDescription: data.fullDescription,
        coverImageUrl: data.coverImageUrl,
        eventType: data.eventType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        timezone: data.timezone ?? 'Asia/Kolkata',
        locationType: data.locationType,
        locationDetail: data.locationDetail,
        registrationLink: data.registrationLink,
        isFree: data.isFree ?? true,
        status: data.status ?? 'UPCOMING',
        featured: data.featured ?? false,
        maxAttendees: data.maxAttendees,
      },
    });

    await logActivity({
      action: 'EVENT_CREATED',
      entity: 'Event',
      entityId: event.id,
      details: event.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(event, 201);
  } catch (err) {
    console.error('[admin/events POST]', err);
    return serverError();
  }
}
