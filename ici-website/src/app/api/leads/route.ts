import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { formRateLimiter } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // Apply rate limit
    try {
      await formRateLimiter.check(10, ip);
    } catch {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, country, programme_interest, message, turnstileToken } = body;

    // Verify Turnstile Token
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}&remoteip=${ip}`,
    });
    
    const verifyData = await verifyResponse.json();
    
    if (!verifyData.success) {
      return NextResponse.json({ error: 'Failed captcha verification' }, { status: 400 });
    }

    // Insert Lead
    await query(
      `INSERT INTO leads (source_page, name, email, phone, country, programme_interest, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Contact Form', name, email, phone, country, programme_interest, message]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
