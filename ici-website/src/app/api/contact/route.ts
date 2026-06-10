import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Honeypot check
    if (data.website) {
      // Spam detected, pretend success
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    // Here you would normally send an email via Nodemailer or Resend
    // Example: send email to info@internationalcoachinginstitute.org
    console.log('Received contact submission:', data);

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
