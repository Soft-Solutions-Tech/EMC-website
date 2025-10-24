#!/bin/bash
set -euo pipefail

readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "$LOG_FILE" >&2
}

acquire_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_age=$(( $(date +%s) - $(stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0) ))
        if [ "$lock_age" -gt "$LOCK_TIMEOUT" ]; then
            log "Removing stale lock (${lock_age}s old)"
            rm -f "$LOCK_FILE"
        else
            log "Update in progress (lock age: ${lock_age}s) - exiting"
            exit 0
        fi
    fi
    
    touch "$LOCK_FILE"
    trap 'rm -f "$LOCK_FILE"' EXIT INT TERM
}

load_git_credentials() {
    if [ ! -f "$PROJECT_DIR/.env" ]; then
        log_error "No .env file found"
        return 1
    fi
    
    # shellcheck source=/dev/null
    source "$PROJECT_DIR/.env"
    
    if [ -z "${GITHUB_USERNAME:-}" ] || [ -z "${GITHUB_TOKEN:-}" ]; then
        log_error "Git credentials not found in .env"
        return 1
    fi
    
    git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" || {
        log_error "Failed to set git remote URL"
        return 1
    }
    log "Git credentials loaded"
}

has_changes() {
    [ -n "$(git status -s)" ]
}

commit_and_push() {
    local commit_msg="$1"
    
    if ! has_changes; then
        log "No changes to commit"
        return 0
    fi
    
    log "Staging changes"
    git add . || { log_error "Git add failed"; return 1; }
    
    log "Creating commit"
    GIT_AUTHOR_NAME="CMS Updater" GIT_AUTHOR_EMAIL="updater@emc-egypt.net" \
    GIT_COMMITTER_NAME="CMS Updater" GIT_COMMITTER_EMAIL="updater@emc-egypt.net" \
    git commit -m "$commit_msg: $(date '+%Y-%m-%d %H:%M:%S')" || { log_error "Git commit failed"; return 1; }
    
    log "Pushing to GitHub"
    git push origin main || { log_error "Push failed"; return 1; }
    log "Push successful"
}

sync_remote() {
    log "Fetching remote changes"
    git fetch origin main >> "$LOG_FILE" 2>&1 || { log_error "Git fetch failed"; return 1; }
    
    local local_commit=$(git rev-parse @ 2>/dev/null || echo "")
    local remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "")
    
    if [ "$local_commit" = "$remote_commit" ]; then
        log "Already in sync with remote"
        return 0
    fi
    
    log "Pulling remote changes"
    git pull --rebase origin main >> "$LOG_FILE" 2>&1 || { log_error "Pull failed"; return 1; }
    log "Remote sync successful"
}

install_dependencies() {
    if git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "Installing dependencies"
        npm ci >> "$LOG_FILE" 2>&1 || { log_error "npm ci failed"; return 1; }
        log "Dependencies installed"
    else
        log "No dependency changes"
    fi
}

generate_js_files() {
    local script="$PROJECT_DIR/scripts/generate-js-from-json.cjs"
    if [ ! -f "$script" ]; then
        log_error "Generator script not found"
        return 1
    fi
    
    log "Generating JS from JSON"
    node "$script" >> "$LOG_FILE" 2>&1 || { log_error "JS generation failed"; return 1; }
    log "JS files generated"
}

build_app() {
    log "Building application"
    npm run build >> "$LOG_FILE" 2>&1 || { log_error "Build failed"; return 1; }
    log "Build successful"
}

restart_app() {
    log "Restarting application"
    
    # Clean up all instances to avoid multiples/errored states
    pm2 delete nextjs-app >> "$LOG_FILE" 2>&1 || true
    
    # Start with correct option placement; rely on PM2 for restarts
    pm2 start npm \
        --interpreter bash \
        --name "nextjs-app" \
        --update-env \
        --exp-backoff-restart-delay=100 \
        -- run start >> "$LOG_FILE" 2>&1 || { log_error "PM2 start failed"; return 1; }
    
    # Wait for startup and verify
    sleep 10
    pm2 list >> "$LOG_FILE" 2>&1
    
    if pm2 list | grep -q "nextjs-app.*online"; then
        log "Application restarted successfully"
        pm2 save >> "$LOG_FILE" 2>&1 || log_error "pm2 save failed"
    else
        log_error "Application failed to go online - manual intervention needed. Check pm2 logs: pm2 logs nextjs-app"
        return 1
    fi
}

main() {
    log "========================================"
    log "Update Started"
    log "========================================"
    
    acquire_lock
    
    cd "$PROJECT_DIR" || { log_error "Cannot change to project directory"; exit 1; }
    
    load_git_credentials || { log_error "Failed to load git credentials"; exit 1; }
    
    commit_and_push "Pre-update: Commit local changes" || exit 1
    
    sync_remote || exit 1
    
    generate_js_files || exit 1
    
    commit_and_push "Auto-regenerate JS files after CMS update" || exit 1
    
    install_dependencies || exit 1
    
    build_app || exit 1
    
    restart_app || exit 1
    
    log "========================================"
    log "Update Completed"
    log "========================================"
}

main "$@"