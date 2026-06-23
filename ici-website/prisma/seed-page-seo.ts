/**
 * Seeds or updates CMS page SEO fields (focus keyword, additional keywords, titles).
 * Run after deploy: npx tsx prisma/seed-page-seo.ts
 * Force overwrite existing values: npx tsx prisma/seed-page-seo.ts --force
 */
import { ContentFieldType } from '@prisma/client';
import { prisma } from '../src/lib/prisma';
import { PAGE_SEO_DEFAULTS, pageSeoKeywordsInput } from '../src/lib/page-seo-defaults';

const SEO_SECTION = 'SEO';
const FORCE = process.argv.includes('--force');

type SeoFieldDef = {
  key: string;
  label: string;
  type: ContentFieldType;
  order: number;
  helperText: string;
};

const FIELD_DEFS: SeoFieldDef[] = [
  {
    key: 'focus_keyword',
    label: 'Focus Keyword',
    type: ContentFieldType.TEXT,
    order: -28,
    helperText: 'Primary phrase this page should rank for.',
  },
  {
    key: 'seo_keywords',
    label: 'Additional SEO Keywords',
    type: ContentFieldType.TEXTAREA,
    order: -27,
    helperText: 'Up to 10 comma-separated supporting keywords.',
  },
];

async function upsertSeoField(
  pageId: string,
  def: SeoFieldDef,
  value: string,
) {
  const existing = await prisma.contentField.findUnique({
    where: { pageId_key: { pageId, key: def.key } },
  });

  if (!existing) {
    await prisma.contentField.create({
      data: {
        pageId,
        key: def.key,
        label: def.label,
        helperText: def.helperText,
        type: def.type,
        value,
        order: def.order,
        section: SEO_SECTION,
      },
    });
    return 'created';
  }

  if (FORCE || !existing.value?.trim()) {
    await prisma.contentField.update({
      where: { id: existing.id },
      data: {
        label: def.label,
        helperText: def.helperText,
        type: def.type,
        order: def.order,
        section: SEO_SECTION,
        value,
      },
    });
    return FORCE ? 'updated' : 'filled-empty';
  }

  await prisma.contentField.update({
    where: { id: existing.id },
    data: {
      label: def.label,
      helperText: def.helperText,
      type: def.type,
      order: def.order,
      section: SEO_SECTION,
    },
  });
  return 'skipped';
}

async function upsertSimpleField(
  pageId: string,
  key: string,
  value: string,
  order: number,
) {
  const existing = await prisma.contentField.findUnique({
    where: { pageId_key: { pageId, key } },
  });
  if (!existing) return;
  if (FORCE || !existing.value?.trim()) {
    await prisma.contentField.update({
      where: { id: existing.id },
      data: { value },
    });
    return 'updated';
  }
  return 'skipped';
}

async function main() {
  let created = 0;
  let filled = 0;
  let skipped = 0;

  for (const [slug, defaults] of Object.entries(PAGE_SEO_DEFAULTS)) {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      console.warn(`[skip] Page not found: ${slug}`);
      continue;
    }

    const focusValue = defaults.focusKeyword ?? '';
    const seoKeywordsValue = pageSeoKeywordsInput(defaults);

    for (const def of FIELD_DEFS) {
      const value = def.key === 'focus_keyword' ? focusValue : seoKeywordsValue;
      const result = await upsertSeoField(page.id, def, value);
      if (result === 'created') created++;
      else if (result === 'filled-empty' || result === 'updated') filled++;
      else skipped++;
    }

    if (defaults.title) {
      await upsertSimpleField(page.id, 'meta_title', defaults.title, -30);
    }
    if (defaults.description) {
      await upsertSimpleField(page.id, 'meta_description', defaults.description, -29);
    }
    if (seoKeywordsValue) {
      await upsertSimpleField(page.id, 'meta_keywords', seoKeywordsValue, -25);
    }

    console.log(`[ok] ${slug}${focusValue ? ` → "${focusValue}"` : ''}`);
  }

  console.log(`\nDone. Fields created: ${created}, values set: ${filled}, skipped (already set): ${skipped}`);
  if (!FORCE && skipped > 0) {
    console.log('Tip: run with --force to overwrite existing SEO field values.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
