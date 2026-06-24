import { NextRequest } from 'next/server';
import { formRateLimiter } from '@/lib/rate-limit';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createLead, getClientIp, mapProgrammeInterest } from '@/lib/leads';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(10, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();
    const { name, email, country, interest } = body;

    if (!email?.trim()) {
      return jsonError('Email is required');
    }

    const fullName = name?.trim() || 'Prospectus request';
    const message = [
      'Prospectus download requested',
      interest ? `Interest: ${interest}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    await createLead({
      fullName,
      email: String(email).trim(),
      country: country ? String(country) : null,
      programmeInterest: mapProgrammeInterest(interest),
      source: 'OTHER',
      message,
      statusNote: 'Prospectus form submission',
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[prospectus POST]', err);
    return serverError();
  }
}
