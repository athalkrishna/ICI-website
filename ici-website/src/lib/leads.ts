import type { LeadSource, ProgrammeInterest } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sendLeadConfirmation, sendAdminNewLead } from '@/lib/email';
import { logActivity } from '@/lib/activity';
import { mapProgrammeInterest } from '@/lib/lead-utils';

export { mapProgrammeInterest } from '@/lib/lead-utils';

export type CreateLeadInput = {
  fullName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  programmeInterest?: ProgrammeInterest | string | null;
  source: LeadSource;
  message?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  statusNote?: string;
};

export async function createLead(input: CreateLeadInput) {
  const programmeInterest =
    typeof input.programmeInterest === 'string' || input.programmeInterest == null
      ? mapProgrammeInterest(input.programmeInterest)
      : input.programmeInterest;

  const lead = await prisma.lead.create({
    data: {
      fullName: input.fullName.trim(),
      email: input.email.toLowerCase().trim(),
      phone: input.phone?.trim() || null,
      country: input.country?.trim() || null,
      programmeInterest,
      source: input.source,
      message: input.message?.trim() || null,
      status: 'NEW',
      utmSource: input.utmSource ?? null,
      utmMedium: input.utmMedium ?? null,
      utmCampaign: input.utmCampaign ?? null,
      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: 'NEW',
          note: input.statusNote ?? `Submitted via ${input.source}`,
        },
      },
    },
  });

  try {
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
  } catch (err) {
    console.warn('[leads] notification email failed:', err);
  }

  try {
    await logActivity({
      action: 'LEAD_SUBMITTED',
      entity: 'Lead',
      entityId: lead.id,
      details: `${lead.fullName} (${lead.source})`,
    });
  } catch (err) {
    console.warn('[leads] activity log failed:', err);
  }

  return lead;
}

export async function verifyTurnstile(
  token: string | undefined | null,
  ip: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return { ok: true };

  const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}&remoteip=${ip}`,
  });
  const verifyData = await verifyResponse.json();
  if (!verifyData.success) {
    return { ok: false, message: 'Failed captcha verification' };
  }
  return { ok: true };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? '127.0.0.1';
}
