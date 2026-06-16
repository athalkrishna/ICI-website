import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { sendLeadConfirmation, sendAdminNewLead } from '@/lib/email';
import { logActivity } from '@/lib/activity';
import { formRateLimiter } from '@/lib/rate-limit';

const programmeInterest = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
  'NOT_SURE',
]);

const leadSource = z.enum(['HOME_FORM', 'CONTACT_FORM', 'APPLY_FORM', 'ASSESSMENT_FORM', 'OTHER']);

const submitLeadSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  programmeInterest: programmeInterest,
  source: leadSource,
  message: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  turnstileToken: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';

    try {
      await formRateLimiter.check(10, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();
    const parsed = submitLeadSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;

    if (data.honeypot) {
      return jsonOk({ success: true });
    }

    if (data.turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${data.turnstileToken}&remoteip=${ip}`,
        }
      );
      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        return jsonError('Failed captcha verification');
      }
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone?.trim() || null,
        country: data.country?.trim() || null,
        programmeInterest: data.programmeInterest,
        source: data.source,
        message: data.message?.trim() || null,
        status: 'NEW',
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        statusHistory: {
          create: {
            fromStatus: null,
            toStatus: 'NEW',
            note: `Submitted via ${data.source}`,
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
      action: 'LEAD_SUBMITTED',
      entity: 'Lead',
      entityId: lead.id,
      details: `${lead.fullName} (${lead.source})`,
    });

    return jsonOk({ success: true, id: lead.id }, 201);
  } catch (err) {
    console.error('[leads/submit POST]', err);
    return serverError();
  }
}
