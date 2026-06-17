import { prisma } from '@/lib/prisma';
import { requireStudent } from '@/lib/auth';
import { jsonOk, unauthorized } from '@/lib/api';
import { studentMaterialAccessOrConditions } from '@/lib/material-access';

export async function GET() {
  const session = await requireStudent();
  if (!session) return unauthorized();

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
    select: { enrolledLevel: true },
  });

  const materials = await prisma.courseMaterial.findMany({
    where: {
      isPublished: true,
      OR: studentMaterialAccessOrConditions(session.user.id, profile?.enrolledLevel),
    },
    include: {
      access: {
        where: { studentUserId: session.user.id },
        take: 1,
      },
    },
    orderBy: { moduleNumber: 'asc' },
  });

  return jsonOk(
    materials.map((material) => ({
      id: material.id,
      title: material.title,
      description: material.description,
      fileType: material.fileType,
      moduleNumber: material.moduleNumber,
      level: material.level,
      grantedAt: material.access[0]?.grantedAt ?? material.createdAt,
    })),
  );
}
