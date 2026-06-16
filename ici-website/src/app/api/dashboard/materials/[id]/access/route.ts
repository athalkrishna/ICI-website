import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStudent } from '@/lib/auth';
import { jsonOk, unauthorized, forbidden, notFound, serverError } from '@/lib/api';
import { getSignedUrl } from '@/lib/bunny';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireStudent();
  if (!session) return unauthorized();

  try {
    const { id } = await params;

    const access = await prisma.studentMaterialAccess.findUnique({
      where: {
        studentUserId_materialId: {
          studentUserId: session.user.id,
          materialId: id,
        },
      },
      include: { material: true },
    });

    if (!access) return notFound('Material not found or access not granted');
    if (!access.material.isPublished) return forbidden('Material is not available');

    const signedUrl = getSignedUrl(access.material.bunnyPath);

    return jsonOk({
      url: signedUrl,
      title: access.material.title,
      fileType: access.material.fileType,
      expiresIn: 900,
    });
  } catch (err) {
    console.error('[dashboard/materials/[id]/access GET]', err);
    return serverError();
  }
}
