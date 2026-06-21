import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

function createAdapter() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env.local and configure your database.');
  }

  const parsed = new URL(url);
  const poolSize = Number(process.env.DATABASE_POOL_SIZE ?? 10);
  // Node may resolve localhost to ::1; MySQL/MariaDB often listens on 127.0.0.1 only.
  const host = parsed.hostname === 'localhost' ? '127.0.0.1' : parsed.hostname;
  const isDev = process.env.NODE_ENV !== 'production';
  const connectTimeout = isDev ? 5_000 : 30_000;

  return new PrismaMariaDb({
    host,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ''),
    connectionLimit: Number.isFinite(poolSize) && poolSize > 0 ? poolSize : 10,
    connectTimeout,
    acquireTimeout: connectTimeout,
    allowPublicKeyRetrieval: true,
  });
}

export function createPrismaClient(
  options?: Omit<ConstructorParameters<typeof PrismaClient>[0], 'adapter'>,
) {
  return new PrismaClient({ adapter: createAdapter(), ...options });
}
