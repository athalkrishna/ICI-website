/**
 * Production SEO repair: OG share image, GA id, unpublish malformed blog posts.
 * Run on server after deploy: npm run db:repair-seo
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { prisma } from '../src/lib/prisma';
import { isValidBlogSlug } from '../src/lib/blog-utils';
import {
  DEFAULT_GA_MEASUREMENT_ID,
  PRODUCTION_SITE_URL,
  SITE_OG_IMAGE_PATH,
} from '../src/lib/site-url';

const BAD_OG_PATTERNS = ['og-image', 'localhost', '127.0.0.1', 'cloudwaysapps.com'];
const CANONICAL_OG_PATH = SITE_OG_IMAGE_PATH;
const CANONICAL_OG_URL = `${PRODUCTION_SITE_URL}${CANONICAL_OG_PATH}`;

/** Legacy pre-rebuild copy that must not remain published in CMS. */
const LEGACY_CONTENT_PATTERNS = [
  /empowering minds/i,
  /transforming lives/i,
  /\bkrishna\b/i,
  /over 15 years of experience/i,
  /\b(emily|sarah|david|jessica|robert|linda)\b.*staff/i,
];

const DUPLICATE_HOME_SLUGS = ['home', '/home', 'home/'];

async function repairOgImageFields() {
  const globalPage = await prisma.page.findUnique({ where: { slug: 'global' } });
  if (globalPage) {
    const ogField = await prisma.contentField.findUnique({
      where: { pageId_key: { pageId: globalPage.id, key: 'default_og_image' } },
    });
    const needsFix =
      !ogField?.value?.trim() ||
      ogField.value === '/logo-transparent.webp' ||
      BAD_OG_PATTERNS.some((p) => ogField.value!.toLowerCase().includes(p));
    if (ogField && needsFix) {
      await prisma.contentField.update({
        where: { id: ogField.id },
        data: { value: CANONICAL_OG_PATH },
      });
      console.log(`[fixed] global default_og_image → ${CANONICAL_OG_PATH}`);
    }
  }

  const settings = await prisma.siteSettings.findFirst({ where: { id: 'singleton' } });
  if (settings) {
    const ogBad =
      !settings.defaultOgImageUrl?.trim() ||
      settings.defaultOgImageUrl.includes('logo-transparent') ||
      BAD_OG_PATTERNS.some((p) => settings.defaultOgImageUrl!.toLowerCase().includes(p));
    const gaMissing = !settings.googleAnalyticsId?.trim();

    if (ogBad || gaMissing) {
      await prisma.siteSettings.update({
        where: { id: 'singleton' },
        data: {
          ...(ogBad ? { defaultOgImageUrl: CANONICAL_OG_URL } : {}),
          ...(gaMissing ? { googleAnalyticsId: DEFAULT_GA_MEASUREMENT_ID } : {}),
        },
      });
      if (ogBad) console.log('[fixed] siteSettings.defaultOgImageUrl');
      if (gaMissing) console.log(`[fixed] siteSettings.googleAnalyticsId → ${DEFAULT_GA_MEASUREMENT_ID}`);
    }
  }
}

async function unpublishInvalidBlogPosts() {
  const published = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, slug: true, title: true },
  });

  const invalid = published.filter((p) => !isValidBlogSlug(p.slug));
  for (const post of invalid) {
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { status: 'DRAFT', featured: false },
    });
    console.log(`[unpublished] "${post.title}" (slug: ${post.slug})`);
  }

  if (invalid.length === 0) {
    console.log('[ok] No malformed published blog slugs found.');
  }
}

async function removeDuplicateHomePage() {
  const homePages = await prisma.page.findMany({
    where: { slug: { in: DUPLICATE_HOME_SLUGS } },
    select: { id: true, slug: true, status: true, isSystem: true },
  });

  if (homePages.length === 0) {
    console.log('[ok] No duplicate /home CMS page found.');
    return;
  }

  for (const page of homePages) {
    if (page.isSystem) {
      await prisma.page.update({
        where: { id: page.id },
        data: { status: 'DRAFT', publishedAt: null },
      });
      console.log(`[unpublished] system page slug "${page.slug}" (use / not /home)`);
      continue;
    }

    await prisma.page.delete({ where: { id: page.id } });
    console.log(`[deleted] duplicate page slug "${page.slug}"`);
  }
}

async function scanLegacyPublishedContent() {
  const fields = await prisma.contentField.findMany({
    where: {
      page: { status: 'PUBLISHED' },
      value: { not: null },
    },
    select: {
      id: true,
      key: true,
      value: true,
      page: { select: { slug: true, title: true } },
    },
  });

  const hits: { slug: string; key: string; snippet: string }[] = [];

  for (const field of fields) {
    const value = field.value ?? '';
    for (const pattern of LEGACY_CONTENT_PATTERNS) {
      if (pattern.test(value)) {
        const match = value.match(pattern);
        hits.push({
          slug: field.page.slug,
          key: field.key,
          snippet: match?.[0] ?? pattern.source,
        });
        break;
      }
    }
  }

  if (hits.length === 0) {
    console.log('[ok] No legacy staff/homepage copy found in published CMS fields.');
    return;
  }

  console.warn('[warn] Legacy copy detected in published CMS — review in admin:');
  for (const hit of hits) {
    console.warn(`  - page "${hit.slug}" field "${hit.key}" (${hit.snippet})`);
  }
}

async function main() {
  console.log('Repairing production SEO data...\n');
  await repairOgImageFields();
  await removeDuplicateHomePage();
  await scanLegacyPublishedContent();
  await unpublishInvalidBlogPosts();
  console.log('\nDone. Rebuild/restart the app and purge cache.');
  console.log('Run npm run db:repair-cms-content to sync all page CMS fields with approved frontend copy.');
  console.log(`Ensure .env has CANONICAL_SITE_URL=${PRODUCTION_SITE_URL}`);
  console.log('\nGoogle Search Console (priority — drop old cached pages):');
  console.log('  1. URL Inspection → https://internationalcoachinginstitute.org/ → Request indexing');
  console.log('  2. URL Inspection → https://internationalcoachinginstitute.org/home/ → should 301 to /; then Request indexing on /');
  console.log('  3. Sitemaps → resubmit https://internationalcoachinginstitute.org/sitemap.xml');
  console.log('  4. Removals → Temporary removal only if named staff copy still appears after re-crawl');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
