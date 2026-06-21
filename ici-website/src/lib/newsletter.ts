import { createHmac, timingSafeEqual } from 'crypto';
import { prisma } from './prisma';
import { sendNewsletterEmail } from './email';

export type NewsletterRecipient = {
  email: string;
  name?: string;
  source: 'dashboard_student' | 'alumni' | 'subscriber';
  hasDashboard: boolean;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function unsubscribeSecret() {
  return process.env.NEXTAUTH_SECRET || process.env.REVALIDATE_SECRET || 'ici-newsletter';
}

export function unsubscribeTokenForEmail(email: string) {
  return createHmac('sha256', unsubscribeSecret())
    .update(normalizeEmail(email))
    .digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string) {
  const expected = unsubscribeTokenForEmail(email);
  if (expected.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const normalized = normalizeEmail(email);
  const token = unsubscribeTokenForEmail(normalized);
  const params = new URLSearchParams({ email: normalized, token });
  return `${base}/api/newsletter/unsubscribe?${params.toString()}`;
}

export async function getNewsletterRecipients(): Promise<NewsletterRecipient[]> {
  const [students, alumni, subscribers, optOuts] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'STUDENT', status: 'ACTIVE' },
      select: { email: true, name: true },
    }),
    prisma.alumniNewsletterContact.findMany({
      where: { unsubscribedAt: null },
      select: { email: true, name: true },
    }),
    prisma.newsletterSubscriber.findMany({
      where: { unsubscribedAt: null },
      select: { email: true },
    }),
    prisma.newsletterOptOut.findMany({ select: { email: true } }),
  ]);

  const optedOut = new Set(optOuts.map((row) => normalizeEmail(row.email)));
  const byEmail = new Map<string, NewsletterRecipient>();

  for (const student of students) {
    const email = normalizeEmail(student.email);
    if (optedOut.has(email)) continue;
    byEmail.set(email, {
      email,
      name: student.name,
      source: 'dashboard_student',
      hasDashboard: true,
    });
  }

  for (const contact of alumni) {
    const email = normalizeEmail(contact.email);
    if (optedOut.has(email)) continue;
    if (!byEmail.has(email)) {
      byEmail.set(email, {
        email,
        name: contact.name ?? undefined,
        source: 'alumni',
        hasDashboard: false,
      });
    }
  }

  for (const subscriber of subscribers) {
    const email = normalizeEmail(subscriber.email);
    if (optedOut.has(email)) continue;
    if (!byEmail.has(email)) {
      byEmail.set(email, { email, source: 'subscriber', hasDashboard: false });
    }
  }

  return Array.from(byEmail.values());
}

export async function getRecipientCounts() {
  const recipients = await getNewsletterRecipients();
  const dashboardStudents = recipients.filter((r) => r.source === 'dashboard_student').length;
  const alumni = recipients.filter((r) => r.source === 'alumni').length;
  const externalSubscribers = recipients.filter((r) => r.source === 'subscriber').length;
  return {
    total: recipients.length,
    dashboardStudents,
    alumni,
    externalSubscribers,
    students: dashboardStudents,
    recipients,
  };
}

export async function sendNewsletterToAll(params: {
  title: string;
  content: string;
  imageUrl?: string | null;
}) {
  const recipients = await getNewsletterRecipients();
  let sentCount = 0;
  let failedCount = 0;

  for (const recipient of recipients) {
    const ok = await sendNewsletterEmail({
      to: recipient.email,
      toName: recipient.name,
      title: params.title,
      content: params.content,
      imageUrl: params.imageUrl,
      unsubscribeUrl: unsubscribeUrl(recipient.email),
    });
    if (ok) sentCount += 1;
    else failedCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return { recipientCount: recipients.length, sentCount, failedCount };
}

export async function optOutEmail(email: string) {
  const normalized = normalizeEmail(email);
  await prisma.$transaction([
    prisma.newsletterOptOut.upsert({
      where: { email: normalized },
      create: { email: normalized },
      update: {},
    }),
    prisma.newsletterSubscriber.updateMany({
      where: { email: normalized },
      data: { unsubscribedAt: new Date() },
    }),
    prisma.alumniNewsletterContact.updateMany({
      where: { email: normalized },
      data: { unsubscribedAt: new Date() },
    }),
  ]);
}
