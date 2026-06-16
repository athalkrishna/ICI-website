import type { PrismaClient } from '@prisma/client';
import { createPrismaClient } from '../../prisma/db';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function initPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  return globalForPrisma.prisma;
}

/** Lazy singleton — avoids connecting during Next.js static analysis/build. */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = initPrisma();
    const value = client[prop as keyof PrismaClient];
    if (typeof value === 'function') {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }
    return value;
  },
});

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}
