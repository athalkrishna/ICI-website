import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { createPrismaClient } from '../prisma/db';

async function main() {
  const prisma = createPrismaClient();
  try {
    const count = await prisma.coach.count();
    console.log('coaches table ok, count:', count);
  } catch (err) {
    console.error('coaches table error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
