#!/bin/bash
set -euo pipefail

# ============================================================================
# Configuration
# ============================================================================
readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600

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
    log "Lock acquired (PID: $$)"
}

# ============================================================================
# Git Operations
# ============================================================================
load_git_credentials() {
    if [ -f "$PROJECT_DIR/.env" ]; then
        log "Loading git credentials from .env..."
        set +u
        source "$PROJECT_DIR/.env"
        set -u
        
        if [ -n "${GITHUB_USERNAME:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
            git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" 2>/dev/null || true
            log "Git credentials configured"
        else
            log "WARNING: Git credentials not found in .env"
        fi
    else
        log "WARNING: .env file not found at $PROJECT_DIR/.env"
    fi
}

check_git_status() {
    log "Checking git status..."
    git status -s | tee -a "$LOG_FILE"
    
    if [[ -z $(git status -s) ]]; then
        log "No local changes detected"
        return 1
    else
        log "Local changes detected"
        return 0
    fi
}

commit_local_changes() {
    if check_git_status; then
        log "Staging all changes..."
        git add . >> "$LOG_FILE" 2>&1
        
        log "Creating commit..."
        git commit -m "Auto-update: CMS content [$(date '+%Y-%m-%d %H:%M:%S')]" >> "$LOG_FILE" 2>&1
        
        log "Pushing to GitHub..."
        if git push origin main >> "$LOG_FILE" 2>&1; then
            log "✓ Successfully pushed to GitHub"
            return 0
        else
            log_error "✗ Failed to push to GitHub"
            return 1
        fi
    else
        log "Skipping commit (no changes)"
        return 0
    fi
}

sync_with_remote() {
    log "Fetching from remote..."
    git fetch origin main >> "$LOG_FILE" 2>&1
    
    log "Checking if remote has new commits..."
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})
    
    if [ "$LOCAL" = "$REMOTE" ]; then
        log "Already up to date with remote"
        return 0
    fi
    
    log "Syncing with remote repository..."
    if git pull --rebase origin main >> "$LOG_FILE" 2>&1; then
        log "✓ Successfully synced with remote"
    else
        log_error "✗ Git pull failed, attempting to continue..."
        return 1
    fi
}

# ============================================================================
# Build Operations
# ============================================================================
check_dependency_changes() {
    if git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        return 0
    else
        return 1
    fi
}

install_dependencies() {
    if check_dependency_changes; then
        log "Package files changed, running npm ci..."
        npm ci >> "$LOG_FILE" 2>&1
        log "✓ Dependencies installed"
    else
        log "Skipping dependency installation (no package changes)"
    fi
}

generate_cms_files() {
    if [ -f "$PROJECT_DIR/scripts/generate-js-from-json.cjs" ]; then
        log "Regenerating JS from JSON..."
        node scripts/generate-js-from-json.cjs >> "$LOG_FILE" 2>&1
        log "✓ JS files regenerated"
    else
        log "WARNING: generate-js-from-json.cjs not found"
    fi
}

build_application() {
    log "Building Next.js application..."
    if npm run build >> "$LOG_FILE" 2>&1; then
        log "✓ Build completed successfully"
    else
        log_error "✗ Build failed"
        return 1
    fi
}

restart_application() {
    log "Restarting PM2 application..."
    if pm2 restart nextjs-app --update-env >> "$LOG_FILE" 2>&1; then
        log "✓ Application restarted"
    else
        log_error "✗ Failed to restart application"
        return 1
    fi
}

# ============================================================================
# Main Execution
# ============================================================================
main() {
    log "========================================="
    log "Starting CMS Update Process"
    log "Triggered at: $(date '+%Y-%m-%d %H:%M:%S')"
    log "Working directory: $PROJECT_DIR"
    log "========================================="
    
    acquire_lock
    
    cd "$PROJECT_DIR" || {
        log_error "Failed to change to project directory: $PROJECT_DIR"
        exit 1
    }
    
    log "Current directory: $(pwd)"
    log "Git branch: $(git branch --show-current)"
    
    load_git_credentials
    
    # First, generate JS files from JSON (CMS changes)
    generate_cms_files
    
    # Then commit and push those changes
    commit_local_changes
    
    # Sync with any remote changes
    sync_with_remote
    
    # Check and install dependencies if needed
    install_dependencies
    
    # Build the application
    build_application
    
    # Restart the application
    restart_application
    
    log "========================================="
    log "✓ Update Process Completed Successfully"
    log "Finished at: $(date '+%Y-%m-%d %H:%M:%S')"
    log "========================================="
}

# Run main function
main "$@"