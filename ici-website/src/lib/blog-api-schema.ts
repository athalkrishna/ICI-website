import { z } from 'zod';

export const blogCategory = z.enum([
  'INSTITUTE_NEWS',
  'COACHING_INSIGHTS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
]);

const seoKeywordsSchema = z
  .array(z.string().trim().min(1))
  .optional();

export const blogSeoFields = {
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  seoKeywords: seoKeywordsSchema,
};

export const createBlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().min(1),
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
