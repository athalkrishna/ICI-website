import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);

const createTestimonialSchema = z.object({
  studentName: z.string().min(1),
  studentTitle: z.string().min(1),
  studentLocation: z.string().min(1),
  studentAvatarUrl: z.string().url().optional().nullable(),
  credentialLevel: enrolledLevel,
  quote: z.string().min(1),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');

    const testimonials = await prisma.testimonial.findMany({
      where:
        published !== null && published !== ''
          ? { isPublished: published === 'true' }
          : undefined,
      orderBy: { displayOrder: 'asc' },
    });

    return jsonOk(testimonials);
  } catch (err) {
    console.error('[admin/testimonials GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        ...parsed.data,
        isPublished: parsed.data.isPublished ?? false,
        displayOrder: parsed.data.displayOrder ?? 0,
      },
    });

    await logActivity({
      action: 'TESTIMONIAL_CREATED',
      entity: 'Testimonial',
      entityId: testimonial.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(testimonial, 201);
  } catch (err) {
    console.error('[admin/testimonials POST]', err);
    return serverError();
  }
}
