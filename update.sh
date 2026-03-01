#!/bin/bash
set -euo pipefail

# Configuration
readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600
readonly ECOSYSTEM_FILE="$PROJECT_DIR/ecosystem.config.js"
readonly PM2_APP_NAME="nextjs-app"
readonly GIT_COMMIT_NAME="CMS Updater"
readonly GIT_COMMIT_EMAIL="updater@emc-egypt.net"

# ─────────────────────────────────────────────
# Logging
# ─────────────────────────────────────────────

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "$LOG_FILE" >&2
}

log_debug() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] DEBUG: $*" >> "$LOG_FILE"
}

log_section() {
    log "----------------------------------------"
    log "  $*"
    log "----------------------------------------"
}

# ─────────────────────────────────────────────
# Command Runners
# ─────────────────────────────────────────────

# Run with live output to terminal + log file
run_cmd() {
    log "Running: $*"
    if "$@" 2>&1 | tee -a "$LOG_FILE"; then
        return 0
    else
        local exit_code="${PIPESTATUS[0]}"
        log_error "Command failed (exit $exit_code): $*"
        return "$exit_code"
    fi
}

# Run silently - output goes to log file only
run_silent() {
    log_debug "Running (silent): $*"
    if "$@" >> "$LOG_FILE" 2>&1; then
        return 0
    else
        local exit_code=$?
        log_error "Command failed (exit $exit_code): $*"
        return "$exit_code"
    fi
}

# ─────────────────────────────────────────────
# Lock Management
# ─────────────────────────────────────────────

acquire_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_age=$(( $(date +%s) - $(stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0) ))
        if [ "$lock_age" -gt "$LOCK_TIMEOUT" ]; then
            log "Removing stale lock (${lock_age}s old)"
            rm -f "$LOCK_FILE"
        else
            log "Update already in progress (lock age: ${lock_age}s) - exiting"
            exit 0
        fi
    fi

    touch "$LOCK_FILE"
    trap 'rm -f "$LOCK_FILE"; log "Lock released"' EXIT INT TERM
    log_debug "Lock acquired: $LOCK_FILE"
}

# ─────────────────────────────────────────────
# Git Operations
# ─────────────────────────────────────────────

load_git_credentials() {
    log "Loading git credentials"
    local env_file="$PROJECT_DIR/.env"

    if [ ! -f "$env_file" ]; then
        log_error ".env file not found at $env_file"
        return 1
    fi

    # shellcheck source=/dev/null
    source "$env_file"

    if [ -z "${GITHUB_USERNAME:-}" ] || [ -z "${GITHUB_TOKEN:-}" ]; then
        log_error "GITHUB_USERNAME or GITHUB_TOKEN missing from .env"
        return 1
    fi

    if ! git remote set-url origin \
        "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" \
        >> "$LOG_FILE" 2>&1; then
        log_error "Failed to set git remote URL"
        return 1
    fi

    log "Git credentials loaded"
}

has_changes() {
    [ -n "$(git status --porcelain)" ]
}

git_stash_save() {
    if has_changes; then
        log_debug "Stashing local changes"
        if git stash --include-untracked >> "$LOG_FILE" 2>&1; then
            echo "true"
        else
            log_error "Git stash failed"
            echo "false"
            return 1
        fi
    else
        echo "false"
    fi
}

git_stash_pop() {
    local was_stashed="$1"
    if [ "$was_stashed" = "true" ]; then
        log_debug "Restoring stashed changes"
        if ! git stash pop >> "$LOG_FILE" 2>&1; then
            log_error "Git stash pop failed - possible merge conflict"
            log "Run: git stash show && git stash drop  (if changes are not needed)"
            return 1
        fi
        log_debug "Stash restored successfully"
    fi
}

sync_with_remote() {
    log "Syncing with remote repository"

    # Stash any dirty state before rebase
    local stashed
    stashed=$(git_stash_save) || return 1

    log_debug "Local commit:  $(git rev-parse @ 2>/dev/null || echo 'unknown')"
    log_debug "Remote commit: $(git rev-parse @{u} 2>/dev/null || echo 'unknown')"

    if ! run_cmd git fetch origin main; then
        git_stash_pop "$stashed" || true
        log_error "Git fetch failed"
        return 1
    fi

    local local_commit remote_commit
    local_commit=$(git rev-parse @ 2>/dev/null || echo "")
    remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "")

    if [ "$local_commit" = "$remote_commit" ]; then
        log "Already in sync with remote (commit: ${local_commit:0:8})"
        git_stash_pop "$stashed" || return 1
        return 0
    fi

    log_debug "Behind remote - pulling changes"
    if ! run_cmd git pull --rebase origin main; then
        git_stash_pop "$stashed" || true
        log_error "Git pull --rebase failed"
        return 1
    fi

    git_stash_pop "$stashed" || return 1

    log "Remote sync successful (now at: $(git rev-parse --short HEAD))"
}

commit_and_push() {
    local commit_msg="$1"

    if ! has_changes; then
        log "No changes to commit - skipping"
        return 0
    fi

    log_debug "Changes detected:"
    git status --short >> "$LOG_FILE" 2>&1

    # Sync before committing to avoid push conflicts
    sync_with_remote || return 1

    log "Staging all changes"
    if ! git add . >> "$LOG_FILE" 2>&1; then
        log_error "Git add failed"
        return 1
    fi

    # Re-check after sync (sync may have resolved the changes)
    if ! git diff --cached --quiet 2>/dev/null; then
        local full_msg="$commit_msg [$(date '+%Y-%m-%d %H:%M:%S')]"
        log "Committing: $full_msg"

    if ! GIT_AUTHOR_NAME="$GIT_COMMIT_NAME" \
                GIT_AUTHOR_EMAIL="$GIT_COMMIT_EMAIL" \
                GIT_COMMITTER_NAME="$GIT_COMMIT_NAME" \
                GIT_COMMITTER_EMAIL="$GIT_COMMIT_EMAIL" \
                git commit -m "$full_msg" >> "$LOG_FILE" 2>&1; then
            log_error "Git commit failed"
            return 1
        fi

        log "Pushing to remote"
        if ! run_cmd git push origin main; then
            log_error "Git push failed"
            return 1
        fi

        log "Committed and pushed ($(git rev-parse --short HEAD))"
    else
        log "Nothing to commit after sync - skipping push"
    fi
}

