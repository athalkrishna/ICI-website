import { unstable_cache } from 'next/cache';
import { prisma, hasDatabaseUrl } from './prisma';
import { CMS_REVALIDATE_SECONDS } from './content';

async function safeQuery<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabaseUrl()) return fallback;
  try {
    return await query();
  } catch (error) {
    console.warn(`[data] ${label} failed:`, error);
    return fallback;
  }
}

export async function getPublishedTestimonials() {
  return safeQuery('getPublishedTestimonials', () =>
    prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    }),
  []);
}

export async function getLatestBlogPosts(limit = 3) {
  return unstable_cache(
    () =>
      safeQuery('getLatestBlogPosts', () =>
        prisma.blogPost.findMany({
          where: { status: 'PUBLISHED' },
          orderBy: { publishedAt: 'desc' },
          take: limit,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImageUrl: true,
            coverImageAlt: true,
            category: true,
            publishedAt: true,
            authorName: true,
            authorAvatarUrl: true,
          },
        }),
      []),
    ['latest-blog-posts', String(limit)],
    {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: ['cms:blog-posts'],
    },
  )();
}

export async function getFeaturedBlogPosts(limit = 2) {
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getFeaturedEvents(limit = 2) {
  return prisma.event.findMany({
    where: { featured: true, status: { in: ['UPCOMING', 'ONGOING'] } },
    orderBy: { startDate: 'asc' },
    take: limit,
  });
}

export async function getPublishedBlogPosts() {
  return safeQuery('getPublishedBlogPosts', () =>
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        coverImageAlt: true,
        category: true,
        publishedAt: true,
        authorName: true,
        authorAvatarUrl: true,
      },
    }),
  []);
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit = 3,
) {
  const related = await safeQuery('getRelatedBlogPosts', () =>
    prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        slug: { not: currentSlug },
        category: category as never,
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        coverImageAlt: true,
        category: true,
        publishedAt: true,
        authorName: true,
        authorAvatarUrl: true,
      },
    }),
  []);

  if (related.length >= limit) return related;

  const extras = await safeQuery('getRelatedBlogPostsFallback', () =>
    prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        slug: { not: currentSlug, notIn: related.map((p) => p.slug) },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit - related.length,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        coverImageAlt: true,
        category: true,
        publishedAt: true,
        authorName: true,
        authorAvatarUrl: true,
      },
    }),
  []);

  return [...related, ...extras];
}

export async function getBlogPostBySlug(slug: string) {
  return safeQuery('getBlogPostBySlug', () =>
    prisma.blogPost.findFirst({
      where: { slug, status: 'PUBLISHED' },
    }),
  null);
}

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { startDate: 'desc' },
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({ where: { slug } });
}

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
}

export async function getPublishedFaculty() {
  return prisma.facultyMember.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}

export async function getDirectoryCoaches() {
  return prisma.studentProfile.findMany({
    where: {
      credentialIssued: true,
      directoryOptIn: true,
      deletedAt: null,
      user: { status: 'ACTIVE' },
    },
    include: {
      user: { select: { name: true, avatarUrl: true } },
    },
  });
}

export type AdminStats = {
  leadsThisMonth: number;
  leadsPctChange: number;
  leadsToday: number;
  activeStudents: number;
  publishedPosts: number;
  leadsChart: Record<string, Record<string, number>>;
  upcomingEvents: { title: string; startDate: Date; slug: string }[];
};

const EMPTY_ADMIN_STATS: AdminStats = {
  leadsThisMonth: 0,
  leadsPctChange: 0,
  leadsToday: 0,
  activeStudents: 0,
  publishedPosts: 0,
  leadsChart: {},
  upcomingEvents: [],
};

export async function getAdminStats(): Promise<AdminStats> {
  return safeQuery('getAdminStats', async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const {
      leadsThisMonth,
      leadsLastMonth,
      leadsToday,
      activeStudents,
      publishedPosts,
      leadsByDay,
      upcomingEvents,
    } = await prisma.$transaction(async (tx) => {
      const leadsThisMonth = await tx.lead.count({ where: { createdAt: { gte: startOfMonth } } });
      const leadsLastMonth = await tx.lead.count({
        where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
      });
      const leadsToday = await tx.lead.count({ where: { createdAt: { gte: startOfToday } } });
      const activeStudents = await tx.studentProfile.count({
        where: {
          studentStatus: { in: ['ENROLLED', 'ACTIVE'] },
          deletedAt: null,
        },
      });
      const publishedPosts = await tx.blogPost.count({ where: { status: 'PUBLISHED' } });
      const leadsByDay = await tx.lead.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true, source: true },
      });
      const upcomingEvents = await tx.event.findMany({
        where: { status: 'UPCOMING', startDate: { gte: now } },
        orderBy: { startDate: 'asc' },
        take: 3,
        select: { title: true, startDate: true, slug: true },
      });

      return {
        leadsThisMonth,
        leadsLastMonth,
        leadsToday,
        activeStudents,
        publishedPosts,
        leadsByDay,
        upcomingEvents,
      };
    });

    const pctChange =
      leadsLastMonth === 0
        ? leadsThisMonth > 0
          ? 100
          : 0
        : Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100);

    const chartData: Record<string, Record<string, number>> = {};
    for (const lead of leadsByDay) {
      const day = lead.createdAt.toISOString().slice(0, 10);
      if (!chartData[day]) chartData[day] = {};
      chartData[day][lead.source] = (chartData[day][lead.source] || 0) + 1;
    }

    return {
      leadsThisMonth,
      leadsPctChange: pctChange,
      leadsToday,
      activeStudents,
      publishedPosts,
      leadsChart: chartData,
      upcomingEvents,
    };
  }, EMPTY_ADMIN_STATS);
}
