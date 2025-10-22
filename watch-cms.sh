#!/bin/bash

# Directory to watch (adjust if your CMS data is elsewhere)
WATCH_DIR="/var/www/nextjs/data"
UPDATE_SCRIPT="/var/www/nextjs/update.sh"
LOG_FILE="/var/log/cms-watcher.log"

echo "$(date '+%Y-%m-%d %H:%M:%S') - CMS Watcher started" >> $LOG_FILE

# Watch for file changes
inotifywait -m -r -e modify,create,delete --format '%w%f %e' "$WATCH_DIR" | while read FILE EVENT
do
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Detected change: $FILE ($EVENT)" >> $LOG_FILE
    
    # Wait 2 seconds for multiple changes to settle
    sleep 2
    
    # Run update script
    $UPDATE_SCRIPT
done
