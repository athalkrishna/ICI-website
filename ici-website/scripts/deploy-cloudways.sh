#!/usr/bin/env bash
# Run on Cloudways SSH after Git Pull:
#   cd ~/applications/tkfxsgmxuc/public_html/ici-website
#   bash scripts/deploy-cloudways.sh
set -euo pipefail

cd "$(dirname "$0")/.."
echo "==> Working directory: $(pwd)"
echo "==> Branch: $(git branch --show-current) @ $(git rev-parse --short HEAD)"

echo ""
echo "WARNING: Production deploys must use branch 'main' only."
echo "WARNING: Do NOT run 'npm run db:seed' or 'npm run db:seed-page-seo -- --force' on production."
echo "         Those commands can overwrite CMS SEO values. Use 'npm run db:repair-home-hero' instead."
echo ""

echo "==> npm install..."
npm install --cache "/tmp/npm-cache-$(whoami)"

echo "==> prisma generate..."
npx prisma generate

echo "==> prisma db push..."
npx prisma db push

echo "==> Verifying coaches table..."
npx tsx scripts/test-coaches-table.ts

echo "==> next build (webpack)..."
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"
npm run build

echo "==> Verifying CSS was generated..."
CSS_COUNT=$(find .next/static/css -name '*.css' 2>/dev/null | wc -l | tr -d ' ')
if [ "${CSS_COUNT:-0}" -eq 0 ]; then
  echo "ERROR: No CSS files in .next/static/css — build did not produce styles."
  echo "Check build output above. Site will look unstyled without this."
  exit 1
fi
echo "OK: Found ${CSS_COUNT} CSS file(s) in .next/static/css/"

echo ""
echo "SUCCESS. Recommended post-deploy (once per release if homepage reverted):"
echo "  npm run db:repair-home-hero"
echo "  npm run db:repair-seo"
echo ""
echo "Then: Cloudways dashboard -> Restart App -> Purge cache."
