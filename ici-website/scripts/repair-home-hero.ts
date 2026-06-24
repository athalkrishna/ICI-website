import dotenv from 'dotenv';
import { createPrismaClient } from '../prisma/db';
import { HOME_HERO_FIELD_KEYS, lockedHomeHeroDbValue } from '../src/lib/home-hero-defaults';
import { HOME_SEO_FIELD_KEYS, lockedHomeSeoDbValue } from '../src/lib/home-seo-defaults';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function upsertLockedField(
  prisma: ReturnType<typeof createPrismaClient>,
  pageId: string,
  key: string,
  value: string,
  section: string,
  type: 'TEXT' | 'TEXTAREA',
  order = 0,
) {
  const result = await prisma.contentField.updateMany({
    where: { pageId, key },
    data: { value },
  });

  if (result.count === 0) {
    await prisma.contentField.create({
      data: { pageId, key, label: key, type, value, order, section },
    });
    console.log(`Created ${key}`);
  } else {
    console.log(`Updated ${key}`);
  }
}

async function main() {
  const prisma = createPrismaClient();

  const page = await prisma.page.findUnique({ where: { slug: '/' } });
  if (!page) {
    throw new Error('Home page (/) not found. Run npm run db:seed first.');
  }

  let updated = 0;

  for (const key of HOME_HERO_FIELD_KEYS) {
    const value = lockedHomeHeroDbValue(key);
    await upsertLockedField(prisma, page.id, key, value, 'Hero', 'TEXT');
    updated += 1;
  }

  for (const key of HOME_SEO_FIELD_KEYS) {
    const value = lockedHomeSeoDbValue(key);
    await upsertLockedField(
      prisma,
      page.id,
      key,
      value,
      'SEO',
      key.includes('description') ? 'TEXTAREA' : 'TEXT',
      key.startsWith('meta_') ? -30 : 0,
    );
    updated += 1;
  }

  await prisma.page.update({
    where: { id: page.id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
  });

  console.log(`Home locked fields repaired (${updated} fields). Page published.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
