import { prisma, hasDatabaseUrl } from './prisma';

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
  return safeQuery('getLatestBlogPosts', () =>
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
      },
    }),
  []);
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
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
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

export async function getAdminStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    leadsThisMonth,
    leadsLastMonth,
    leadsToday,
    activeStudents,
    publishedPosts,
    leadsByDay,
    upcomingEvents,
  ] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.count({
      where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
    }),
    prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.studentProfile.count({
      where: {
        studentStatus: { in: ['ENROLLED', 'ACTIVE'] },
        deletedAt: null,
      },
    }),
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.lead.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true, source: true },
    }),
    prisma.event.findMany({
      where: { status: 'UPCOMING', startDate: { gte: now } },
      orderBy: { startDate: 'asc' },
      take: 3,
      select: { title: true, startDate: true, slug: true },
    }),
  ]);

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
}
