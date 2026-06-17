import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import type { EmailTemplate, EmailStatus } from '@prisma/client';

const transporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

function fromAddress() {
  const email = process.env.SMTP_FROM_EMAIL || 'info@internationalcoachinginstitute.org';
  const name = process.env.SMTP_FROM_NAME || 'International Coaching Institute';
  return `"${name}" <${email}>`;
}

function wrapHtml(body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="background:#1a2744;padding:24px 32px;">
          <h1 style="margin:0;color:#c9a227;font-size:20px;font-weight:normal;">International Coaching Institute</h1>
        </td></tr>
        <tr><td style="padding:32px;color:#1a2744;font-size:16px;line-height:1.6;">${body}</td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #e8e4dc;color:#666;font-size:13px;">
          International Coaching Institute &middot; info@internationalcoachinginstitute.org
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function logEmail(
  recipientEmail: string,
  recipientName: string | undefined,
  subject: string,
  template: EmailTemplate,
  status: EmailStatus,
  errorMessage?: string
) {
  await prisma.emailLog.create({
    data: {
      recipientEmail,
      recipientName,
      subject,
      templateUsed: template,
      status,
      errorMessage,
    },
  });
}

export async function sendEmail(params: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  template: EmailTemplate;
}) {
  if (!process.env.SMTP_HOST) {
    console.warn('[Email] SMTP not configured, skipping send to', params.to);
    await logEmail(params.to, params.toName, params.subject, params.template, 'FAILED', 'SMTP not configured');
    return false;
  }

  try {
    await transporter().sendMail({
      from: fromAddress(),
      to: params.toName ? `"${params.toName}" <${params.to}>` : params.to,
      subject: params.subject,
      html: wrapHtml(params.html),
    });
    await logEmail(params.to, params.toName, params.subject, params.template, 'SENT');
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Email]', msg);
    await logEmail(params.to, params.toName, params.subject, params.template, 'FAILED', msg);
    return false;
  }
}

export async function sendLeadConfirmation(to: string, name: string) {
  return sendEmail({
    to,
    toName: name,
    subject: 'Thank you for your enquiry — International Coaching Institute',
    template: 'LEAD_CONFIRMATION',
    html: `<p>Dear ${name},</p>
      <p>Thank you for contacting the International Coaching Institute. We have received your enquiry and a member of our team will be in touch within 1–2 business days.</p>
      <p>If you have any urgent questions, please email us at info@internationalcoachinginstitute.org or call +91 98199 84575.</p>
      <p>Warm regards,<br>The ICI Team</p>`,
  });
}

export async function sendAdminNewLead(lead: {
  fullName: string;
  email: string;
  phone?: string | null;
  programmeInterest: string;
  source: string;
  message?: string | null;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@internationalcoachinginstitute.org';
  return sendEmail({
    to: adminEmail,
    subject: `New Lead: ${lead.fullName} — ${lead.programmeInterest}`,
    template: 'ADMIN_NEW_LEAD',
    html: `<p><strong>New lead received</strong></p>
      <p><strong>Name:</strong> ${lead.fullName}<br>
      <strong>Email:</strong> ${lead.email}<br>
      <strong>Phone:</strong> ${lead.phone || '—'}<br>
      <strong>Programme interest:</strong> ${lead.programmeInterest}<br>
      <strong>Source:</strong> ${lead.source}<br>
      <strong>Message:</strong> ${lead.message || '—'}</p>`,
  });
}

export async function sendWelcomeStudent(params: {
  to: string;
  name: string;
  level: string;
  tempPassword: string;
}) {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;
  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: 'Welcome to ICI — Your Account is Ready',
    template: 'WELCOME_STUDENT',
    html: `<p>Dear ${params.name},</p>
      <p>Welcome to the International Coaching Institute. Your student account has been created.</p>
      <p><strong>Enrolled programme:</strong> ${params.level}</p>
      <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a><br>
      <strong>Email:</strong> ${params.to}<br>
      <strong>Temporary password:</strong> ${params.tempPassword}</p>
      <p>Please log in and change your password on first use.</p>`,
  });
}

export async function sendCourseAccessGranted(params: {
  to: string;
  name: string;
  materialTitle: string;
  description?: string | null;
}) {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/materials`;
  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: `New course material available: ${params.materialTitle}`,
    template: 'COURSE_ACCESS_GRANTED',
    html: `<p>Dear ${params.name},</p>
      <p>New course material is now available for you: <strong>${params.materialTitle}</strong>.</p>
      ${params.description ? `<p>${params.description}</p>` : ''}
      <p><a href="${loginUrl}">Log in to access your materials</a></p>`,
  });
}

export async function sendCredentialIssued(params: {
  to: string;
  name: string;
  level: string;
  credentialNumber: string;
  issueDate: string;
}) {
  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: 'Congratulations — Your ICI Credential Has Been Issued',
    template: 'CREDENTIAL_ISSUED',
    html: `<p>Dear ${params.name},</p>
      <p>Congratulations! Your ICI credential has been issued.</p>
      <p><strong>Level:</strong> ${params.level}<br>
      <strong>Credential number:</strong> ${params.credentialNumber}<br>
      <strong>Issue date:</strong> ${params.issueDate}</p>
      <p>You may now use your ICI post-nominals in professional settings.</p>`,
  });
}

export async function sendPasswordReset(params: { to: string; name: string; resetUrl: string }) {
  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: 'Reset your ICI password',
    template: 'PASSWORD_RESET',
    html: `<p>Dear ${params.name},</p>
      <p>We received a request to reset your password. Click the link below to set a new password (valid for 1 hour):</p>
      <p><a href="${params.resetUrl}">${params.resetUrl}</a></p>
      <p>If you did not request this, please ignore this email.</p>`,
  });
}

export async function sendCustomEmail(params: {
  to: string;
  toName?: string;
  subject: string;
  body: string;
}) {
  return sendEmail({
    to: params.to,
    toName: params.toName,
    subject: params.subject,
    template: 'CUSTOM',
    html: params.body,
  });
}

function newsletterHtml(params: {
  title: string;
  content: string;
  imageUrl?: string | null;
  unsubscribeUrl: string;
}) {
  const imageBlock = params.imageUrl
    ? `<p style="margin:0 0 24px;"><img src="${params.imageUrl}" alt="" style="max-width:100%;height:auto;border-radius:8px;" /></p>`
    : '';

  return `<h2 style="margin:0 0 16px;color:#1a2744;font-size:22px;font-weight:normal;">${params.title}</h2>
    ${imageBlock}
    <div style="color:#1a2744;">${params.content}</div>
    <p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #e8e4dc;font-size:13px;color:#666;">
      You are receiving this because you are an ICI student or newsletter subscriber.
      <a href="${params.unsubscribeUrl}" style="color:#1a2744;">Unsubscribe</a>
    </p>`;
}

export async function sendNewsletterEmail(params: {
  to: string;
  toName?: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  unsubscribeUrl: string;
}) {
  return sendEmail({
    to: params.to,
    toName: params.toName,
    subject: params.title,
    template: 'NEWSLETTER',
    html: newsletterHtml(params),
  });
}
