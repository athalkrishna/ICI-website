import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { EnrolledLevel, UserRole } from '@prisma/client';
import { createPrismaClient } from './db';
import { SEED_PAGES } from './seed-pages';
import { seedNewsletterBranding, seedNewsletterTemplates } from './seed-newsletter';
import {
  HOME_HERO_FIELD_KEYS,
  isHomeHeroLockedField,
  isHomePageSlug,
  lockedHomeHeroDbValue,
} from '../src/lib/home-hero-defaults';
import {
  HOME_SEO_FIELD_KEYS,
  isHomeSeoLockedField,
  lockedHomeSeoDbValue,
} from '../src/lib/home-seo-defaults';

dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = createPrismaClient();

const ADMIN_PASSWORD = 'Admin@ICI2026';

async function seedUsers() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: 'admin@internationalcoachinginstitute.org' },
    create: {
      email: 'admin@internationalcoachinginstitute.org',
      password: passwordHash,
      name: 'ICI Super Admin',
      role: UserRole.SUPER_ADMIN,
    },
    update: {
      password: passwordHash,
      name: 'ICI Super Admin',
      role: UserRole.SUPER_ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'team@internationalcoachinginstitute.org' },
    create: {
      email: 'team@internationalcoachinginstitute.org',
      password: passwordHash,
      name: 'ICI Admin Team',
      role: UserRole.ADMIN,
    },
    update: {
      password: passwordHash,
      name: 'ICI Admin Team',
      role: UserRole.ADMIN,
    },
  });

  console.log('Seeded admin users');
}

async function enforceHomeLockedFields(pageId: string) {
  for (const key of HOME_HERO_FIELD_KEYS) {
    await prisma.contentField.updateMany({
      where: { pageId, key },
      data: { value: lockedHomeHeroDbValue(key) },
    });
  }
  for (const key of HOME_SEO_FIELD_KEYS) {
    await prisma.contentField.updateMany({
      where: { pageId, key },
      data: { value: lockedHomeSeoDbValue(key) },
    });
  }
}

async function seedPages() {
  for (const pageData of SEED_PAGES) {
    const page = await prisma.page.upsert({
      where: { slug: pageData.slug },
      create: {
        title: pageData.title,
        slug: pageData.slug,
        description: pageData.description,
        isSystem: pageData.isSystem,
        status: pageData.status,
        publishedAt: new Date(),
      },
      update: {
        title: pageData.title,
        description: pageData.description,
        isSystem: pageData.isSystem,
        status: pageData.status,
        publishedAt: new Date(),
      },
    });

    for (const field of pageData.fields) {
      const seedValue =
        isHomePageSlug(pageData.slug) &&
        (isHomeHeroLockedField(field.key) || isHomeSeoLockedField(field.key))
          ? isHomeHeroLockedField(field.key)
            ? lockedHomeHeroDbValue(field.key)
            : lockedHomeSeoDbValue(field.key)
          : field.value;

      await prisma.contentField.upsert({
        where: {
          pageId_key: { pageId: page.id, key: field.key },
        },
        create: {
          pageId: page.id,
          key: field.key,
          label: field.label,
          helperText: field.helperText,
          type: field.type,
          value: seedValue,
          order: field.order,
          section: field.section,
        },
        update: {
          // Never overwrite CMS content on re-seed — only sync field metadata.
          label: field.label,
          helperText: field.helperText,
          type: field.type,
          order: field.order,
          section: field.section,
        },
      });
    }

    if (isHomePageSlug(pageData.slug)) {
      await enforceHomeLockedFields(page.id);
    }
  }

  console.log(`Seeded ${SEED_PAGES.length} pages with content fields`);
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      siteName: 'International Coaching Institute',
      siteEmail: 'info@internationalcoachinginstitute.org',
      sitePhone: '+91 98199 84575',
      linkedinUrl: 'https://www.linkedin.com/company/internationalcoachinginstitute',
      footerTagline:
        'The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.',
      copyrightText: 'Copyright © 2026 International Coaching Institute. All rights reserved.',
      defaultMetaDescription:
        'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
      defaultOgImageUrl: 'https://internationalcoachinginstitute.org/logo-transparent.webp',
      googleAnalyticsId: '',
      facebookPixelId: '',
      headCode: '',
      bodyCode: '',
      maintenanceMode: false,
      findCoachPageEnabled: false,
    },
    update: {
      siteName: 'International Coaching Institute',
      siteEmail: 'info@internationalcoachinginstitute.org',
      sitePhone: '+91 98199 84575',
      linkedinUrl: 'https://www.linkedin.com/company/internationalcoachinginstitute',
      footerTagline:
        'The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.',
      copyrightText: 'Copyright © 2026 International Coaching Institute. All rights reserved.',
      defaultMetaDescription:
        'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
      defaultOgImageUrl: 'https://internationalcoachinginstitute.org/logo-transparent.webp',
    },
  });

  console.log('Seeded site settings');
}

async function seedTestimonials() {
  const testimonials = [
    {
      studentName: 'Priya Menon',
      studentTitle: 'People and Culture leader turned coach',
      studentLocation: 'Bengaluru, India',
      credentialLevel: EnrolledLevel.CATALYST,
      quote:
        'I spent fifteen years telling people I was a good listener. My first one-to-one sessions quietly showed me how much I had been missing. The Catalyst work rebuilt the way I pay attention, and my clients can feel the difference.',
      displayOrder: 1,
    },
    {
      studentName: 'Rohan Iyer',
      studentTitle: 'Engineering manager and executive coach',
      studentLocation: 'Mumbai, India',
      credentialLevel: EnrolledLevel.ARCHITECT,
      quote:
        'What sold me was that it was genuinely one-to-one. There was nowhere to hide and nothing to coast through. By the end I was coaching senior people with a steadiness I simply did not have before.',
      displayOrder: 2,
    },
    {
      studentName: 'Ananya Reddy',
      studentTitle: 'Health and wellness coach',
      studentLocation: 'Hyderabad, India',
      credentialLevel: EnrolledLevel.CATALYST,
      quote:
        'The self-work hours were harder than the live ones, and that was the point. I had to face my own patterns before I could help anyone with theirs.',
      displayOrder: 3,
    },
    {
      studentName: 'Vikram Singh',
      studentTitle: 'Leadership coach and former Army officer',
      studentLocation: 'Pune, India',
      credentialLevel: EnrolledLevel.SAGE,
      quote:
        'I have sat through plenty of training in my life. This was the first that changed how I am, not just what I know. The work on presence stayed with me long after the certificate did.',
      displayOrder: 4,
    },
    {
      studentName: 'Sneha Kulkarni',
      studentTitle: 'Life coach',
      studentLocation: 'Pune, India',
      credentialLevel: EnrolledLevel.ARCHITECT,
      quote:
        'I left a corporate career with more fear than confidence. The Architect level gave me the craft and the proof I needed to build a practice I am proud of.',
      displayOrder: 5,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { studentName: t.studentName, displayOrder: t.displayOrder },
    });

    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: { ...t, isPublished: true },
      });
    } else {
      await prisma.testimonial.create({
        data: { ...t, isPublished: true },
      });
    }
  }

  console.log(`Seeded ${testimonials.length} testimonials`);
}

async function main() {
  console.log('Starting ICI database seed...');
  await seedUsers();
  await seedPages();
  await seedSiteSettings();
  await seedTestimonials();
  await seedNewsletterTemplates(prisma);
  await seedNewsletterBranding(prisma);
  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
