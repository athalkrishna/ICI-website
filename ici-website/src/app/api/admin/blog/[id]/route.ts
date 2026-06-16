import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';

type RouteParams = { params: Promise<{ id: string }> };

const blogCategory = z.enum([
  'INSTITUTE_NEWS',
  'COACHING_INSIGHTS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
]);

const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional(),
  coverImageAlt: z.string().optional().nullable(),
  authorName: z.string().min(1).optional(),
  authorAvatarUrl: z.string().url().optional().nullable(),
  category: blogCategory.optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(320).optional().nullable(),
});

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return notFound('Blog post not found');
    return jsonOk(post);
  } catch (err) {
    console.error('[admin/blog/[id] GET]', err);
    return serverError();
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return notFound('Blog post not found');

    const body = await req.json();
    const parsed = updateBlogSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugTaken = await prisma.blogPost.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (slugTaken) return jsonError('Slug already in use', 409);
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: parsed.data,
    });

    if (post.status === 'PUBLISHED' || existing.status === 'PUBLISHED') {
      revalidatePath('/');
      revalidatePath('/blog');
      revalidatePath(`/blog/${post.slug}`);
      if (existing.slug !== post.slug) {
        revalidatePath(`/blog/${existing.slug}`);
      }
    }

    await logActivity({
      action: 'BLOG_UPDATED',
      entity: 'BlogPost',
      entityId: post.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(post);
  } catch (err) {
    console.error('[admin/blog/[id] PUT]', err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return notFound('Blog post not found');

    await prisma.blogPost.delete({ where: { id } });

    if (existing.status === 'PUBLISHED') {
      revalidatePath('/');
      revalidatePath('/blog');
      revalidatePath(`/blog/${existing.slug}`);
    }

    await logActivity({
      action: 'BLOG_DELETED',
      entity: 'BlogPost',
      entityId: id,
      details: existing.title,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/blog/[id] DELETE]', err);
    return serverError();
  }
}
