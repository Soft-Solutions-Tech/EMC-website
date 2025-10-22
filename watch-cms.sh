#!/bin/bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# ============================================================================
# Configuration
# ============================================================================
readonly WATCH_DIR="/var/www/nextjs/data"
readonly UPDATE_SCRIPT="/var/www/nextjs/update.sh"
readonly LOG_FILE="/var/log/cms-watcher.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly DEBOUNCE_TIME=5
readonly COOLDOWN_TIME=10

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
should_ignore_file() {
    local file="$1"
    
    # Ignore temporary and backup files
    [[ "$file" =~ \.(swp|tmp|bak|~)$ ]] && return 0
    
    # Ignore hidden files
    [[ "$(basename "$file")" =~ ^\. ]] && return 0
    
    # Ignore lock files
    [[ "$file" =~ \.lock$ ]] && return 0
    
    return 1
}

# ============================================================================
# Update Trigger
# ============================================================================
trigger_update() {
    if [ -f "$LOCK_FILE" ]; then
        log "Update already running, skipping trigger"
        return 0
    fi
    
    log "Triggering update script..."
    
    if "$UPDATE_SCRIPT"; then
        log "Update completed successfully"
    else
        log_error "Update script failed with exit code $?"
    fi
}

# ============================================================================
# Cleanup Handler
# ============================================================================
cleanup() {
    log "Watcher shutting down gracefully..."
    rm -f "$LOCK_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# ============================================================================
# Main Watcher Loop
# ============================================================================
main() {
    log "========================================="
    log "CMS File Watcher Started"
    log "Watching directory: $WATCH_DIR"
    log "Update script: $UPDATE_SCRIPT"
    log "Debounce time: ${DEBOUNCE_TIME}s"
    log "Cooldown time: ${COOLDOWN_TIME}s"
    log "========================================="
    
    validate_environment
    
    # Remove stale lock on startup
    rm -f "$LOCK_FILE"
    
    # Start watching for file changes
    inotifywait -m -r \
        -e modify,create,delete,move \
        --format '%w%f %e' \
        "$WATCH_DIR" 2>> "$LOG_FILE" | while read -r file event; do
        
        # Skip ignored files
        if should_ignore_file "$file"; then
            continue
        fi
        
        log "Change detected: $(basename "$file") ($event)"
        
        # Wait for rapid changes to settle
        sleep "$DEBOUNCE_TIME"
        
        # Trigger update
        trigger_update
        
        # Cooldown to prevent rapid re-triggers
        log "Cooldown period: ${COOLDOWN_TIME}s"
        sleep "$COOLDOWN_TIME"
    done
}

# Run main function
main "$@"