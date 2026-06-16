import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const eventType = z.enum(['WEBINAR', 'SUMMIT', 'WORKSHOP', 'MASTERCLASS', 'COMMUNITY_CALL', 'OTHER']);
const locationType = z.enum(['ONLINE', 'IN_PERSON', 'HYBRID']);
const eventStatus = z.enum(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']);

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().min(1).optional(),
  fullDescription: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional().nullable(),
  eventType: eventType.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  timezone: z.string().optional(),
  locationType: locationType.optional(),
  locationDetail: z.string().optional().nullable(),
  registrationLink: z.string().url().optional().nullable(),
  isFree: z.boolean().optional(),
  status: eventStatus.optional(),
  featured: z.boolean().optional(),
  maxAttendees: z.number().int().positive().optional().nullable(),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return notFound('Event not found');
    return jsonOk(event);
  } catch (err) {
    console.error('[admin/events/[id] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) return notFound('Event not found');

    const body = await req.json();
    const parsed = updateEventSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugTaken = await prisma.event.findUnique({ where: { slug: parsed.data.slug } });
      if (slugTaken) return jsonError('Slug already in use', 409);
    }

    const { startDate, endDate, ...rest } = parsed.data;
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate ? { startDate: new Date(startDate) } : {}),
        ...(endDate ? { endDate: new Date(endDate) } : {}),
      },
    });

    await logActivity({
      action: 'EVENT_UPDATED',
      entity: 'Event',
      entityId: event.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(event);
  } catch (err) {
    console.error('[admin/events/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) return notFound('Event not found');

    await prisma.event.delete({ where: { id } });

    await logActivity({
      action: 'EVENT_DELETED',
      entity: 'Event',
      entityId: id,
      details: existing.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/events/[id] DELETE]', err);
    return serverError();
  }
}
