import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { sendLeadConfirmation, sendAdminNewLead } from '@/lib/email';
import { logActivity } from '@/lib/activity';

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

const createLeadSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  programmeInterest: programmeInterest,
  source: leadSource.default('OTHER'),
  message: z.string().optional().nullable(),
  status: leadStatus.optional(),
  assignedTo: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10)));
    const skip = (page - 1) * limit;

    const where = {
      ...(status ? { status: status as z.infer<typeof leadStatus> } : {}),
      ...(source ? { source: source as z.infer<typeof leadSource> } : {}),
      ...(from || to
        ? {
            createdAt: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              { fullName: { contains: search } },
              { email: { contains: search } },
              { phone: { contains: search } },
            ],
          }
        : {}),
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          statusHistory: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return jsonOk({ leads, total, page, limit });
  } catch (err) {
    console.error('[admin/leads GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        country: data.country,
        programmeInterest: data.programmeInterest,
        source: data.source,
        message: data.message,
        status: data.status ?? 'NEW',
        assignedTo: data.assignedTo,
        notes: data.notes,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        statusHistory: {
          create: {
            fromStatus: null,
            toStatus: data.status ?? 'NEW',
            changedBy: session.user.id,
            note: 'Manually created by admin',
          },
        },
      },
    });

    await Promise.all([
      sendLeadConfirmation(lead.email, lead.fullName),
      sendAdminNewLead({
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        programmeInterest: lead.programmeInterest,
        source: lead.source,
        message: lead.message,
      }),
    ]);

    await logActivity({
      action: 'LEAD_CREATED',
      entity: 'Lead',
      entityId: lead.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(lead, 201);
  } catch (err) {
    console.error('[admin/leads POST]', err);
    return serverError();
  }
}
