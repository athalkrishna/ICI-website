import { NextRequest } from 'next/server';
import { formRateLimiter } from '@/lib/rate-limit';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createLead, getClientIp, verifyTurnstile } from '@/lib/leads';
import { mapProgrammeInterest } from '@/lib/lead-utils';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(30, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();

    const {
      name,
      email,
      phone,
      country,
      level,
      specialism,
      experience,
      goals,
      source: referralSource,
      turnstileToken,
    } = body;

    const captcha = await verifyTurnstile(turnstileToken, ip);
    if (!captcha.ok) return jsonError(captcha.message);

    if (!name?.trim() || !email?.trim()) {
      return jsonError('Name and email are required');
    }

    const message = [
      level ? `Level of interest: ${level}` : null,
      specialism ? `Specialism: ${specialism}` : null,
      experience ? `Experience: ${experience}` : null,
      goals ? `Goals: ${goals}` : null,
      referralSource ? `How they heard about us: ${referralSource}` : null,
    ]
      .filter(Boolean)
      .join('\n\n');

    await createLead({
      fullName: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone) : null,
      country: country ? String(country) : null,
      programmeInterest: mapProgrammeInterest(specialism ?? level),
      source: 'APPLY_FORM',
      message: message || null,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[apply POST]', err);
    return serverError();
  }
}
