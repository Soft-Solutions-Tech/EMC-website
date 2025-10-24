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
        local lock_age=$(($(date +%s) - $(stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0)))
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
    [ ! -f "$PROJECT_DIR/.env" ] && { log "No .env file found"; return 1; }
    
    set +u
    source "$PROJECT_DIR/.env"
    set -u
    
    if [ -n "${GITHUB_USERNAME:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
        git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" 2>/dev/null || true
        log "Git credentials loaded"
    else
        log "Git credentials not found in .env"
        return 1
    fi
}

has_changes() {
    [[ -n $(git status -s) ]]
}

commit_and_push() {
    local commit_msg="$1"  # Allow custom message

    if ! has_changes; then
        log "No changes to commit"
        return 0
    fi
    
    log "Staging changes"
    git add . >> "$LOG_FILE" 2>&1
    
    log "Creating commit"
    git commit -m "$commit_msg: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE" 2>&1
    
    log "Pushing to GitHub"
    if git push origin main >> "$LOG_FILE" 2>&1; then
        log "Push successful"
        return 0
    else
        log_error "Push failed"
        return 1
    fi
}

sync_remote() {
    log "Fetching remote changes"
    git fetch origin main >> "$LOG_FILE" 2>&1
    
    local local_commit=$(git rev-parse @ 2>/dev/null || echo "")
    local remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "")
    
    if [ "$local_commit" = "$remote_commit" ]; then
        log "Already in sync with remote"
        return 0
    fi
    
    log "Pulling remote changes"
    if git pull --rebase origin main >> "$LOG_FILE" 2>&1; then
        log "Remote sync successful"
        return 0
    else
        log_error "Pull failed"
        return 1
    fi
}

install_dependencies() {
    if git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "Installing dependencies"
        npm ci >> "$LOG_FILE" 2>&1
        log "Dependencies installed"
    else
        log "No dependency changes"
    fi
}

generate_js_files() {
    local script="$PROJECT_DIR/scripts/generate-js-from-json.cjs"
    if [ ! -f "$script" ]; then
        log "Generator script not found"
        return 1
    fi
    
    log "Generating JS from JSON"
    node "$script" >> "$LOG_FILE" 2>&1
    log "JS files generated"
}

build_app() {
    log "Building application"
    if npm run build >> "$LOG_FILE" 2>&1; then
        log "Build successful"
        return 0
    else
        log_error "Build failed"
        return 1
    fi
}

restart_app() {
    log "Restarting application"
    
    # Check if process exists
    if pm2 describe nextjs-app > /dev/null 2>&1; then
        log "Stopping existing process"
        if pm2 stop nextjs-app >> "$LOG_FILE" 2>&1; then
            sleep 2  # Wait for clean shutdown
        else
            log_error "Stop failed - forcing delete"
            pm2 delete nextjs-app >> "$LOG_FILE" 2>&1
        fi
    else
        log "No existing process found - proceeding to start"
    fi
    
    # Start fresh with exponential backoff for crashes
    log "Starting process"
    if pm2 start nextjs-app --update-env --exp-backoff-restart-delay=100 >> "$LOG_FILE" 2>&1 && sleep 5 && [ "$(pm2 status nextjs-app | grep -c 'online')" -eq 1 ]; then
        log "Start successful and process is online"
        return 0
    else
        log_error "Start failed - retrying"
        sleep 2
        pm2 restart nextjs-app --update-env --exp-backoff-restart-delay=100 >> "$LOG_FILE" 2>&1
        sleep 5
        if [ "$(pm2 status nextjs-app | grep -c 'online')" -eq 1 ]; then
            log "Retry successful"
            return 0
        else
            log_error "Retry failed - restarting PM2 daemon"
            pm2 kill >> "$LOG_FILE" 2>&1
            sleep 2
            pm2 resurrect >> "$LOG_FILE" 2>&1 || pm2 start nextjs-app --update-env --exp-backoff-restart-delay=100 >> "$LOG_FILE" 2>&1
            sleep 5
            if [ "$(pm2 status nextjs-app | grep -c 'online')" -eq 1 ]; then
                log "Daemon restart successful"
                return 0
            else
                log_error "All attempts failed - check PM2 logs for details (pm2 logs nextjs-app). Manual intervention needed."
                return 1
            fi
        fi
    fi
}

main() {
    log "========================================"
    log "Update Started"
    log "========================================"
    
    acquire_lock
    
    cd "$PROJECT_DIR" || {
        log_error "Cannot change to project directory"
        exit 1
    }
    
    load_git_credentials
    
    # Commit and push any existing local changes first
    commit_and_push "Pre-update: Commit local changes"
    
    # Now sync (pull) remote changes safely
    sync_remote
    
    # Generate JS from latest JSON (may create new changes)
    generate_js_files
    
    # Commit and push any new changes from generation
    commit_and_push "Auto-regenerate JS files after CMS update"
    
    install_dependencies
    build_app
    restart_app
    
    log "========================================"
    log "Update Completed"
    log "========================================"
}

main "$@"