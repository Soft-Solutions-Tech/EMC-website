#!/bin/bash
set -uo pipefail  # Remove set -e to allow continuing on non-critical failures

readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600
readonly MAX_RETRIES=3
readonly RETRY_DELAY=5

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
    [ ! -f "$PROJECT_DIR/.env" ] && { log_error "No .env file found"; return 1; }
    
    set +u
    source "$PROJECT_DIR/.env"
    set -u
    
    if [ -n "${GITHUB_USERNAME:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
        git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" 2>/dev/null || true
        log "Git credentials loaded"
    else
        log_error "Git credentials not found in .env"
        return 1
    fi
}

has_changes() {
    [[ -n $(git status -s 2>/dev/null) ]]
}

commit_and_push() {
    local commit_msg="$1"

    if ! has_changes; then
        log "No changes to commit"
        return 0
    fi
    
    log "Staging changes"
    git add . >> "$LOG_FILE" 2>&1 || log_error "Git add failed"
    
    log "Creating commit"
    git commit -m "$commit_msg: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE" 2>&1 || log_error "Git commit failed"
    
    log "Pushing to GitHub"
    git push origin main >> "$LOG_FILE" 2>&1 && log "Push successful" || log_error "Push failed"
}

sync_remote() {
    log "Fetching remote changes"
    git fetch origin main >> "$LOG_FILE" 2>&1 || log_error "Git fetch failed"
    
    local local_commit=$(git rev-parse @ 2>/dev/null || echo "")
    local remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "")
    
    if [ "$local_commit" = "$remote_commit" ]; then
        log "Already in sync with remote"
        return 0
    fi
    
    log "Pulling remote changes"
    git pull --rebase origin main >> "$LOG_FILE" 2>&1 && log "Remote sync successful" || log_error "Pull failed"
}

install_dependencies() {
    if git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "Installing dependencies"
        npm ci >> "$LOG_FILE" 2>&1 && log "Dependencies installed" || log_error "npm ci failed"
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
    node "$script" >> "$LOG_FILE" 2>&1 && log "JS files generated" || log_error "JS generation failed"
}

build_app() {
    log "Building application"
    npm run build >> "$LOG_FILE" 2>&1 && log "Build successful" || { log_error "Build failed"; return 1; }
}

process_exists() {
    pm2 pid nextjs-app | grep -q -v "0"
}

restart_app() {
    log "Restarting application"
    
    local retry=0
    while [ $retry -lt $MAX_RETRIES ]; do
        # Attempt to stop if exists
        if process_exists; then
            log "Stopping existing process (attempt $((retry+1)))"
            pm2 stop nextjs-app >> "$LOG_FILE" 2>&1 || true  # Ignore failure
            
            sleep $RETRY_DELAY
            
            if process_exists; then
                log "Stop failed - forcing delete (attempt $((retry+1)))"
                pm2 delete nextjs-app >> "$LOG_FILE" 2>&1 || true  # Ignore failure
                sleep $RETRY_DELAY
            fi
        else
            log "No existing process found"
        fi
        
        # Always attempt to start with full command
        log "Starting process (attempt $((retry+1)))"
        pm2 start npm --name "nextjs-app" -- run start --update-env --exp-backoff-restart-delay=100 >> "$LOG_FILE" 2>&1
        
        sleep $RETRY_DELAY
        
        # Check if online
        pm2 status >> "$LOG_FILE" 2>&1
        if process_exists && [ "$(pm2 status | grep nextjs-app | grep -c 'online')" -eq 1 ]; then
            log "Start successful and process is online"
            pm2 save >> "$LOG_FILE" 2>&1 || log_error "pm2 save failed"
            return 0
        fi
        
        log_error "Process not online after start - retrying"
        retry=$((retry + 1))
    done
    
    log_error "All restart attempts failed - manual intervention needed. Check pm2 logs: pm2 logs nextjs-app"
    # Optional: pm2 kill && pm2 resurrect or start daemon
    pm2 kill >> "$LOG_FILE" 2>&1 || true
    sleep 2
    pm2 start npm --name "nextjs-app" -- run start --update-env --exp-backoff-restart-delay=100 >> "$LOG_FILE" 2>&1
    pm2 save >> "$LOG_FILE" 2>&1 || log_error "pm2 save failed"
    return 1
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
    
    # Suppress git committer warning
    git config --local user.name "CMS Updater" 2>/dev/null || true
    git config --local user.email "updater@emc-egypt.net" 2>/dev/null || true
    
    load_git_credentials || log_error "Failed to load git credentials - continuing"
    
    commit_and_push "Pre-update: Commit local changes"
    
    sync_remote
    
    generate_js_files
    
    commit_and_push "Auto-regenerate JS files after CMS update"
    
    install_dependencies
    
    build_app || exit 1
    
    restart_app
    
    log "========================================"
    log "Update Completed"
    log "========================================"
}

main "$@"