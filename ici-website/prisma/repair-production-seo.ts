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

async function main() {
  console.log('Repairing production SEO data...\n');
  await repairOgImageFields();
  await unpublishInvalidBlogPosts();
  console.log('\nDone. Rebuild/restart the app and purge cache.');
  console.log(`Ensure .env has CANONICAL_SITE_URL=${PRODUCTION_SITE_URL}`);
  console.log('Then in Google Search Console: request re-index of https://internationalcoachinginstitute.org/');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
