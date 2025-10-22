#!/bin/bash

# Exit on error
set -e

# Log file
LOG_FILE="/var/log/nextjs-update.log"
echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting update" >> $LOG_FILE

cd /var/www/nextjs

# Stash local changes (rare, but safe)
git stash >> $LOG_FILE 2>&1

# Pull with rebase to avoid merge commits
git pull --rebase origin main >> $LOG_FILE 2>&1

# Apply stash if any
git stash pop >> $LOG_FILE 2>&1 || true  # Ignore if no stash

# Install deps only if package.json changed (optimized)
if git diff HEAD~1 --name-only | grep -q package.json; then
  npm ci >> $LOG_FILE 2>&1
fi

# Regenerate JS from JSON (your cms:generate)
node scripts/generate-js-from-json.cjs >> $LOG_FILE 2>&1

# Build
npm run build >> $LOG_FILE 2>&1

# Restart PM2
pm2 restart nextjs-app >> $LOG_FILE 2>&1

echo "$(date '+%Y-%m-%d %H:%M:%S') - Update complete" >> $LOG_FILE
