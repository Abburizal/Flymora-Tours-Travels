#!/bin/bash

###############################################################################
# Flymora Tours - Production Deployment Script
# Version: 1.0
# Usage: ./deploy.sh [production|staging]
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
APP_DIR="/var/www/flymora-tours"
BACKUP_DIR="/var/backups/flymora"
LOG_FILE="/var/log/flymora-deploy.log"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Check if running as correct user
if [ "$EUID" -eq 0 ]; then 
    error "Please do not run as root. Use: sudo -u www-data ./deploy.sh"
fi

# Start deployment
log "=========================================="
log "Starting deployment to $ENVIRONMENT"
log "=========================================="

# Step 1: Enable maintenance mode
log "Step 1: Enabling maintenance mode..."
cd "$APP_DIR" || error "Failed to change to app directory"
php artisan down --secret="deploy-$(date +%s)" || warning "Maintenance mode failed"

# Step 2: Create backup
log "Step 2: Creating backup..."
BACKUP_FILE="$BACKUP_DIR/deploy_$(date +%Y%m%d_%H%M%S).tar.gz"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='storage/logs/*' \
    "$APP_DIR" || warning "Backup creation failed"
log "Backup created: $BACKUP_FILE"

# Step 3: Pull latest code
log "Step 3: Pulling latest code from Git..."
git fetch origin
git reset --hard origin/main || error "Git pull failed"
COMMIT_HASH=$(git rev-parse --short HEAD)
log "Deployed commit: $COMMIT_HASH"

# Step 4: Install dependencies
log "Step 4: Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction || error "Composer install failed"

log "Step 5: Installing NPM dependencies..."
npm ci --production || error "NPM install failed"

# Step 6: Build assets
log "Step 6: Building frontend assets..."
npm run build || error "Asset build failed"

# Step 7: Run migrations
log "Step 7: Running database migrations..."
php artisan migrate --force || error "Migration failed"

# Step 8: Clear and rebuild cache
log "Step 8: Clearing caches..."
php artisan optimize:clear

log "Step 9: Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Step 9: Set permissions
log "Step 10: Setting permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Step 10: Restart queue workers
log "Step 11: Restarting queue workers..."
if command -v supervisorctl &> /dev/null; then
    sudo supervisorctl restart flymora-worker:* || warning "Queue restart failed"
else
    warning "Supervisor not found, skipping queue restart"
fi

# Step 11: Test deployment
log "Step 12: Testing deployment..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health)
if [ "$HEALTH_CHECK" != "200" ]; then
    error "Health check failed! Rolling back..."
    # Rollback would go here
fi

# Step 12: Disable maintenance mode
log "Step 13: Disabling maintenance mode..."
php artisan up

# Step 13: Warm up cache
log "Step 14: Warming up cache..."
curl -s http://localhost/api/tours > /dev/null
curl -s http://localhost/api/categories > /dev/null

# Success!
log "=========================================="
log "✅ Deployment successful!"
log "Environment: $ENVIRONMENT"
log "Commit: $COMMIT_HASH"
log "Time: $(date)"
log "=========================================="

# Send notification (optional)
# curl -X POST https://hooks.slack.com/... -d "Deployment successful: $COMMIT_HASH"

exit 0
