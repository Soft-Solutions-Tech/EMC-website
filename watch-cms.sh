#!/bin/bash
set -euo pipefail

readonly WATCH_DIR="/var/www/nextjs/data"
readonly UPDATE_SCRIPT="/var/www/nextjs/update.sh"
readonly LOG_FILE="/var/log/cms-watcher.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly TRIGGER_FILE="/tmp/cms-trigger.flag"
readonly DEBOUNCE_TIME=3
readonly CHECK_INTERVAL=1

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "$LOG_FILE" >&2
}

validate_environment() {
    if ! command -v inotifywait &> /dev/null; then
        log_error "inotifywait not found. Install: apt-get install inotify-tools"
        exit 1
    fi
    
    [ ! -d "$WATCH_DIR" ] && { log_error "Watch directory missing: $WATCH_DIR"; exit 1; }
    [ ! -f "$UPDATE_SCRIPT" ] && { log_error "Update script missing: $UPDATE_SCRIPT"; exit 1; }
    [ ! -x "$UPDATE_SCRIPT" ] && { log_error "Update script not executable: $UPDATE_SCRIPT"; exit 1; }
}

should_process_file() {
    local file="$1"
    [[ "$file" =~ \.(swp|tmp|bak|~|lock)$ ]] && return 1
    [[ "$(basename "$file")" =~ ^\. ]] && return 1
    [[ "$file" =~ \.(json|js)$ ]] && return 0
    return 1
}

trigger_update() {
    touch "$TRIGGER_FILE"
    log "Change detected - debouncing ${DEBOUNCE_TIME}s"
}

process_pending_trigger() {
    [ ! -f "$TRIGGER_FILE" ] && return 0
    
    local last_modified=$(stat -c %Y "$TRIGGER_FILE" 2>/dev/null || echo 0)
    local current_time=$(date +%s)
    local age=$((current_time - last_modified))
    
    if [ "$age" -ge "$DEBOUNCE_TIME" ]; then
        [ -f "$LOCK_FILE" ] && { log "Update in progress - skipping"; return 0; }
        
        rm -f "$TRIGGER_FILE"
        log "Executing update script"
        
        if "$UPDATE_SCRIPT"; then
            log "Update completed successfully"
        else
            log_error "Update failed (exit code: $?)"
        fi
    fi
}

cleanup() {
    log "Shutting down watcher"
    rm -f "$TRIGGER_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

main() {
    log "========================================="
    log "CMS Watcher Started"
    log "Directory: $WATCH_DIR"
    log "Watching: *.json, *.js files"
    log "========================================="
    
    validate_environment
    rm -f "$TRIGGER_FILE"
    
    (
        while true; do
            sleep "$CHECK_INTERVAL"
            process_pending_trigger
        done
    ) &
    local checker_pid=$!
    
    log "Watcher active (PID: $$, Checker: $checker_pid)"
    
    inotifywait -m -r \
        -e modify,create,delete,move,close_write \
        --format '%w%f %e' \
        "$WATCH_DIR" 2>> "$LOG_FILE" | while read -r file event; do
        
        should_process_file "$file" || continue
        log "File changed: $(basename "$file")"
        trigger_update
    done
    
    kill $checker_pid 2>/dev/null || true
}

main "$@"