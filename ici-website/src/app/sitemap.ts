import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';
import { getPublishedBlogSlugsForSitemap } from '@/lib/data';
import { PAGE_SEO_DEFAULTS } from '@/lib/page-seo-defaults';

function slugToUrl(slug: string): string {
  if (slug === '/') return SITE_URL;
  const path = slug.startsWith('/') ? slug : `/${slug}`;
  return `${SITE_URL}${path}`;
}

function priorityForSlug(slug: string): number {
  if (slug === '/') return 1;
  if (slug === '/blog') return 0.5;
  if (slug.startsWith('/programmes') || slug.startsWith('/credentials')) return 0.85;
  if (slug === '/pricing' || slug === '/admissions') return 0.8;
  return 0.6;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const blogPosts = await getPublishedBlogSlugsForSitemap();

  const pageEntries: MetadataRoute.Sitemap = Object.keys(PAGE_SEO_DEFAULTS).map((slug) => ({
    url: slugToUrl(slug),
    lastModified,
    changeFrequency: slug === '/' || slug === '/blog' ? 'weekly' : 'monthly',
    priority: priorityForSlug(slug),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...pageEntries, ...blogEntries];
}
