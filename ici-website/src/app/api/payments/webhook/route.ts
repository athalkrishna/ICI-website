import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const order_id = payment.order_id;
      const payment_id = payment.id;
      
      // Update payment table
      await query(
        `UPDATE payments SET status = 'captured', payment_id = ? WHERE order_id = ?`,
        [payment_id, order_id]
      );

      // Find the associated lead
      const paymentsQuery: any = await query(`SELECT lead_id FROM payments WHERE order_id = ?`, [order_id]);
      const lead_id = paymentsQuery[0]?.lead_id;

      if (lead_id) {
        // Update lead
        await query(`UPDATE leads SET is_contacted = 1, message = CONCAT(message, '\n[PAYMENT SUCCESS: ', ?) WHERE id = ?`, [payment_id, lead_id]);

        // Fetch lead email for notification
        const leadsQuery: any = await query(`SELECT email, name FROM leads WHERE id = ?`, [lead_id]);
        const lead = leadsQuery[0];

        if (lead) {
          // Send Emails
          await sendPostPaymentEmails(lead.email, lead.name);
        }
      }

      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function sendPostPaymentEmails(studentEmail: string, studentName: string) {
  // If no SMTP configured, just log it.
  if (!process.env.SMTP_HOST && process.env.NODE_ENV !== 'production') {
    console.log(`[MOCK EMAIL] Student email sent to ${studentEmail}`);
    console.log(`[MOCK EMAIL] Admin notification sent.`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@internationalcoachinginstitute.org';

  try {
    await transporter.sendMail({
      from: `"International Coaching Institute" <${process.env.SMTP_FROM || adminEmail}>`,
      to: studentEmail,
      subject: "Welcome to ICI - Enrolment Confirmed",
      text: `Hello ${studentName},\n\nYour payment was successful and your enrolment is confirmed. We will reach out to you shortly with next steps.\n\nBest regards,\nICI Team`,
    });

    await transporter.sendMail({
      from: `"ICI System" <${process.env.SMTP_FROM || adminEmail}>`,
      to: adminEmail,
      subject: "New Enrolment Payment Received",
      text: `A new payment has been successfully captured for student: ${studentName} (${studentEmail}).`,
    });
  } catch (error) {
    console.error("Error sending post-payment emails:", error);
  }
}
