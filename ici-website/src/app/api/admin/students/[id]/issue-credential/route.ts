import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { sendCredentialIssued } from '@/lib/email';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

async function generateCredentialNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ICI-C-${year}-`;

  const latest = await prisma.studentProfile.findFirst({
    where: { credentialNumber: { startsWith: prefix } },
    orderBy: { credentialNumber: 'desc' },
    select: { credentialNumber: true },
  });

  let seq = 1;
  if (latest?.credentialNumber) {
    const parts = latest.credentialNumber.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastSeq)) seq = lastSeq + 1;
  }

  return `${prefix}${String(seq).padStart(5, '0')}`;
}

export async function POST(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;

    const profile = await prisma.studentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }], deletedAt: null },
      include: { user: true },
    });
    if (!profile) return notFound('Student not found');

    if (profile.credentialIssued && profile.credentialNumber) {
      return jsonError('Credential already issued for this student');
    }

    if (!profile.enrolledLevel) {
      return jsonError('Student must have an enrolled level before issuing a credential');
    }

    const credentialNumber = await generateCredentialNumber();
    const issueDate = new Date();

    const updated = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        credentialIssued: true,
        credentialIssueDate: issueDate,
        credentialNumber,
        studentStatus: 'COMPLETED',
      },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });

    const formattedDate = issueDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    await sendCredentialIssued({
      to: profile.user.email,
      name: profile.user.name,
      level: profile.enrolledLevel,
      credentialNumber,
      issueDate: formattedDate,
    });

    await logActivity({
      action: 'CREDENTIAL_ISSUED',
      entity: 'StudentProfile',
      entityId: profile.id,
      details: credentialNumber,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(updated);
  } catch (err) {
    console.error('[admin/students/[id]/issue-credential POST]', err);
    return serverError();
  }
}
