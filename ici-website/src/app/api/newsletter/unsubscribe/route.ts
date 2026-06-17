import { NextRequest, NextResponse } from 'next/server';
import { optOutEmail, verifyUnsubscribeToken } from '@/lib/newsletter';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.trim().toLowerCase();
  const token = searchParams.get('token');

  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return NextResponse.redirect(`${base}/newsletter/unsubscribed?status=invalid`);
  }

  try {
    await optOutEmail(email);
    return NextResponse.redirect(`${base}/newsletter/unsubscribed?status=success`);
  } catch (err) {
    console.error('[newsletter/unsubscribe GET]', err);
    return NextResponse.redirect(`${base}/newsletter/unsubscribed?status=error`);
  }
}
