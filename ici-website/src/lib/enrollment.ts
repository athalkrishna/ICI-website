import type { EnrolledLevel, EnrolmentSource } from '@prisma/client';
import { prisma } from './prisma';
import { hashPassword, generateTempPassword } from './auth';
import { sendWelcomeStudent } from './email';
import { syncMaterialAccessForStudent } from './material-access';

const LEVEL_MAP: Record<string, EnrolledLevel> = {
  catalyst: 'CATALYST',
  architect: 'ARCHITECT',
  sage: 'SAGE',
  luminary: 'LUMINARY',
};

export function checkoutLevelToEnrolledLevel(levelId: string): EnrolledLevel | null {
  return LEVEL_MAP[levelId.toLowerCase()] ?? null;
}

export type CreateStudentInput = {
  email: string;
  name: string;
  phone?: string | null;
  country?: string | null;
  enrolledLevel?: EnrolledLevel | null;
  enrolmentSource?: EnrolmentSource;
  studentStatus?: 'ENROLLED' | 'ACTIVE';
  notes?: string | null;
  tempPassword?: string;
};

export type CreateStudentResult = {
  userId: string;
  profileId: string;
  email: string;
  tempPassword: string;
  loginUrl: string;
};

/** Create dashboard student account + profile, sync materials, send welcome email. */
export async function createStudentAccount(
  input: CreateStudentInput,
  options?: { sendWelcomeEmail?: boolean; actorUserId?: string },
): Promise<CreateStudentResult> {
  const email = input.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('A user with this email already exists');
  }

  const tempPassword = input.tempPassword ?? generateTempPassword();
  const hashedPassword = await hashPassword(tempPassword);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        name: input.name,
        password: hashedPassword,
        role: 'STUDENT',
        status: 'ACTIVE',
      },
    });

    const profile = await tx.studentProfile.create({
      data: {
        userId: user.id,
        phone: input.phone,
        country: input.country,
        enrolledLevel: input.enrolledLevel,
        enrolmentDate: new Date(),
        studentStatus: input.studentStatus ?? 'ENROLLED',
        enrolmentSource: input.enrolmentSource ?? 'MANUAL',
        notes: input.notes,
      },
    });

    return { user, profile };
  });

  const actorId = options?.actorUserId ?? result.user.id;
  if (input.enrolledLevel) {
    await syncMaterialAccessForStudent(result.user.id, input.enrolledLevel, actorId);
  }

  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;

  if (options?.sendWelcomeEmail !== false) {
    await sendWelcomeStudent({
      to: email,
      name: input.name,
      level: input.enrolledLevel ?? 'ICI Programme',
      tempPassword,
    });
  }

  return {
    userId: result.user.id,
    profileId: result.profile.id,
    email,
    tempPassword,
    loginUrl,
  };
}
