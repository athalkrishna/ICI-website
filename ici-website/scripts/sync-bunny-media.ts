/**
 * sync-bunny-media.ts
 *
 * Scans every file in your Bunny CDN storage zone and upserts a MediaFile
 * record in the database for each one.  Run this on the server once to
 * register all media that was uploaded from local.
 *
 * Usage (on the server):
 *   npx tsx scripts/sync-bunny-media.ts
 */

import 'dotenv/config';
import { PrismaClient, MediaFileType } from '@prisma/client';

const prisma = new PrismaClient();

// ── helpers ──────────────────────────────────────────────────────────────────

const MIME_MAP: Record<string, string> = {
  // images
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  avif: 'image/avif',
  // video
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  // audio
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  // documents
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
};

function extToMime(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
  return MIME_MAP[ext] ?? 'application/octet-stream';
}

function mimeToMediaType(mime: string): MediaFileType {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime.startsWith('audio/')) return 'AUDIO';
  return 'DOCUMENT';
}

// ── Bunny listing (recursive) ─────────────────────────────────────────────

type BunnyRow = {
  ObjectName: string;
  IsDirectory?: boolean;
  Length?: number;
};

async function listBunnyRecursive(
  zone: string,
  apiKey: string,
  prefix = '',
): Promise<{ name: string; path: string; size: number }[]> {
  const url = prefix
    ? `https://storage.bunnycdn.com/${zone}/${prefix}/`
    : `https://storage.bunnycdn.com/${zone}/`;

  const res = await fetch(url, { headers: { AccessKey: apiKey } });
  if (!res.ok) throw new Error(`Bunny list failed at "${prefix}": ${await res.text()}`);

  const rows = (await res.json()) as BunnyRow[];
  const results: { name: string; path: string; size: number }[] = [];

  for (const row of rows) {
    const fullPath = prefix ? `${prefix}/${row.ObjectName}` : row.ObjectName;
    if (row.IsDirectory) {
      const nested = await listBunnyRecursive(zone, apiKey, fullPath);
      results.push(...nested);
    } else {
      results.push({ name: row.ObjectName, path: fullPath, size: row.Length ?? 0 });
    }
  }

  return results;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const zone = process.env.BUNNY_STORAGE_ZONE_NAME || process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY || process.env.BUNNY_API_KEY;
  const cdnUrl = (process.env.BUNNY_CDN_URL || '').replace(/\/$/, '');

  if (!zone || !apiKey || !cdnUrl) {
    console.error('❌  Missing BUNNY_STORAGE_ZONE / BUNNY_API_KEY / BUNNY_CDN_URL in .env');
    process.exit(1);
  }

  // Find the first super-admin to use as uploader
  const adminUser = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' },
    select: { id: true, email: true },
  });
  if (!adminUser) {
    console.error('❌  No SUPER_ADMIN user found in database. Run db:seed first.');
    process.exit(1);
  }
  console.log(`✅  Using admin: ${adminUser.email} (${adminUser.id})\n`);

  // List all Bunny files
  console.log('📦  Listing all files in Bunny CDN...');
  const files = await listBunnyRecursive(zone, apiKey);
  console.log(`    Found ${files.length} file(s)\n`);

  let created = 0;
  let skipped = 0;

  for (const file of files) {
    const bunnyUrl = `${cdnUrl}/${file.path}`;
    const mime = extToMime(file.name);
    const mediaType = mimeToMediaType(mime);

    // Check if already registered in DB
    const existing = await prisma.mediaFile.findFirst({
      where: { bunnyPath: file.path },
    });

    if (existing) {
      console.log(`  ⏭   Already exists: ${file.path}`);
      skipped++;
    } else {
      await prisma.mediaFile.create({
        data: {
          fileName: file.name,
          bunnyUrl,
          bunnyPath: file.path,
          fileType: mediaType,
          mimeType: mime,
          fileSizeBytes: file.size,
          uploadedBy: adminUser.id,
        },
      });
      console.log(`  ✅  ${file.path}`);
      created++;
    }
  }

  console.log(`\n🎉  Done! Created: ${created} | Skipped (already existed): ${skipped}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
