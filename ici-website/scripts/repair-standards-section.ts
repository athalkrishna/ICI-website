import dotenv from 'dotenv';
import { createPrismaClient } from '../prisma/db';
import {
  HOME_STANDARDS_LOCKED_KEYS,
  lockedHomeStandardsDbValue,
} from '../src/lib/home-standards-defaults';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function main() {
  const prisma = createPrismaClient();
  const page = await prisma.page.findUnique({ where: { slug: '/' } });
  if (!page) throw new Error('Home page not found');

  for (const key of HOME_STANDARDS_LOCKED_KEYS) {
    await prisma.contentField.updateMany({
      where: { pageId: page.id, key },
      data: { value: lockedHomeStandardsDbValue(key) },
    });
    console.log(`Updated ${key} → ${lockedHomeStandardsDbValue(key)}`);
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
