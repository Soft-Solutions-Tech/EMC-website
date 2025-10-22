#!/bin/bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# ============================================================================
# Configuration
# ============================================================================
readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600  # 10 minutes

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
# Lock Management
# ============================================================================
acquire_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_age=$(($(date +%s) - $(stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0)))
        if [ "$lock_age" -gt "$LOCK_TIMEOUT" ]; then
            log "Stale lock detected (${lock_age}s old), removing..."
            rm -f "$LOCK_FILE"
        else
            log "Update already running (lock age: ${lock_age}s), exiting"
            exit 0
        fi
    fi
    
    touch "$LOCK_FILE"
    trap 'rm -f "$LOCK_FILE"' EXIT INT TERM
}

# ============================================================================
# Git Operations
# ============================================================================
load_git_credentials() {
    if [ -f "$PROJECT_DIR/.env" ]; then
        set +u  # Allow undefined vars temporarily
        source "$PROJECT_DIR/.env"
        set -u
        
        if [ -n "${GITHUB_USERNAME:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
            git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" 2>/dev/null || true
        fi
    fi
}

commit_local_changes() {
    if [[ -n $(git status -s) ]]; then
        log "Local changes detected, committing..."
        git add . >> "$LOG_FILE" 2>&1
        git commit -m "Auto-update: CMS content [$(date '+%Y-%m-%d %H:%M:%S')]" >> "$LOG_FILE" 2>&1
        
        log "Pushing to GitHub..."
        if git push origin main >> "$LOG_FILE" 2>&1; then
            log "Successfully pushed to GitHub"
        else
            log_error "Failed to push to GitHub (continuing anyway)"
        fi
    fi
}

sync_with_remote() {
    log "Syncing with remote repository..."
    git pull --rebase origin main >> "$LOG_FILE" 2>&1 || {
        log_error "Git pull failed, attempting to continue..."
        return 0
    }
}

# ============================================================================
# Build Operations
# ============================================================================
install_dependencies() {
    if git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "Dependencies changed, running npm ci..."
        npm ci >> "$LOG_FILE" 2>&1
    fi
}

generate_cms_files() {
    if [ -f "$PROJECT_DIR/scripts/generate-js-from-json.cjs" ]; then
        log "Regenerating JS from JSON..."
        node scripts/generate-js-from-json.cjs >> "$LOG_FILE" 2>&1
    fi
}

build_application() {
    log "Building application..."
    npm run build >> "$LOG_FILE" 2>&1
}

restart_application() {
    log "Restarting application..."
    pm2 restart nextjs-app --update-env >> "$LOG_FILE" 2>&1
}

# ============================================================================
# Main Execution
# ============================================================================
main() {
    log "========================================="
    log "Starting deployment update"
    log "========================================="
    
    acquire_lock
    
    cd "$PROJECT_DIR" || {
        log_error "Failed to change to project directory"
        exit 1
    }
    
    load_git_credentials
    commit_local_changes
    sync_with_remote
    install_dependencies
    generate_cms_files
    build_application
    restart_application
    
    log "========================================="
    log "Update completed successfully"
    log "========================================="
}

# Run main function
main "$@"