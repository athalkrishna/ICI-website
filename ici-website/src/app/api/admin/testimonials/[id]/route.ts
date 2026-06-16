import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);

const updateTestimonialSchema = z.object({
  studentName: z.string().min(1).optional(),
  studentTitle: z.string().min(1).optional(),
  studentLocation: z.string().min(1).optional(),
  studentAvatarUrl: z.string().url().optional().nullable(),
  credentialLevel: enrolledLevel.optional(),
  quote: z.string().min(1).optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return notFound('Testimonial not found');

    const body = await req.json();
    const parsed = updateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath('/');

    await logActivity({
      action: 'TESTIMONIAL_UPDATED',
      entity: 'Testimonial',
      entityId: testimonial.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(testimonial);
  } catch (err) {
    console.error('[admin/testimonials/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return notFound('Testimonial not found');

    await prisma.testimonial.delete({ where: { id } });

    revalidatePath('/');

    await logActivity({
      action: 'TESTIMONIAL_DELETED',
      entity: 'Testimonial',
      entityId: id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/testimonials/[id] DELETE]', err);
    return serverError();
  }
}
