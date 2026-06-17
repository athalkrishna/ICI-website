import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { syncMaterialAccessForMaterial } from '@/lib/material-access';

const materialLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY', 'ALL_LEVELS']);
const fileType = z.enum(['PDF', 'VIDEO', 'AUDIO', 'DOCUMENT', 'PRESENTATION', 'OTHER']);

const createMaterialSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  fileUrl: z.string().url(),
  bunnyPath: z.string().min(1),
  fileName: z.string().min(1),
  fileType: fileType,
  fileSizeBytes: z.number().int().nonnegative(),
  level: materialLevel,
  moduleNumber: z.number().int().positive(),
  isPublished: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level');
    const published = searchParams.get('published');

    const materials = await prisma.courseMaterial.findMany({
      where: {
        ...(level ? { level: level as z.infer<typeof materialLevel> } : {}),
        ...(published !== null && published !== ''
          ? { isPublished: published === 'true' }
          : {}),
      },
      orderBy: [{ level: 'asc' }, { moduleNumber: 'asc' }],
      include: {
        _count: { select: { access: true } },
      },
    });

    return jsonOk(materials);
  } catch (err) {
    console.error('[admin/materials GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createMaterialSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const material = await prisma.courseMaterial.create({
      data: {
        ...parsed.data,
        isPublished: parsed.data.isPublished ?? false,
      },
    });

    if (material.isPublished) {
      await syncMaterialAccessForMaterial(material.id, session.user.id);
    }

    await logActivity({
      action: 'MATERIAL_CREATED',
      entity: 'CourseMaterial',
      entityId: material.id,
      details: material.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(material, 201);
  } catch (err) {
    console.error('[admin/materials POST]', err);
    return serverError();
  }
}
