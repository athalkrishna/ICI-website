import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

const blogCategory = z.enum([
  'INSTITUTE_NEWS',
  'COACHING_INSIGHTS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
]);

const createBlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(300),
  content: z.string().min(1),
  coverImageUrl: z.string().url(),
  coverImageAlt: z.string().optional(),
  authorName: z.string().min(1),
  authorAvatarUrl: z.string().url().optional().nullable(),
  category: blogCategory,
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(320).optional().nullable(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const posts = await prisma.blogPost.findMany({
      where: {
        ...(status ? { status: status as 'DRAFT' | 'PUBLISHED' } : {}),
        ...(category ? { category: category as z.infer<typeof blogCategory> } : {}),
      },
      orderBy: { updatedAt: 'desc' },
    });

    return jsonOk(posts);
  } catch (err) {
    console.error('[admin/blog GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createBlogSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const data = parsed.data;
    let slug = data.slug ?? slugify(data.title);

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        coverImageAlt: data.coverImageAlt,
        authorName: data.authorName,
        authorAvatarUrl: data.authorAvatarUrl,
        category: data.category,
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        status: 'DRAFT',
      },
    });

    await logActivity({
      action: 'BLOG_CREATED',
      entity: 'BlogPost',
      entityId: post.id,
      details: post.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(post, 201);
  } catch (err) {
    console.error('[admin/blog POST]', err);
    return serverError();
  }
}
