#!/usr/bin/env bash
set -e

# Config
BUCKET_NAME="${1:-$AWS_QUIZ_BUCKET}"
DISTRIBUTION_ID="${2:-$AWS_CLOUDFRONT_DIST_ID}"

if [ -z "$BUCKET_NAME" ]; then
  echo "Error: BUCKET_NAME is required."
  echo "Usage: ./deploy/deploy-s3.sh <bucket-name> [cloudfront-distribution-id]"
  exit 1
fi

echo "🚀 Building Next.js static export..."
pnpm build

echo "📦 Syncing /out to s3://$BUCKET_NAME..."
aws s3 sync out/ "s3://$BUCKET_NAME" --delete

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "⚡ Invalidating CloudFront cache for distribution $DISTRIBUTION_ID..."
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
fi

echo "✅ Deployment complete!"
