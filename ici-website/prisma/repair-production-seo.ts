/**
 * Production SEO repair: fix OG image CMS values, unpublish malformed blog posts.
 * Run on server after deploy: npx tsx prisma/repair-production-seo.ts
 */
import { prisma } from '../src/lib/prisma';
import { isValidBlogSlug } from '../src/lib/blog-utils';
import { PRODUCTION_SITE_URL } from '../src/lib/site-url';

const BAD_OG_PATTERNS = ['og-image', 'localhost', '127.0.0.1', 'cloudwaysapps.com'];

async function repairOgImageFields() {
  const globalPage = await prisma.page.findUnique({ where: { slug: 'global' } });
  if (globalPage) {
    const ogField = await prisma.contentField.findUnique({
      where: { pageId_key: { pageId: globalPage.id, key: 'default_og_image' } },
    });
    if (ogField?.value && BAD_OG_PATTERNS.some((p) => ogField.value!.toLowerCase().includes(p))) {
      await prisma.contentField.update({
        where: { id: ogField.id },
        data: { value: '/logo-transparent.webp' },
      });
      console.log('[fixed] global default_og_image → /logo-transparent.webp');
    }
  }

  const settings = await prisma.siteSettings.findFirst({ where: { id: 'singleton' } });
  if (
    settings?.defaultOgImageUrl &&
    BAD_OG_PATTERNS.some((p) => settings.defaultOgImageUrl!.toLowerCase().includes(p))
  ) {
    await prisma.siteSettings.update({
      where: { id: 'singleton' },
      data: { defaultOgImageUrl: `${PRODUCTION_SITE_URL}/logo-transparent.webp` },
    });
    console.log('[fixed] siteSettings.defaultOgImageUrl');
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
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
