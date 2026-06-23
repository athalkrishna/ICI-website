import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { createBlogSchema, blogCategory } from '@/lib/blog-api-schema';
import type { z } from 'zod';

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
        focusKeyword: data.focusKeyword,
        seoKeywords: data.seoKeywords ?? [],
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
