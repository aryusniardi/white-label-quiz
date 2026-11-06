#!/usr/bin/env bash
set -e

PROJECT_NAME="${1:-white-label-quiz}"

echo "🚀 Building Next.js static export for Cloudflare Pages..."
pnpm build

echo "⛅ Deploying /out directory to Cloudflare Pages project: $PROJECT_NAME..."
npx wrangler pages deploy out --project-name "$PROJECT_NAME"

echo "✅ Cloudflare Pages deployment successfully triggered!"
