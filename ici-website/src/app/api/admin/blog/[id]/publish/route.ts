import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, notFound, serverError } from '@/lib/api';
import { logActivity } from '@/lib/activity';
import { revalidateCmsBlogPosts } from '@/lib/revalidate-cms';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return notFound('Blog post not found');

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: existing.publishedAt ?? new Date(),
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidateCmsBlogPosts();

    await logActivity({
      action: 'BLOG_PUBLISHED',
      entity: 'BlogPost',
      entityId: post.id,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(post);
  } catch (err) {
    console.error('[admin/blog/[id]/publish POST]', err);
    return serverError();
  }
}
