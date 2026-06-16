import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

function createAdapter() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env.local and configure your database.');
  }

  const parsed = new URL(url);
  return new PrismaMariaDb({
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ''),
    connectionLimit: 5,
  });
}

export function createPrismaClient(
  options?: Omit<ConstructorParameters<typeof PrismaClient>[0], 'adapter'>,
) {
  return new PrismaClient({ adapter: createAdapter(), ...options });
}
