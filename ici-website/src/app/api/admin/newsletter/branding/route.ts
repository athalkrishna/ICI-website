import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { getNewsletterBranding } from '@/lib/newsletter-branding';

const brandingSchema = z.object({
  logoUrl: z.string().optional().nullable(),
  primaryColor: z.string().min(1),
  accentColor: z.string().min(1),
  footerAddress: z.string().optional().nullable(),
  footerTagline: z.string().optional().nullable(),
  socialLinks: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
  senderName: z.string().optional().nullable(),
  senderEmail: z.string().email().optional().nullable().or(z.literal('')),
  unsubscribeText: z.string().optional().nullable(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const branding = await getNewsletterBranding();
    return jsonOk(branding);
  } catch (err) {
    console.error('[admin/newsletter/branding GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = brandingSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    const row = await prisma.newsletterBrandingSettings.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        logoUrl: data.logoUrl?.trim() || null,
        primaryColor: data.primaryColor,
        accentColor: data.accentColor,
        footerAddress: data.footerAddress?.trim() || null,
        footerTagline: data.footerTagline?.trim() || null,
        socialLinks: data.socialLinks ?? [],
        senderName: data.senderName?.trim() || null,
        senderEmail: data.senderEmail?.trim() || null,
        unsubscribeText: data.unsubscribeText?.trim() || null,
      },
      update: {
        logoUrl: data.logoUrl?.trim() || null,
        primaryColor: data.primaryColor,
        accentColor: data.accentColor,
        footerAddress: data.footerAddress?.trim() || null,
        footerTagline: data.footerTagline?.trim() || null,
        socialLinks: data.socialLinks ?? [],
        senderName: data.senderName?.trim() || null,
        senderEmail: data.senderEmail?.trim() || null,
        unsubscribeText: data.unsubscribeText?.trim() || null,
      },
    });

    return jsonOk(row);
  } catch (err) {
    console.error('[admin/newsletter/branding PUT]', err);
    return serverError();
  }
}
