#!/bin/bash
set -euo pipefail

# ============================================================================
# Configuration
# ============================================================================
readonly WATCH_DIR="/var/www/nextjs/data"
readonly UPDATE_SCRIPT="/var/www/nextjs/update.sh"
readonly LOG_FILE="/var/log/cms-watcher.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly TRIGGER_FILE="/tmp/cms-trigger.flag"
readonly DEBOUNCE_TIME=3
readonly CHECK_INTERVAL=1

# ============================================================================
# Logging Functions
# ============================================================================
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: $*" | tee -a "$LOG_FILE" >&2
}

# ============================================================================
# Validation
# ============================================================================
validate_environment() {
    if ! command -v inotifywait &> /dev/null; then
        log_error "inotifywait not found. Install with: apt-get install inotify-tools"
        exit 1
    fi
    
    if [ ! -d "$WATCH_DIR" ]; then
        log_error "Watch directory does not exist: $WATCH_DIR"
        exit 1
    fi
    
    if [ ! -f "$UPDATE_SCRIPT" ]; then
        log_error "Update script not found: $UPDATE_SCRIPT"
        exit 1
    fi
    
    if [ ! -x "$UPDATE_SCRIPT" ]; then
        log_error "Update script is not executable: $UPDATE_SCRIPT"
        exit 1
    fi
}

# ============================================================================
# File Filtering
# ============================================================================
should_process_file() {
    local file="$1"
    
    # Ignore temporary and backup files
    [[ "$file" =~ \.(swp|tmp|bak|~)$ ]] && return 1
    
    # Ignore hidden files
    [[ "$(basename "$file")" =~ ^\. ]] && return 1
    
    # Ignore lock files
    [[ "$file" =~ \.lock$ ]] && return 1
    
    # Only process JSON files (since CMS writes JSON)
    [[ "$file" =~ \.json$ ]] && return 0
    
    return 1
}

# ============================================================================
# Update Trigger with Debouncing
# ============================================================================
trigger_update() {
    # Mark that a trigger is pending
    touch "$TRIGGER_FILE"
    log "Change detected, trigger marked (debouncing for ${DEBOUNCE_TIME}s)"
}

process_pending_trigger() {
    if [ ! -f "$TRIGGER_FILE" ]; then
        return 0
    fi
    
    # Check how long ago the trigger file was last modified
    local last_modified=$(stat -c %Y "$TRIGGER_FILE" 2>/dev/null || echo 0)
    local current_time=$(date +%s)
    local age=$((current_time - last_modified))
    
    # If trigger file is older than debounce time, execute update
    if [ "$age" -ge "$DEBOUNCE_TIME" ]; then
        if [ -f "$LOCK_FILE" ]; then
            log "Update already running, will retry after it completes"
            return 0
        fi
        
        # Remove trigger file before executing
        rm -f "$TRIGGER_FILE"
        
        log "Debounce period elapsed, executing update..."
        
        if "$UPDATE_SCRIPT"; then
            log "Update completed successfully"
        else
            log_error "Update script failed with exit code $?"
        fi
    fi
}

# ============================================================================
# Cleanup Handler
# ============================================================================
cleanup() {
    log "Watcher shutting down gracefully..."
    rm -f "$TRIGGER_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# ============================================================================
# Main Watcher Loop
# ============================================================================
main() {
    log "========================================="
    log "CMS File Watcher Started (Improved)"
    log "Watching directory: $WATCH_DIR"
    log "Update script: $UPDATE_SCRIPT"
    log "Debounce time: ${DEBOUNCE_TIME}s"
    log "Check interval: ${CHECK_INTERVAL}s"
    log "========================================="
    
    validate_environment
    
    # Remove stale files on startup
    rm -f "$TRIGGER_FILE"
    
    # Start background process to check for pending triggers
    (
        while true; do
            sleep "$CHECK_INTERVAL"
            process_pending_trigger
        done
    ) &
    local checker_pid=$!
    
    # Start watching for file changes
    log "Starting file watcher (PID: $$, Checker PID: $checker_pid)"
    
    inotifywait -m -r \
        -e modify,create,delete,move,close_write \
        --format '%w%f %e' \
        "$WATCH_DIR" 2>> "$LOG_FILE" | while read -r file event; do
        
        # Log all events for debugging
        log "Event detected: $(basename "$file") ($event)"
        
        # Skip non-JSON files
        if ! should_process_file "$file"; then
            log "Skipping: $(basename "$file") (filtered)"
            continue
        fi
        
        log "Processing: $(basename "$file") ($event)"
        trigger_update
    done
    
    # If we exit the loop, kill the checker process
    kill $checker_pid 2>/dev/null || true
}

# Run main function
main "$@"