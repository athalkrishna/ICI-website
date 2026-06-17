import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { formRateLimiter } from '@/lib/rate-limit';
import { createLead, getClientIp, verifyTurnstile } from '@/lib/leads';

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
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(30, ip);
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

    const captcha = await verifyTurnstile(data.turnstileToken, ip);
    if (!captcha.ok) return jsonError(captcha.message);

    const lead = await createLead({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      programmeInterest: data.programmeInterest,
      source: data.source,
      message: data.message,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    });

    return jsonOk({ success: true, id: lead.id }, 201);
  } catch (err) {
    console.error('[leads/submit POST]', err);
    return serverError();
  }
}
