/**
 * One-time sync: overwrite CMS field values with client-approved copy from seed definitions.
 * Frontend fallbacks match these values — after this, admin shows what the live site displays.
 *
 * Run: npm run db:repair-cms-content
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { createPrismaClient } from '../prisma/db';
import { SEED_PAGES } from '../prisma/seed-pages';
import { HOME_HERO_DEFAULTS, approvedHomeHeroDbValue } from '../src/lib/home-hero-defaults';
import { HOME_STANDARDS_SECTION_HEADING, lockedHomeStandardsDbValue, HOME_STANDARDS_LOCKED_KEYS } from '../src/lib/home-standards-defaults';

function approvedValue(slug: string, key: string, seedValue: string): string {
  if (slug === '/' && key in HOME_HERO_DEFAULTS) {
    return approvedHomeHeroDbValue(key);
  }
  if (slug === '/' && key === 'standards_section_heading') {
    return HOME_STANDARDS_SECTION_HEADING;
  }
  if (slug === '/' && (HOME_STANDARDS_LOCKED_KEYS as readonly string[]).includes(key) && key !== 'standards_section_heading') {
    return lockedHomeStandardsDbValue(key);
  }
  return seedValue;
}

async function main() {
  const prisma = createPrismaClient();
  let updated = 0;

  for (const pageData of SEED_PAGES) {
    const page = await prisma.page.findUnique({ where: { slug: pageData.slug } });
    if (!page) {
      console.warn(`[skip] Page not found: ${pageData.slug}`);
      continue;
    }

    for (const field of pageData.fields) {
      if (field.key === 'code') continue;

      const value = approvedValue(pageData.slug, field.key, field.value);
      const result = await prisma.contentField.updateMany({
        where: { pageId: page.id, key: field.key },
        data: { value },
      });
      if (result.count > 0) updated += result.count;
    }

    console.log(`[ok] ${pageData.slug} (${pageData.fields.length} fields)`);
  }

  console.log(`\nDone. Updated ${updated} CMS field values to approved frontend copy.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
