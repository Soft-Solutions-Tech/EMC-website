#!/bin/bash

# Exit on error
set -e

# Log file
LOG_FILE="/var/log/nextjs-update.log"
echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting update" >> $LOG_FILE

cd /var/www/nextjs

# Check if there are local changes
if [[ -n $(git status -s) ]]; then
  echo "$(date '+%Y-%m-%d %H:%M:%S') - Local changes detected, committing..." >> $LOG_FILE
  git add . >> $LOG_FILE 2>&1
  git commit -m "Auto-update: CMS content changed" >> $LOG_FILE 2>&1
fi

# Pull latest from remote (if any)
git pull --rebase origin main >> $LOG_FILE 2>&1 || true

# Install deps only if package.json changed
if git diff HEAD~1 --name-only 2>/dev/null | grep -q package.json; then
  echo "$(date '+%Y-%m-%d %H:%M:%S') - package.json changed, installing dependencies..." >> $LOG_FILE
  npm ci >> $LOG_FILE 2>&1
fi

# Regenerate JS from JSON (if you have this script)
if [ -f "scripts/generate-js-from-json.cjs" ]; then
  node scripts/generate-js-from-json.cjs >> $LOG_FILE 2>&1
fi

# Build
echo "$(date '+%Y-%m-%d %H:%M:%S') - Building..." >> $LOG_FILE
npm run build >> $LOG_FILE 2>&1

# Restart PM2
echo "$(date '+%Y-%m-%d %H:%M:%S') - Restarting PM2..." >> $LOG_FILE
pm2 restart nextjs-app >> $LOG_FILE 2>&1

echo "$(date '+%Y-%m-%d %H:%M:%S') - Update complete" >> $LOG_FILE
