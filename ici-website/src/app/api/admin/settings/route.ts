import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const updateSettingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  siteEmail: z.string().email().optional(),
  sitePhone: z.string().min(1).optional(),
  linkedinUrl: z.string().url().optional().nullable(),
  footerTagline: z.string().optional().nullable(),
  copyrightText: z.string().optional().nullable(),
  defaultMetaDescription: z.string().optional().nullable(),
  defaultOgImageUrl: z.string().url().optional().nullable(),
  googleAnalyticsId: z.string().optional().nullable(),
  facebookPixelId: z.string().optional().nullable(),
  headCode: z.string().optional().nullable(),
  bodyCode: z.string().optional().nullable(),
  maintenanceMode: z.boolean().optional(),
  findCoachPageEnabled: z.boolean().optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'singleton',
          siteName: 'International Coaching Institute',
          siteEmail: 'info@internationalcoachinginstitute.org',
          sitePhone: '+91 98199 84575',
        },
      });
    }

    return jsonOk(settings);
  } catch (err) {
    console.error('[admin/settings GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = updateSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const defaults = {
      siteName: 'International Coaching Institute',
      siteEmail: 'info@internationalcoachinginstitute.org',
      sitePhone: '+91 98199 84575',
    };

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        ...defaults,
        ...parsed.data,
        updatedBy: session.user.id,
      },
      update: {
        ...parsed.data,
        updatedBy: session.user.id,
      },
    });

    await logActivity({
      action: 'SETTINGS_UPDATED',
      entity: 'SiteSettings',
      entityId: 'singleton',
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(settings);
  } catch (err) {
    console.error('[admin/settings PUT]', err);
    return serverError();
  }
}
