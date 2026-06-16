import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string; materialId: string }> };

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id, materialId } = await params;

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    const access = await prisma.studentMaterialAccess.findUnique({
      where: {
        studentUserId_materialId: {
          studentUserId: profile.userId,
          materialId,
        },
      },
      include: { material: true },
    });
    if (!access) return notFound('Access record not found');

    await prisma.studentMaterialAccess.delete({ where: { id: access.id } });

    await logActivity({
      action: 'MATERIAL_ACCESS_REVOKED',
      entity: 'StudentMaterialAccess',
      entityId: access.id,
      details: `${profile.user.name} ← ${access.material.title}`,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/students/[id]/revoke-access DELETE]', err);
    return serverError();
  }
}