# ─────────────────────────────────────────────
# Application Management
# ─────────────────────────────────────────────

generate_js_files() {
    log_section "Generating JS Files"
    local script="$PROJECT_DIR/scripts/generate-js-from-json.cjs"

    if [ ! -f "$script" ]; then
        log_error "Generator script not found: $script"
        return 1
    fi

    if ! run_cmd node "$script"; then
        log_error "JS generation failed"
        return 1
    fi

    log "JS files generated successfully"
}

install_dependencies() {
    log_section "Checking Dependencies"
    local needs_install=false

    if [ ! -d "node_modules" ]; then
        log "node_modules missing - full install required"
        needs_install=true
    elif git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "package.json or package-lock.json changed - reinstalling"
        needs_install=true
    else
        log "Dependencies are up to date - skipping install"
        return 0
    fi

    if [ "$needs_install" = true ]; then
        log "Stopping PM2 to free memory before install"
        pm2 stop all >> "$LOG_FILE" 2>&1 || true
        pm2 kill >> "$LOG_FILE" 2>&1 || true

        sync
        echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || true
        sleep 2

        log "Available memory: $(free -h | grep Mem | awk '{print $7}')"
        log "Cleaning npm cache"
        run_silent npm cache clean --force

        log "Running npm install (optimized for low memory)"
        if ! NODE_OPTIONS="--max-old-space-size=400" \
             run_cmd npm install --prefer-offline --no-audit --no-fund --legacy-peer-deps; then
            log_error "npm install failed"
            return 1
        fi

        log "Dependencies installed successfully"
    fi
}

build_app() {
    log_section "Building Application"
    log "Stopping PM2 to free memory for build"
    pm2 stop all >> "$LOG_FILE" 2>&1 || true
    pm2 kill >> "$LOG_FILE" 2>&1 || true

    sync
    echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || true
    sleep 2

    log "Available memory: $(free -h | grep Mem | awk '{print $7}')"
    log "Starting Next.js build (may take 10-20 min on low-memory systems)"

    if ! NODE_OPTIONS="--max-old-space-size=600 --max-semi-space-size=2" \
         run_cmd npm run build; then
        log_error "Build failed"
        return 1
    fi

    log "Build completed successfully"
}

restart_app() {
    log_section "Restarting Application"

    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        log_error "ecosystem.config.js not found: $ECOSYSTEM_FILE"
        return 1
    fi

    # Stop existing instance
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        log "Stopping existing PM2 process: $PM2_APP_NAME"
        run_cmd pm2 delete "$PM2_APP_NAME" || true
    fi

    # Source env for PM2
    if [ -f "$PROJECT_DIR/.env" ]; then
        # shellcheck source=/dev/null
        source "$PROJECT_DIR/.env"
        log_debug "Environment loaded from .env"
    fi

    log "Starting $PM2_APP_NAME via PM2"
    if ! run_cmd pm2 start "$ECOSYSTEM_FILE" --env production; then
        log_error "PM2 start failed"
        return 1
    fi

    log "Waiting for application to initialize (10s)"
    sleep 10

    log "PM2 process list:"
    run_cmd pm2 list

    if pm2 list | grep -q "$PM2_APP_NAME.*online"; then
        log "Application is online"
        run_silent pm2 save || log_error "Failed to save PM2 state"

        log "Recent application logs:"
        run_cmd pm2 logs "$PM2_APP_NAME" --lines 20 --nostream
        return 0
    else
        log_error "Application failed to come online"
        log "Full PM2 logs:"
        run_cmd pm2 logs "$PM2_APP_NAME" --lines 50 --nostream
        return 1
    fi
}

# ─────────────────────────────────────────────
# Prerequisites
# ─────────────────────────────────────────────

verify_prerequisites() {
    log "Verifying prerequisites"
    local missing=()

    for cmd in git node npm pm2; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            missing+=("$cmd")
        fi
    done

    if [ "${#missing[@]}" -ne 0 ]; then
        log_error "Missing required tools: ${missing[*]}"
        return 1
    fi

    log "Node: $(node --version) | npm: $(npm --version) | PM2: $(pm2 --version)"
}

# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────

main() {
    log_section "Update Process Started"
    log "PID: $$  |  User: $(whoami)  |  Dir: $PROJECT_DIR"

    acquire_lock

    cd "$PROJECT_DIR" || {
        log_error "Cannot access project directory: $PROJECT_DIR"
        exit 1
    }

    verify_prerequisites      || exit 1
    load_git_credentials      || exit 1

    # 1. Commit any pre-existing local changes
    commit_and_push "Pre-update: auto-commit local changes" || exit 1

    # 2. Pull latest from remote
    sync_with_remote          || exit 1

    # 3. Regenerate JS from JSON data
    generate_js_files         || exit 1

    # 4. Commit generated files
    commit_and_push "Auto-generate JS files from JSON" || exit 1

    # 5. Install deps if needed
    install_dependencies      || exit 1

    # 6. Build
    build_app                 || exit 1

    # 7. Restart
    restart_app               || exit 1

    log_section "Update Completed Successfully"
    log "Log file: $LOG_FILE"
}

main "$@"
