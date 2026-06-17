import { createPrismaClient } from '../prisma/db.ts';

const prisma = createPrismaClient();

const admin = await prisma.user.findFirst({
  where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
  select: { id: true },
});

if (!admin) {
  throw new Error('No admin user found');
}

const published = await prisma.courseMaterial.findMany({
  where: { isPublished: true },
});

for (const material of published) {
  const studentWhere =
    material.level === 'ALL_LEVELS'
      ? { deletedAt: null }
      : { deletedAt: null, enrolledLevel: material.level };

  const students = await prisma.studentProfile.findMany({
    where: studentWhere,
    select: { userId: true },
  });

  for (const student of students) {
    await prisma.studentMaterialAccess.upsert({
      where: {
        studentUserId_materialId: {
          studentUserId: student.userId,
          materialId: material.id,
        },
      },
      create: {
        studentUserId: student.userId,
        materialId: material.id,
        grantedBy: admin.id,
      },
      update: {
        grantedBy: admin.id,
        grantedAt: new Date(),
      },
    });
  }

  console.log(`Synced "${material.title}" → ${students.length} student(s)`);
}

await prisma.$disconnect();
