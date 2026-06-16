import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { sendCourseAccessGranted } from '@/lib/email';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const grantAccessSchema = z.object({
  materialId: z.string().min(1),
});

export async function POST(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = grantAccessSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    const material = await prisma.courseMaterial.findUnique({
      where: { id: parsed.data.materialId },
    });
    if (!material) return notFound('Material not found');

    const access = await prisma.studentMaterialAccess.upsert({
      where: {
        studentUserId_materialId: {
          studentUserId: profile.userId,
          materialId: material.id,
        },
      },
      create: {
        studentUserId: profile.userId,
        materialId: material.id,
        grantedBy: session.user.id,
      },
      update: {
        grantedBy: session.user.id,
        grantedAt: new Date(),
      },
      include: { material: true },
    });

    await sendCourseAccessGranted({
      to: profile.user.email,
      name: profile.user.name,
      materialTitle: material.title,
      description: material.description,
    });

    await logActivity({
      action: 'MATERIAL_ACCESS_GRANTED',
      entity: 'StudentMaterialAccess',
      entityId: access.id,
      details: `${profile.user.name} → ${material.title}`,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(access, 201);
  } catch (err) {
    console.error('[admin/students/[id]/grant-access POST]', err);
    return serverError();
  }
}
