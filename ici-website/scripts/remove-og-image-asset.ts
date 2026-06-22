/**
 * Remove deprecated og-image.webp from Bunny storage and media library.
 * Usage: npx tsx scripts/remove-og-image-asset.ts
 */
import dotenv from 'dotenv';
import { createPrismaClient } from '../prisma/db';
import { deleteFromBunny } from '../src/lib/bunny';

dotenv.config({ path: '.env.local' });
dotenv.config();

const OG_PATHS = ['site/og-image.webp'];

async function main() {
  const prisma = createPrismaClient();

  for (const bunnyPath of OG_PATHS) {
    const rows = await prisma.mediaFile.findMany({ where: { bunnyPath } });
    for (const row of rows) {
      await prisma.mediaFile.delete({ where: { id: row.id } });
      console.log(`Deleted media library record: ${row.fileName}`);
    }

    try {
      await deleteFromBunny(bunnyPath);
      console.log(`Deleted from Bunny: ${bunnyPath}`);
    } catch (err) {
      console.warn(`Bunny delete skipped for ${bunnyPath}:`, err instanceof Error ? err.message : err);
    }
  }

  // Clear CMS global default if it still points at og-image
  const globalPage = await prisma.page.findUnique({ where: { slug: 'global' } });
  if (globalPage) {
    await prisma.contentField.updateMany({
      where: {
        pageId: globalPage.id,
        key: 'default_og_image',
        value: { contains: 'og-image' },
      },
      data: { value: '/logo-transparent.webp' },
    });
    console.log('Updated CMS default_og_image if it referenced og-image');
  }

  await prisma.siteSettings.updateMany({
    where: { defaultOgImageUrl: { contains: 'og-image' } },
    data: { defaultOgImageUrl: 'https://internationalcoachinginstitute.org/logo-transparent.webp' },
  });

  await prisma.$disconnect();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
