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

echo ""
echo "SUCCESS. Now: Cloudways dashboard -> Restart App -> Purge cache."
