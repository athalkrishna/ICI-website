import type { PrismaClient } from '@prisma/client';
import { DEFAULT_NEWSLETTER_BRANDING } from '../src/lib/newsletter-branding';
import { ensureSystemNewsletterTemplates } from '../src/lib/newsletter-templates-db';

export async function seedNewsletterTemplates(prisma: PrismaClient) {
  await ensureSystemNewsletterTemplates(prisma);
  console.log('Seeded newsletter templates');
}

export async function seedNewsletterBranding(prisma: PrismaClient) {
  await prisma.newsletterBrandingSettings.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      logoUrl: DEFAULT_NEWSLETTER_BRANDING.logoUrl,
      primaryColor: DEFAULT_NEWSLETTER_BRANDING.primaryColor,
      accentColor: DEFAULT_NEWSLETTER_BRANDING.accentColor,
      footerAddress: DEFAULT_NEWSLETTER_BRANDING.footerAddress,
      footerTagline: DEFAULT_NEWSLETTER_BRANDING.footerTagline,
      socialLinks: DEFAULT_NEWSLETTER_BRANDING.socialLinks,
      senderName: DEFAULT_NEWSLETTER_BRANDING.senderName,
      senderEmail: DEFAULT_NEWSLETTER_BRANDING.senderEmail,
      unsubscribeText: DEFAULT_NEWSLETTER_BRANDING.unsubscribeText,
    },
    update: {},
  });

  console.log('Seeded newsletter branding settings');
}

async function runSeed() {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env.local' });
  dotenv.config();
  const { createPrismaClient } = await import('./db');
  const prisma = createPrismaClient();
  await seedNewsletterTemplates(prisma);
  await seedNewsletterBranding(prisma);
  await prisma.$disconnect();
}

if (process.argv[1]?.includes('seed-newsletter')) {
  runSeed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
