/**
 * One-off asset optimiser — compresses large PNGs to WebP for faster LCP.
 * Run: node scripts/optimize-public-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const jobs = [
  { in: 'public/logo-transparent.png', out: 'public/logo-transparent.webp', w: 480 },
  { in: 'public/logo-white.png', out: 'public/logo-white.webp', w: 480 },
  { in: 'public/aspiring-coaches.png', out: 'public/aspiring-coaches.webp', w: 800 },
  { in: 'public/experienced-practitioners.png', out: 'public/experienced-practitioners.webp', w: 800 },
  { in: 'public/organisations-leaders.png', out: 'public/organisations-leaders.webp', w: 800 },
  { in: 'public/certified-life-coach.png', out: 'public/certified-life-coach.webp', w: 800 },
  { in: 'public/executive-coaching.png', out: 'public/executive-coaching.webp', w: 800 },
  { in: 'public/health-wellness-coaching.png', out: 'public/health-wellness-coaching.webp', w: 800 },
  { in: 'public/ici-difference-coaching.png', out: 'public/ici-difference-coaching.webp', w: 900 },
  { in: 'public/images/global-network-bg.png', out: 'public/images/global-network-bg.webp', w: 1600 },
];

for (const job of jobs) {
  const input = path.join(root, job.in);
  const output = path.join(root, job.out);
  if (!fs.existsSync(input)) {
    console.log('skip missing', job.in);
    continue;
  }
  const before = fs.statSync(input).size;
  await sharp(input)
    .resize(job.w, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  const after = fs.statSync(output).size;
  console.log(`${path.basename(job.out)}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
}

console.log('Done.');
