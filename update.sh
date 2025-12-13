#!/bin/bash
set -euo pipefail

# Configuration
readonly PROJECT_DIR="/var/www/nextjs"
readonly LOG_FILE="/var/log/nextjs-update.log"
readonly LOCK_FILE="/tmp/cms-update.lock"
readonly LOCK_TIMEOUT=600
readonly ECOSYSTEM_FILE="$PROJECT_DIR/ecosystem.config.js"
readonly PM2_APP_NAME="nextjs-app"

# Logging functions
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "$LOG_FILE" >&2
}

# Lock management
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
    trap 'rm -f "$LOCK_FILE"' EXIT INT TERM
}

# Git operations
load_git_credentials() {
    local env_file="$PROJECT_DIR/.env"
    
    if [ ! -f "$env_file" ]; then
        log_error ".env file not found"
        return 1
    fi
    
    # shellcheck source=/dev/null
    source "$env_file"
    
    if [ -z "${GITHUB_USERNAME:-}" ] || [ -z "${GITHUB_TOKEN:-}" ]; then
        log_error "GITHUB_USERNAME or GITHUB_TOKEN not found in .env"
        return 1
    fi
    
    git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Soft-Solutions-Tech/EMC-website.git" 2>> "$LOG_FILE" || {
        log_error "Failed to set git remote URL"
        return 1
    }
    
    log "Git credentials loaded"
}

has_changes() {
    [ -n "$(git status -s)" ]
}

sync_with_remote() {
    log "Syncing with remote repository"
    
    git fetch origin main >> "$LOG_FILE" 2>&1 || {
        log_error "Git fetch failed"
        return 1
    }
    
    local local_commit=$(git rev-parse @ 2>/dev/null || echo "")
    local remote_commit=$(git rev-parse @{u} 2>/dev/null || echo "")
    
    if [ "$local_commit" = "$remote_commit" ]; then
        log "Already in sync with remote"
        return 0
    fi
    
    git pull --rebase origin main >> "$LOG_FILE" 2>&1 || {
        log_error "Git pull failed"
        return 1
    }
    
    log "Remote sync successful"
}

commit_and_push() {
    local commit_msg="$1"
    
    if ! has_changes; then
        log "No changes to commit"
        return 0
    fi
    
    # Always sync before committing to avoid conflicts
    sync_with_remote || return 1
    
    log "Committing changes: $commit_msg"
    git add . >> "$LOG_FILE" 2>&1 || {
        log_error "Git add failed"
        return 1
    }
    
    GIT_AUTHOR_NAME="CMS Updater" \
    GIT_AUTHOR_EMAIL="updater@emc-egypt.net" \
    GIT_COMMITTER_NAME="CMS Updater" \
    GIT_COMMITTER_EMAIL="updater@emc-egypt.net" \
    git commit -m "$commit_msg [$(date '+%Y-%m-%d %H:%M:%S')]" >> "$LOG_FILE" 2>&1 || {
        log_error "Git commit failed"
        return 1
    }
    
    log "Pushing to remote"
    git push origin main >> "$LOG_FILE" 2>&1 || {
        log_error "Git push failed"
        return 1
    }
    
    log "Changes committed and pushed"
}

# Application management
generate_js_files() {
    local script="$PROJECT_DIR/scripts/generate-js-from-json.cjs"
    
    if [ ! -f "$script" ]; then
        log_error "Generator script not found at $script"
        return 1
    fi
    
    log "Generating JS files from JSON"
    node "$script" >> "$LOG_FILE" 2>&1 || {
        log_error "JS generation failed"
        return 1
    }
    
    log "JS files generated successfully"
}

