import dotenv from 'dotenv';
import { createPrismaClient } from '../prisma/db';
import { HOME_HERO_FIELD_KEYS, lockedHomeHeroDbValue } from '../src/lib/home-hero-defaults';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function main() {
  const prisma = createPrismaClient();

  const page = await prisma.page.findUnique({ where: { slug: '/' } });
  if (!page) {
    throw new Error('Home page (/) not found. Run npm run db:seed first.');
  }

  let updated = 0;

  for (const key of HOME_HERO_FIELD_KEYS) {
    const value = lockedHomeHeroDbValue(key);

    const result = await prisma.contentField.updateMany({
      where: { pageId: page.id, key },
      data: { value },
    });

    if (result.count === 0) {
      await prisma.contentField.create({
        data: {
          pageId: page.id,
          key,
          label: key,
          type: key.includes('number') ? 'NUMBER' : 'TEXT',
          value,
          order: 0,
          section: 'Hero',
        },
      });
      updated += 1;
      console.log(`Created ${key}`);
    } else {
      updated += result.count;
      console.log(`Updated ${key}`);
    }
  }

  await prisma.page.update({
    where: { id: page.id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
  });

  console.log(`Home hero repaired (${updated} fields). Page published.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
