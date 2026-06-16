import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    // Fallback allows `prisma generate` on CI/Vercel before env vars are wired up.
    url: process.env.DATABASE_URL ?? 'mysql://root:root@127.0.0.1:3306/ici_website',
  },
});
