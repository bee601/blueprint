#!/usr/bin/env bash
# Blueprint theme installer for fresh Pterodactyl panels.
# Run from the repo root.
set -euo pipefail

echo "▶ Installing Blueprint dependencies..."
composer install --no-dev --optimize-autoloader
npm ci

echo "▶ Building assets..."
npm run build

echo "▶ Publishing assets to public/blueprint..."
php artisan blueprint:publish-assets

echo "▶ Writing CSS overrides into your public/build..."
mkdir -p public/vendor/blueprint
cp -r dist/css public/vendor/blueprint/css
cp -r dist/js  public/vendor/blueprint/js

echo "✓ Blueprint is installed. Reload the panel in your browser."
