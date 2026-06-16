import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin, hashPassword, generateTempPassword } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { sendWelcomeStudent } from '@/lib/email';
import { logActivity } from '@/lib/activity';

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);
const specialisation = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
]);
const studentStatus = z.enum([
  'ENQUIRY',
  'APPLIED',
  'ENROLLED',
  'ACTIVE',
  'COMPLETED',
  'DEFERRED',
  'WITHDRAWN',
]);

const createStudentSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  dateOfBirth: z.string().datetime().optional().nullable(),
  enrolledLevel: enrolledLevel.optional().nullable(),
  enrolledSpecialisation: specialisation.optional().nullable(),
  enrolmentDate: z.string().datetime().optional().nullable(),
  studentStatus: studentStatus.optional(),
  coachAssigned: z.string().optional().nullable(),
  coachEmail: z.string().email().optional().nullable(),
  notes: z.string().optional().nullable(),
  directoryOptIn: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const students = await prisma.studentProfile.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
        ...(status ? { studentStatus: status as z.infer<typeof studentStatus> } : {}),
        ...(level ? { enrolledLevel: level as z.infer<typeof enrolledLevel> } : {}),
        ...(search
          ? {
              OR: [
                { user: { name: { contains: search } } },
                { user: { email: { contains: search } } },
                { phone: { contains: search } },
              ],
            }
          : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            status: true,
            avatarUrl: true,
            lastLoginAt: true,
            createdAt: true,
          },
        },
      },
      orderBy: { user: { name: 'asc' } },
    });

    const withAccessCounts = await Promise.all(
      students.map(async (profile) => {
        const accessCount = await prisma.studentMaterialAccess.count({
          where: { studentUserId: profile.userId },
        });
        return { ...profile, materialAccessCount: accessCount };
      })
    );

    return jsonOk(withAccessCounts);
  } catch (err) {
    console.error('[admin/students GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createStudentSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    const email = data.email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return jsonError('A user with this email already exists', 409);

    const tempPassword = generateTempPassword();
    const hashedPassword = await hashPassword(tempPassword);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: data.name,
          password: hashedPassword,
          role: 'STUDENT',
          status: 'ACTIVE',
        },
      });

      const profile = await tx.studentProfile.create({
        data: {
          userId: user.id,
          phone: data.phone,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          enrolledLevel: data.enrolledLevel,
          enrolledSpecialisation: data.enrolledSpecialisation,
          enrolmentDate: data.enrolmentDate ? new Date(data.enrolmentDate) : new Date(),
          studentStatus: data.studentStatus ?? 'ENROLLED',
          coachAssigned: data.coachAssigned,
          coachEmail: data.coachEmail,
          notes: data.notes,
          directoryOptIn: data.directoryOptIn ?? false,
        },
      });

      return { user, profile };
    });

    await sendWelcomeStudent({
      to: email,
      name: data.name,
      level: data.enrolledLevel ?? 'ICI Programme',
      tempPassword,
    });

    await logActivity({
      action: 'STUDENT_CREATED',
      entity: 'StudentProfile',
      entityId: result.profile.id,
      details: data.name,
      userId: session.user.id,
      userName: session.user.name,
    });

    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;

    return jsonOk(
      {
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
        profile: result.profile,
        credentials: {
          email,
          name: data.name,
          tempPassword,
          loginUrl,
        },
      },
      201
    );
  } catch (err) {
    console.error('[admin/students POST]', err);
    return serverError();
  }
}
