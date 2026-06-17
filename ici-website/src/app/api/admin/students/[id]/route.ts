import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { syncMaterialAccessForStudent } from '@/lib/material-access';

type RouteParams = { params: Promise<{ id: string }> };

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
const userStatus = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);

const updateStudentSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  userStatus: userStatus.optional(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  dateOfBirth: z.string().datetime().optional().nullable(),
  enrolledLevel: enrolledLevel.optional().nullable(),
  enrolledSpecialisation: specialisation.optional().nullable(),
  enrolmentDate: z.string().datetime().optional().nullable(),
  completionDate: z.string().datetime().optional().nullable(),
  studentStatus: studentStatus.optional(),
  coachAssigned: z.string().optional().nullable(),
  coachEmail: z.string().email().optional().nullable(),
  notes: z.string().optional().nullable(),
  directoryOptIn: z.boolean().optional(),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
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
    });

    if (!profile) return notFound('Student not found');

    const materialAccess = await prisma.studentMaterialAccess.findMany({
      where: { studentUserId: profile.userId },
      include: {
        material: true,
        granter: { select: { id: true, name: true } },
      },
      orderBy: { grantedAt: 'desc' },
    });

    return jsonOk({ ...profile, materialAccess });
  } catch (err) {
    console.error('[admin/students/[id] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    const body = await req.json();
    const parsed = updateStudentSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { name, email, userStatus, dateOfBirth, enrolmentDate, completionDate, ...profileData } =
      parsed.data;

    if (email && email.toLowerCase().trim() !== profile.user.email) {
      const taken = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (taken) return jsonError('Email already in use', 409);
    }

    const updated = await prisma.$transaction(async (tx) => {
      if (name || email || userStatus) {
        await tx.user.update({
          where: { id: profile.userId },
          data: {
            ...(name ? { name } : {}),
            ...(email ? { email: email.toLowerCase().trim() } : {}),
            ...(userStatus ? { status: userStatus } : {}),
          },
        });
      }

      return tx.studentProfile.update({
        where: { id: profile.id },
        data: {
          ...profileData,
          ...(dateOfBirth !== undefined
            ? { dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null }
            : {}),
          ...(enrolmentDate !== undefined
            ? { enrolmentDate: enrolmentDate ? new Date(enrolmentDate) : null }
            : {}),
          ...(completionDate !== undefined
            ? { completionDate: completionDate ? new Date(completionDate) : null }
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
            },
          },
        },
      });
    });

    if (
      parsed.data.enrolledLevel &&
      parsed.data.enrolledLevel !== profile.enrolledLevel
    ) {
      await syncMaterialAccessForStudent(
        profile.userId,
        parsed.data.enrolledLevel,
        session.user.id,
      );
    }

    await logActivity({
      action: 'STUDENT_UPDATED',
      entity: 'StudentProfile',
      entityId: profile.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(updated);
  } catch (err) {
    console.error('[admin/students/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    await prisma.$transaction([
      prisma.studentProfile.update({
        where: { id: profile.id },
        data: { deletedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: profile.userId },
        data: { status: 'INACTIVE' },
      }),
    ]);

    await logActivity({
      action: 'STUDENT_DELETED',
      entity: 'StudentProfile',
      entityId: profile.id,
      details: profile.user.name,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/students/[id] DELETE]', err);
    return serverError();
  }
}
