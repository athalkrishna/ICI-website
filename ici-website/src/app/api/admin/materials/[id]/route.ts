import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { deleteFromBunny } from '@/lib/bunny';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const materialLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY', 'ALL_LEVELS']);
const fileType = z.enum(['PDF', 'VIDEO', 'AUDIO', 'DOCUMENT', 'PRESENTATION', 'OTHER']);

const updateMaterialSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  fileUrl: z.string().url().optional(),
  bunnyPath: z.string().min(1).optional(),
  fileName: z.string().min(1).optional(),
  fileType: fileType.optional(),
  fileSizeBytes: z.number().int().nonnegative().optional(),
  level: materialLevel.optional(),
  moduleNumber: z.number().int().positive().optional(),
  isPublished: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.courseMaterial.findUnique({ where: { id } });
    if (!existing) return notFound('Material not found');

    const body = await req.json();
    const parsed = updateMaterialSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const material = await prisma.courseMaterial.update({
      where: { id },
      data: parsed.data,
    });

    await logActivity({
      action: 'MATERIAL_UPDATED',
      entity: 'CourseMaterial',
      entityId: material.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(material);
  } catch (err) {
    console.error('[admin/materials/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.courseMaterial.findUnique({ where: { id } });
    if (!existing) return notFound('Material not found');

    await prisma.courseMaterial.delete({ where: { id } });

    try {
      await deleteFromBunny(existing.bunnyPath);
    } catch (bunnyErr) {
      console.warn('[admin/materials/[id] DELETE] Bunny delete failed:', bunnyErr);
    }

    await logActivity({
      action: 'MATERIAL_DELETED',
      entity: 'CourseMaterial',
      entityId: id,
      details: existing.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/materials/[id] DELETE]', err);
    return serverError();
  }
}
