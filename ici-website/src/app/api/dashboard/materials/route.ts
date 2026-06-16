import { prisma } from '@/lib/prisma';
import { requireStudent } from '@/lib/auth';
import { jsonOk, unauthorized } from '@/lib/api';

export async function GET() {
  const session = await requireStudent();
  if (!session) return unauthorized();

  const access = await prisma.studentMaterialAccess.findMany({
    where: {
      studentUserId: session.user.id,
      material: { isPublished: true },
    },
    include: {
      material: true,
    },
    orderBy: { material: { moduleNumber: 'asc' } },
  });

  const materials = access.map((a) => ({
    id: a.material.id,
    title: a.material.title,
    description: a.material.description,
    fileType: a.material.fileType,
    moduleNumber: a.material.moduleNumber,
    level: a.material.level,
    grantedAt: a.grantedAt,
  }));

  return jsonOk(materials);
}
