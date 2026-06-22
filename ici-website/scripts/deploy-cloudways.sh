#!/usr/bin/env bash
# Run on Cloudways SSH after Git Pull:
#   cd ~/applications/gjrsrtruhn/public_html/ici-website
#   bash scripts/deploy-cloudways.sh
set -euo pipefail

cd "$(dirname "$0")/.."
echo "==> Working directory: $(pwd)"

echo "==> npm install..."
npm install --cache "/tmp/npm-cache-$(whoami)"

echo "==> prisma generate..."
npx prisma generate

echo "==> prisma db push..."
npx prisma db push

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
echo "SUCCESS. Now: Cloudways dashboard -> Restart App -> Purge cache."
