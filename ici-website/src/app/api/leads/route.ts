import { NextRequest } from 'next/server';
import { formRateLimiter } from '@/lib/rate-limit';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createLead, getClientIp, mapProgrammeInterest, verifyTurnstile } from '@/lib/leads';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(10, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();
    const { name, email, phone, country, programme_interest, message, turnstileToken } = body;

    const captcha = await verifyTurnstile(turnstileToken, ip);
    if (!captcha.ok) return jsonError(captcha.message);

    if (!name?.trim() || !email?.trim()) {
      return jsonError('Name and email are required');
    }

    await createLead({
      fullName: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone) : null,
      country: country ? String(country) : null,
      programmeInterest: mapProgrammeInterest(programme_interest),
      source: 'APPLY_FORM',
      message: message ? String(message) : null,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[leads POST]', err);
    return serverError();
  }
}
