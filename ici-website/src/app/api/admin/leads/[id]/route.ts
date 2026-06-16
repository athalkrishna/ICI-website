import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const programmeInterest = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
  'NOT_SURE',
]);

const leadSource = z.enum(['HOME_FORM', 'CONTACT_FORM', 'APPLY_FORM', 'ASSESSMENT_FORM', 'OTHER']);
const leadStatus = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST', 'SPAM']);

const updateLeadSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  programmeInterest: programmeInterest.optional(),
  source: leadSource.optional(),
  message: z.string().optional().nullable(),
  status: leadStatus.optional(),
  assignedTo: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  statusNote: z.string().optional(),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { statusHistory: { orderBy: { createdAt: 'desc' } } },
    });
    if (!lead) return notFound('Lead not found');
    return jsonOk(lead);
  } catch (err) {
    console.error('[admin/leads/[id] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) return notFound('Lead not found');

    const body = await req.json();
    const parsed = updateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { statusNote, status, ...updates } = parsed.data;

    const lead = await prisma.$transaction(async (tx) => {
      if (status && status !== existing.status) {
        await tx.leadStatusHistory.create({
          data: {
            leadId: id,
            fromStatus: existing.status,
            toStatus: status,
            changedBy: session.user.id,
            note: statusNote,
          },
        });
      }

      return tx.lead.update({
        where: { id },
        data: {
          ...updates,
          ...(status ? { status } : {}),
          ...(updates.email ? { email: updates.email.toLowerCase().trim() } : {}),
        },
        include: { statusHistory: { orderBy: { createdAt: 'desc' } } },
      });
    });

    await logActivity({
      action: 'LEAD_UPDATED',
      entity: 'Lead',
      entityId: lead.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(lead);
  } catch (err) {
    console.error('[admin/leads/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) return notFound('Lead not found');

    await prisma.lead.delete({ where: { id } });

    await logActivity({
      action: 'LEAD_DELETED',
      entity: 'Lead',
      entityId: id,
      details: existing.fullName,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/leads/[id] DELETE]', err);
    return serverError();
  }
}
