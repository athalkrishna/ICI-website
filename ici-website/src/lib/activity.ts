import { prisma, hasDatabaseUrl } from './prisma';

export async function logActivity(params: {
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  userId?: string;
  userName?: string;
}) {
  if (!hasDatabaseUrl()) return;

  try {
    await prisma.activityLog.create({ data: params });
  } catch (err) {
    console.error('[ActivityLog]', err);
  }
}

export async function getRecentActivity(limit = 20) {
  if (!hasDatabaseUrl()) return [];

  try {
    return await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.warn('[activity] getRecentActivity failed:', error);
    return [];
  }
}