install_dependencies() {
    # Install if node_modules missing or package files changed
    if [ ! -d "node_modules" ]; then
        log "node_modules not found - installing dependencies"
        local force_install=true
    elif git diff HEAD~1 --name-only 2>/dev/null | grep -q "package.json\|package-lock.json"; then
        log "Package files changed - updating dependencies"
        local force_install=true
    else
        log "Dependencies up to date"
        return 0
    fi
    
    if [ "${force_install:-false}" = "true" ]; then
        log "Installing dependencies (this may take a few minutes)"
        
        # Clear cache for clean install
        npm cache clean --force >> "$LOG_FILE" 2>&1
        
        # Install with memory limits and optimizations
        NODE_OPTIONS="--max-old-space-size=512" \
        npm install --prefer-offline --no-audit --loglevel=error >> "$LOG_FILE" 2>&1 || {
            log_error "npm install failed - check $LOG_FILE for details"
            return 1
        }
        
        log "Dependencies installed successfully"
    fi
}

build_app() {
    log "Building Next.js application"
    
    # Build with memory limits
    NODE_OPTIONS="--max-old-space-size=1024" \
    npm run build >> "$LOG_FILE" 2>&1 || {
        log_error "Build failed - check $LOG_FILE for details"
        return 1
    }
    
    log "Build completed successfully"
}

restart_app() {
    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        log_error "ecosystem.config.js not found at $ECOSYSTEM_FILE"
        return 1
    fi
    
    log "Restarting application with PM2"
    
    # Stop existing instance gracefully
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        log "Stopping existing PM2 process"
        pm2 delete "$PM2_APP_NAME" >> "$LOG_FILE" 2>&1 || true
    fi
    
    # Load environment variables
    if [ -f "$PROJECT_DIR/.env" ]; then
        # shellcheck source=/dev/null
        source "$PROJECT_DIR/.env"
    fi
    
    # Start application
    pm2 start "$ECOSYSTEM_FILE" --env production >> "$LOG_FILE" 2>&1 || {
        log_error "PM2 start failed"
        return 1
    }
    
    # Wait for application to initialize
    log "Waiting for application to start..."
    sleep 10
    
    # Verify application is running
    if pm2 list | grep -q "$PM2_APP_NAME.*online"; then
        log "Application started successfully"
        pm2 save >> "$LOG_FILE" 2>&1 || log_error "Failed to save PM2 state"
        return 0
    else
        log_error "Application failed to start - check: pm2 logs $PM2_APP_NAME"
        pm2 logs "$PM2_APP_NAME" --lines 50 >> "$LOG_FILE" 2>&1
        return 1
    fi
}

# Health check
verify_prerequisites() {
    log "Verifying prerequisites"
    
    local missing_deps=()
    
    command -v git >/dev/null 2>&1 || missing_deps+=("git")
    command -v node >/dev/null 2>&1 || missing_deps+=("node")
    command -v npm >/dev/null 2>&1 || missing_deps+=("npm")
    command -v pm2 >/dev/null 2>&1 || missing_deps+=("pm2")
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Missing required dependencies: ${missing_deps[*]}"
        return 1
    fi
    
    log "All prerequisites verified"
}

# Main execution
main() {
    log "========================================"
    log "Update Process Started"
    log "========================================"
    
    # Ensure we have exclusive access
    acquire_lock
    
    # Change to project directory
    cd "$PROJECT_DIR" || {
        log_error "Cannot access project directory: $PROJECT_DIR"
        exit 1
    }
    
    # Verify all required tools are available
    verify_prerequisites || exit 1
    
    # Setup git authentication
    load_git_credentials || exit 1
    
    # Commit any local changes before syncing
    commit_and_push "Pre-update: Auto-commit local changes" || exit 1
    
    # Pull latest changes from remote
    sync_with_remote || exit 1
    
    # Generate JS files from JSON data
    generate_js_files || exit 1
    
    # Commit generated files
    commit_and_push "Auto-generate JS files from JSON" || exit 1
    
    # Install/update dependencies if needed
    install_dependencies || exit 1
    
    # Build the application
    build_app || exit 1
    
    # Restart with PM2
    restart_app || exit 1
    
    log "========================================"
    log "Update Process Completed Successfully"
    log "========================================"
}

# Run main function
main "$@"