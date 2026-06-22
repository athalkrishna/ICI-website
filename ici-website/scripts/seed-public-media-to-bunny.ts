/**
 * Upload all static site images from /public and /src/app to Bunny.net
 * and register them in the admin Media Library (media_files table).
 *
 * Usage: npx tsx scripts/seed-public-media-to-bunny.ts
 */
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createPrismaClient } from '../prisma/db';
import { detectMediaType, uploadToBunny } from '../src/lib/bunny';

dotenv.config({ path: '.env.local' });
dotenv.config();

const ROOT = path.resolve(__dirname, '..');

type AssetDef = {
  /** Path relative to project root */
  localPath: string;
  folder: string;
  alt: string;
};

const SITE_IMAGES: AssetDef[] = [
  { localPath: 'public/logo-transparent.webp', folder: 'site', alt: 'International Coaching Institute logo' },
  { localPath: 'public/logo-white.webp', folder: 'site', alt: 'International Coaching Institute logo on dark background' },
  { localPath: 'public/aspiring-coaches.webp', folder: 'site', alt: 'Aspiring coaches training with International Coaching Institute' },
  { localPath: 'public/experienced-practitioners.webp', folder: 'site', alt: 'Experienced coaching practitioners advancing their career' },
  { localPath: 'public/organisations-leaders.webp', folder: 'site', alt: 'Organisations and leaders investing in coaching' },
  { localPath: 'public/ici-difference-coaching.webp', folder: 'site', alt: 'One-to-one coaching at International Coaching Institute' },
  { localPath: 'public/images/global-network-bg.webp', folder: 'site', alt: 'Global network of ICI coaches worldwide' },
  { localPath: 'public/certified-life-coach.webp', folder: 'programmes', alt: 'Certified Life Coach programme' },
  { localPath: 'public/executive-coaching.webp', folder: 'programmes', alt: 'Executive and leadership coaching programme' },
  { localPath: 'public/health-wellness-coaching.webp', folder: 'programmes', alt: 'Health and wellness coaching programme' },
  { localPath: 'src/app/icon.png', folder: 'site', alt: 'International Coaching Institute favicon' },
  { localPath: 'src/app/apple-icon.png', folder: 'site', alt: 'International Coaching Institute app icon' },
];

function mimeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  return map[ext] ?? 'application/octet-stream';
}

async function main() {
  const prisma = createPrismaClient();

  const admin = await prisma.user.findFirst({
    where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } },
    orderBy: { createdAt: 'asc' },
  });

  if (!admin) {
    throw new Error('No admin user found. Run prisma seed first.');
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const asset of SITE_IMAGES) {
    const absPath = path.join(ROOT, asset.localPath);
    const fileName = path.basename(asset.localPath);
    const expectedBunnyPath = `${asset.folder}/${fileName}`;

    if (!fs.existsSync(absPath)) {
      console.warn(`⚠ Missing file, skipped: ${asset.localPath}`);
      skipped += 1;
      continue;
    }

    const existing = await prisma.mediaFile.findFirst({
      where: { bunnyPath: expectedBunnyPath },
    });

    if (existing) {
      console.log(`✓ Already in library: ${expectedBunnyPath}`);
      skipped += 1;
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(absPath);
      const mimeType = mimeFor(absPath);
      const arrayBuffer = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength,
      );

      const { url, path: bunnyPath } = await uploadToBunny(
        arrayBuffer,
        fileName,
        mimeType,
        asset.folder,
      );

      await prisma.mediaFile.create({
        data: {
          fileName,
          bunnyUrl: url,
          bunnyPath,
          fileType: detectMediaType(mimeType),
          mimeType,
          fileSizeBytes: fileBuffer.byteLength,
          altText: asset.alt,
          uploadedBy: admin.id,
        },
      });

      console.log(`↑ Uploaded: ${bunnyPath} → ${url}`);
      uploaded += 1;
    } catch (err) {
      console.error(`✗ Failed ${asset.localPath}:`, err instanceof Error ? err.message : err);
      failed += 1;
    }
  }

  console.log(`\nDone. Uploaded: ${uploaded}, skipped: ${skipped}, failed: ${failed}`);
  await prisma.$disconnect();

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
