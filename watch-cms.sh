#!/bin/bash

WATCH_DIR="/var/www/nextjs/data"
UPDATE_SCRIPT="/var/www/nextjs/update.sh"
LOG_FILE="/var/log/cms-watcher.log"
LOCK_FILE="/tmp/cms-update.lock"
DEBOUNCE_TIME=5  # seconds to wait before triggering

echo "$(date '+%Y-%m-%d %H:%M:%S') - CMS Watcher started" >> $LOG_FILE

# Remove stale lock file on start
rm -f $LOCK_FILE

inotifywait -m -r -e modify,create,delete --format '%w%f %e' "$WATCH_DIR" | while read FILE EVENT
do
    # Skip if lock file exists (update already running)
    if [ -f "$LOCK_FILE" ]; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Update already running, skipping" >> $LOG_FILE
        continue
    fi
    
    # Skip temporary/backup files
    if [[ "$FILE" =~ \.(swp|tmp|bak)$ ]]; then
        continue
    fi
    
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Change detected: $FILE ($EVENT)" >> $LOG_FILE
    
    # Create lock file
    touch $LOCK_FILE
    
    # Wait for multiple rapid changes to settle
    sleep $DEBOUNCE_TIME
    
    # Run update script
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Triggering update..." >> $LOG_FILE
    $UPDATE_SCRIPT
    
    # Remove lock file
    rm -f $LOCK_FILE
    
    # Cooldown period to prevent rapid re-triggers
    sleep 10
done
