/**
 * sync-bunny-media.ts
 * Lists all files in Bunny CDN and registers them in the media_files table.
 * Uses mysql2 directly — no Prisma config needed.
 *
 * Usage: npx tsx scripts/sync-bunny-media.ts
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// ── Load .env manually ────────────────────────────────────────────────────────
function loadEnv() {
  const envFile = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envFile)) return;
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([^#\s=][^=]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

// ── DB connection ─────────────────────────────────────────────────────────────
const db = await mysql.createPool({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'ici_website',
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const MIME_MAP: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', avif: 'image/avif',
  mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
  mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg',
  pdf: 'application/pdf', doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
};

function extToMime(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
  return MIME_MAP[ext] ?? 'application/octet-stream';
}

function mimeToMediaType(mime: string): string {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime.startsWith('audio/')) return 'AUDIO';
  return 'DOCUMENT';
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── Bunny listing ─────────────────────────────────────────────────────────────
type BunnyRow = { ObjectName: string; IsDirectory?: boolean; Length?: number };

async function listBunnyRecursive(
  zone: string, apiKey: string, prefix = ''
): Promise<{ name: string; path: string; size: number }[]> {
  const url = prefix
    ? `https://storage.bunnycdn.com/${zone}/${prefix}/`
    : `https://storage.bunnycdn.com/${zone}/`;

  const res = await fetch(url, { headers: { AccessKey: apiKey } });
  if (!res.ok) throw new Error(`Bunny list failed: ${await res.text()}`);

  const rows = (await res.json()) as BunnyRow[];
  const results: { name: string; path: string; size: number }[] = [];

  for (const row of rows) {
    const fullPath = prefix ? `${prefix}/${row.ObjectName}` : row.ObjectName;
    if (row.IsDirectory) {
      results.push(...await listBunnyRecursive(zone, apiKey, fullPath));
    } else {
      results.push({ name: row.ObjectName, path: fullPath, size: row.Length ?? 0 });
    }
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const zone = process.env.BUNNY_STORAGE_ZONE_NAME || process.env.BUNNY_STORAGE_ZONE;
const apiKey = process.env.BUNNY_STORAGE_API_KEY || process.env.BUNNY_API_KEY;
const cdnUrl = (process.env.BUNNY_CDN_URL || '').replace(/\/$/, '');

if (!zone || !apiKey || !cdnUrl) {
  console.error('❌  Missing BUNNY_STORAGE_ZONE / BUNNY_API_KEY / BUNNY_CDN_URL');
  process.exit(1);
}

// Get admin user id
const [admins]: any = await db.query(`SELECT id, email FROM users WHERE role = 'SUPER_ADMIN' LIMIT 1`);
if (!admins.length) {
  console.error('❌  No SUPER_ADMIN user found.');
  process.exit(1);
}
const adminId = admins[0].id;
console.log(`✅  Using admin: ${admins[0].email}\n`);

console.log('📦  Listing Bunny CDN files...');
const files = await listBunnyRecursive(zone, apiKey);
console.log(`    Found ${files.length} file(s)\n`);

let created = 0, skipped = 0;

for (const file of files) {
  const bunnyUrl = `${cdnUrl}/${file.path}`;
  const mime = extToMime(file.name);
  const mediaType = mimeToMediaType(mime);

  const [existing]: any = await db.query(
    `SELECT id FROM media_files WHERE bunny_path = ? LIMIT 1`, [file.path]
  );

  if (existing.length) {
    console.log(`  ⏭   Already exists: ${file.path}`);
    skipped++;
  } else {
    await db.query(
      `INSERT INTO media_files (id, file_name, bunny_url, bunny_path, file_type, mime_type, file_size_bytes, uploaded_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [generateId(), file.name, bunnyUrl, file.path, mediaType, mime, file.size, adminId]
    );
    console.log(`  ✅  ${file.path}`);
    created++;
  }
}

console.log(`\n🎉  Done! Created: ${created} | Already existed: ${skipped}`);
await db.end();
