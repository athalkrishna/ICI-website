import type { EnrolledLevel, MaterialLevel, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export function materialMatchesStudentLevel(
  materialLevel: MaterialLevel,
  enrolledLevel: EnrolledLevel | null | undefined,
): boolean {
  if (materialLevel === 'ALL_LEVELS') return true;
  if (!enrolledLevel) return false;
  return materialLevel === enrolledLevel;
}

export function canStudentAccessMaterial(
  material: { isPublished: boolean; level: MaterialLevel },
  enrolledLevel: EnrolledLevel | null | undefined,
  hasExplicitAccess: boolean,
): boolean {
  if (!material.isPublished) return false;
  if (hasExplicitAccess) return true;
  return materialMatchesStudentLevel(material.level, enrolledLevel);
}

export function eligibleStudentsWhereForMaterial(
  materialLevel: MaterialLevel,
): Prisma.StudentProfileWhereInput {
  if (materialLevel === 'ALL_LEVELS') {
    return { deletedAt: null };
  }

  return {
    deletedAt: null,
    enrolledLevel: materialLevel,
  };
}

export function studentMaterialAccessOrConditions(
  studentUserId: string,
  enrolledLevel: EnrolledLevel | null | undefined,
) {
  const conditions: Array<
    | { access: { some: { studentUserId: string } } }
    | { level: EnrolledLevel | 'ALL_LEVELS' }
  > = [
    { access: { some: { studentUserId } } },
    { level: 'ALL_LEVELS' },
  ];

  if (enrolledLevel) {
    conditions.push({ level: enrolledLevel });
  }

  return conditions;
}

export async function syncMaterialAccessForMaterial(
  materialId: string,
  grantedByUserId: string,
) {
  const material = await prisma.courseMaterial.findUnique({ where: { id: materialId } });
  if (!material?.isPublished) return 0;

  const students = await prisma.studentProfile.findMany({
    where: eligibleStudentsWhereForMaterial(material.level),
    select: { userId: true },
  });

  if (students.length === 0) return 0;

  await prisma.$transaction(
    students.map((student) =>
      prisma.studentMaterialAccess.upsert({
        where: {
          studentUserId_materialId: {
            studentUserId: student.userId,
            materialId: material.id,
          },
        },
        create: {
          studentUserId: student.userId,
          materialId: material.id,
          grantedBy: grantedByUserId,
        },
        update: {
          grantedBy: grantedByUserId,
          grantedAt: new Date(),
        },
      }),
    ),
  );

  return students.length;
}

export async function syncMaterialAccessForStudent(
  studentUserId: string,
  enrolledLevel: EnrolledLevel | null | undefined,
  grantedByUserId: string,
) {
  if (!enrolledLevel) return 0;

  const materials = await prisma.courseMaterial.findMany({
    where: {
      isPublished: true,
      OR: [{ level: enrolledLevel }, { level: 'ALL_LEVELS' }],
    },
    select: { id: true },
  });

  if (materials.length === 0) return 0;

  await prisma.$transaction(
    materials.map((material) =>
      prisma.studentMaterialAccess.upsert({
        where: {
          studentUserId_materialId: {
            studentUserId,
            materialId: material.id,
          },
        },
        create: {
          studentUserId,
          materialId: material.id,
          grantedBy: grantedByUserId,
        },
        update: {},
      }),
    ),
  );

  return materials.length;
}
