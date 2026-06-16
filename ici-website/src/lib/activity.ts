import { prisma } from './prisma';

export async function logActivity(params: {
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  userId?: string;
  userName?: string;
}) {
  try {
    await prisma.activityLog.create({ data: params });
  } catch (err) {
    console.error('[ActivityLog]', err);
  }
}

export async function getRecentActivity(limit = 20) {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
