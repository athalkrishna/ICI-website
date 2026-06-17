import { NextRequest } from 'next/server';
import { formRateLimiter } from '@/lib/rate-limit';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createLead, getClientIp, verifyTurnstile } from '@/lib/leads';
import { isBotFieldValue, mapProgrammeInterest } from '@/lib/lead-utils';

function isBotSubmission(body: Record<string, unknown>) {
  return ['website', 'honeypot', 'bot_field', '_hp'].some((key) => isBotFieldValue(body[key]));
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(30, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();

    if (isBotSubmission(body)) {
      return jsonOk({ success: true });
    }

    const {
      name,
      email,
      phone,
      country,
      topic,
      message,
      programme,
      programme_interest,
      discuss,
      times,
      turnstileToken,
    } = body;

    const captcha = await verifyTurnstile(turnstileToken, ip);
    if (!captcha.ok) return jsonError(captcha.message);

    if (!name?.trim() || !email?.trim()) {
      return jsonError('Name and email are required');
    }

    const isHomeForm = Boolean(programme || programme_interest) && !topic && !discuss;
    const source = isHomeForm ? 'HOME_FORM' : 'CONTACT_FORM';

    let leadMessage: string | null = null;
    const programmeInterest = mapProgrammeInterest(programme ?? programme_interest);

    if (topic || message) {
      leadMessage = [topic ? `Topic: ${topic}` : null, message ? String(message) : null]
        .filter(Boolean)
        .join('\n\n');
    } else if (discuss) {
      leadMessage = `Discuss: ${discuss}\n\nPreferred times: ${times ?? 'N/A'}`;
    } else if (programme || programme_interest) {
      leadMessage = `Programme interest: ${programme ?? programme_interest}`;
    }

    await createLead({
      fullName: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone) : null,
      country: country ? String(country) : null,
      programmeInterest,
      source,
      message: leadMessage,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[contact POST]', err);
    return serverError();
  }
}
