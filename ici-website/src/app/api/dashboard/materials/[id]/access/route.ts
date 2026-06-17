import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStudent } from '@/lib/auth';
import { jsonOk, unauthorized, forbidden, notFound, serverError } from '@/lib/api';
import { getSignedUrl } from '@/lib/bunny';
import { canStudentAccessMaterial } from '@/lib/material-access';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireStudent();
  if (!session) return unauthorized();

  try {
    const { id } = await params;

    const [material, profile, explicitAccess] = await Promise.all([
      prisma.courseMaterial.findUnique({ where: { id } }),
      prisma.studentProfile.findUnique({
        where: { userId: session.user.id },
        select: { enrolledLevel: true },
      }),
      prisma.studentMaterialAccess.findUnique({
        where: {
          studentUserId_materialId: {
            studentUserId: session.user.id,
            materialId: id,
          },
        },
      }),
    ]);

    if (!material) return notFound('Material not found');
    if (!material.isPublished) return forbidden('Material is not available');

    if (
      !canStudentAccessMaterial(
        material,
        profile?.enrolledLevel,
        explicitAccess !== null,
      )
    ) {
      return notFound('Material not found or access not granted');
    }

    const signedUrl = getSignedUrl(material.bunnyPath);

    return jsonOk({
      url: signedUrl,
      title: material.title,
      fileType: material.fileType,
      expiresIn: 900,
    });
  } catch (err) {
    console.error('[dashboard/materials/[id]/access GET]', err);
    return serverError();
  }
}
