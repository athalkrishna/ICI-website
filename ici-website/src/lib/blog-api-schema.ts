import { z } from 'zod';
import { BLOG_SEO } from '@/lib/blog-seo';

export const blogCategory = z.enum([
  'INSTITUTE_NEWS',
  'COACHING_INSIGHTS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
]);

const seoKeywordsSchema = z
  .array(z.string().trim().min(1).max(BLOG_SEO.seoKeywords.eachMax))
  .max(BLOG_SEO.seoKeywords.max)
  .optional();

export const blogSeoFields = {
  metaTitle: z.string().max(BLOG_SEO.metaTitle.max).optional().nullable(),
  metaDescription: z.string().max(BLOG_SEO.metaDescription.max).optional().nullable(),
  focusKeyword: z.string().max(BLOG_SEO.focusKeyword.max).optional().nullable(),
  seoKeywords: seoKeywordsSchema,
};

export const createBlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(BLOG_SEO.excerpt.max),
  content: z.string().min(1),
  coverImageUrl: z.string().url(),
  coverImageAlt: z.string().optional(),
  authorName: z.string().min(1),
  authorAvatarUrl: z.string().url().optional().nullable(),
  category: blogCategory,
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  ...blogSeoFields,
});

export const updateBlogSchema = createBlogSchema.partial();
