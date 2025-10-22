#!/bin/bash
set -euo pipefail

readonly WATCH_DIR="/var/www/nextjs/data"
readonly UPDATE_SCRIPT="/var/www/nextjs/update.sh"
readonly LOG_FILE="/var/log/cms-watcher.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly TRIGGER_FILE="/tmp/cms-trigger.flag"
readonly DEBOUNCE_TIME=5
readonly CHECK_INTERVAL=1

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "$LOG_FILE" >&2
}

validate_environment() {
    command -v inotifywait &>/dev/null || { log_error "inotifywait not found"; return 1; }
    [ -d "$WATCH_DIR" ] || { log_error "Directory not found: $WATCH_DIR"; return 1; }
    [ -f "$UPDATE_SCRIPT" ] || { log_error "Update script not found"; return 1; }
    [ -x "$UPDATE_SCRIPT" ] || { log_error "Update script not executable"; return 1; }
    return 0
}

should_process_file() {
    local file="$1"
    # Ignore temp files
    [[ "$file" =~ \.(swp|tmp|bak|~|lock)$ ]] && return 1
    [[ "$(basename "$file")" =~ ^\. ]] && return 1
    
    # ONLY process JSON files - CMS writes JSON, not JS
    [[ "$file" =~ \.json$ ]] && return 0
    
    return 1
}

trigger_update() {
    touch "$TRIGGER_FILE"
    log "JSON changed - debouncing ${DEBOUNCE_TIME}s"
}

process_pending_trigger() {
    [ ! -f "$TRIGGER_FILE" ] && return 0
    
    local last_modified=$(stat -c %Y "$TRIGGER_FILE" 2>/dev/null || echo 0)
    local current_time=$(date +%s)
    local age=$((current_time - last_modified))
    
    if [ "$age" -ge "$DEBOUNCE_TIME" ]; then
        [ -f "$LOCK_FILE" ] && { log "Update running - skip"; return 0; }
        
        rm -f "$TRIGGER_FILE"
        log "Starting update..."
        
        if "$UPDATE_SCRIPT"; then
            log "✓ Update complete"
        else
            log_error "✗ Update failed ($?)"
        fi
    fi
}

cleanup() {
    log "Shutdown"
    rm -f "$TRIGGER_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM

main() {
    log "========================================"
    log "Watcher started (PID: $$)"
    log "Watching: $WATCH_DIR/*.json ONLY"
    log "========================================"
    
    validate_environment || exit 1
    rm -f "$TRIGGER_FILE"
    
    # Background checker
    while true; do
        sleep "$CHECK_INTERVAL"
        process_pending_trigger
    done &
    local checker_pid=$!
    
    log "Ready (Checker: $checker_pid)"
    
    # Watch ONLY JSON files
    inotifywait -m -r \
        -e modify,create,delete,move,close_write \
        --format '%w%f %e' \
        "$WATCH_DIR" 2>/dev/null | while IFS= read -r line; do
        
        local file=$(echo "$line" | awk '{print $1}')
        should_process_file "$file" || continue
        
        log "JSON changed: $(basename "$file")"
        trigger_update
    done
    
    log_error "Watch loop exited"
    kill $checker_pid 2>/dev/null || true
}

main
