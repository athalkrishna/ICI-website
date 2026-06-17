import { NextRequest } from 'next/server';
import { formRateLimiter } from '@/lib/rate-limit';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createLead, getClientIp } from '@/lib/leads';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    try {
      await formRateLimiter.check(10, ip);
    } catch {
      return jsonError('Too many requests', 429);
    }

    const body = await req.json();
    const { email, name, honeypot, context } = body;

    if (honeypot) {
      return jsonOk({ success: true });
    }

    if (!email?.trim()) {
      return jsonError('Email is required');
    }

    await createLead({
      fullName: name?.trim() || 'Events subscriber',
      email: String(email).trim(),
      programmeInterest: 'NOT_SURE',
      source: 'OTHER',
      message: context ? String(context) : 'Events interest signup',
      statusNote: 'Events interest form',
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[events-interest POST]', err);
    return serverError();
  }
}
