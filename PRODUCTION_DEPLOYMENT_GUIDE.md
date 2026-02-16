# 🚀 Production Deployment Guide - Flymora Tours

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Server Requirements](#server-requirements)
3. [Environment Setup](#environment-setup)
4. [Database Configuration](#database-configuration)
5. [Deployment Steps](#deployment-steps)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Rollback Procedure](#rollback-procedure)
9. [Troubleshooting](#troubleshooting)

---

## 🔍 Pre-Deployment Checklist

### Development Verification
- [x] All tests passing
- [x] Code reviewed and approved
- [x] Database migrations tested
- [x] Assets compiled successfully
- [x] API endpoints tested
- [x] Performance optimizations applied (Phase 13)
- [x] Security features enabled (RBAC, rate limiting)
- [x] Documentation up to date

### Infrastructure Ready
- [ ] Production server provisioned
- [ ] Domain name configured
- [ ] SSL certificate obtained
- [ ] Database server ready
- [ ] Email service configured (SMTP/SES)
- [ ] Payment gateway credentials (Midtrans production)
- [ ] Backup solution in place
- [ ] Monitoring tools setup

---

## 🖥️ Server Requirements

### Minimum Specifications
```
OS: Ubuntu 20.04 LTS or higher
CPU: 2 cores (4 cores recommended)
RAM: 4GB (8GB recommended)
Storage: 40GB SSD
PHP: 8.2+
Node.js: 18+
Database: MySQL 8.0+ or PostgreSQL 14+
Web Server: Nginx (recommended) or Apache
```

### Required PHP Extensions
```bash
sudo apt install -y php8.2-fpm php8.2-cli php8.2-common \
  php8.2-mysql php8.2-pgsql php8.2-mbstring php8.2-xml \
  php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath \
  php8.2-intl php8.2-redis
```

### Required System Packages
```bash
sudo apt install -y nginx mysql-server redis-server \
  supervisor git curl unzip
```

---

## ⚙️ Environment Setup

### 1. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/yourusername/flymora-tours.git
cd flymora-tours
sudo chown -R www-data:www-data /var/www/flymora-tours
sudo chmod -R 755 /var/www/flymora-tours
```

### 2. Install Dependencies
```bash
# Install Composer dependencies (no dev)
composer install --no-dev --optimize-autoloader

# Install Node dependencies
npm ci --production

# Build frontend assets
npm run build
```

### 3. Environment Configuration

Create `.env` file from template:
```bash
cp .env.example .env
```

Edit `.env` with production values:
```env
# Application
APP_NAME="Flymora Tours and Travels"
APP_ENV=production
APP_KEY=  # Generate with: php artisan key:generate
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Locale
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_TIMEZONE=Asia/Jakarta

# Database (MySQL recommended for production)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=flymora_production
DB_USERNAME=flymora_user
DB_PASSWORD=secure_password_here

# Cache & Session (Redis recommended)
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail Configuration (Use SES, Mailgun, or SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

# Midtrans (Production Credentials)
MIDTRANS_SERVER_KEY=your_production_server_key
MIDTRANS_CLIENT_KEY=your_production_client_key
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true

# WhatsApp (Production)
WHATSAPP_API_URL=https://api.whatsapp.com/send
WHATSAPP_BUSINESS_NUMBER=+62xxxxxxxxxxxxx

# Booking Configuration
BOOKING_EXPIRY_MINUTES=30

# Sanctum
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,www.yourdomain.com

# Logging
LOG_CHANNEL=daily
LOG_LEVEL=warning
LOG_DAYS=14

# Performance
DEBUGBAR_ENABLED=false
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

---

## 🗄️ Database Configuration

### 1. Create Database & User
```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE flymora_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user with strong password
CREATE USER 'flymora_user'@'localhost' IDENTIFIED BY 'secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON flymora_production.* TO 'flymora_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

### 2. Run Migrations
```bash
# Run migrations (production mode)
php artisan migrate --force

# Seed initial data (roles, permissions, categories)
php artisan db:seed --class=RolePermissionSeeder --force
php artisan db:seed --class=CategorySeeder --force
```

### 3. Create Admin User
```bash
php artisan tinker
```
```php
$admin = \App\Models\User::create([
    'name' => 'Super Admin',
    'email' => 'admin@yourdomain.com',
    'password' => bcrypt('secure_admin_password'),
    'is_admin' => true,
]);

// Assign super_admin role
$admin->assignRole('super_admin');
```

---

## 🚀 Deployment Steps

### Step 1: Optimize Application
```bash
# Clear all caches
php artisan optimize:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Create storage link
php artisan storage:link

# Set proper permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Step 2: Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/flymora
```

Add this configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/flymora-tours/public;
    index index.php index.html;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    # Max upload size
    client_max_body_size 20M;
    
    # Logs
    access_log /var/log/nginx/flymora-access.log;
    error_log /var/log/nginx/flymora-error.log;
    
    # Root location
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }
    
    # Deny access to sensitive files
    location ~ /\.(?!well-known).* {
        deny all;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/flymora /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 3: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 4: Queue Workers (Supervisor)

Create supervisor configuration:
```bash
sudo nano /etc/supervisor/conf.d/flymora-worker.conf
```

Add:
```ini
[program:flymora-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/flymora-tours/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/flymora-tours/storage/logs/worker.log
stopwaitsecs=3600
```

Start workers:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start flymora-worker:*
```

### Step 5: Scheduler (Cron)

Add Laravel scheduler to crontab:
```bash
sudo crontab -e -u www-data
```

Add this line:
```cron
* * * * * cd /var/www/flymora-tours && php artisan schedule:run >> /dev/null 2>&1
```

---

## ✅ Post-Deployment

### 1. Verification Checklist

```bash
# Test health endpoint
curl https://yourdomain.com/api/health

# Expected response:
# {"status":"ok","timestamp":"...","checks":{"database":"ok","cache":"ok","storage":"ok"}}

# Test ping endpoint
curl https://yourdomain.com/api/ping

# Test frontend
curl -I https://yourdomain.com

# Check queue workers
sudo supervisorctl status

# Check scheduler
php artisan schedule:list
```

### 2. Warm Up Cache
```bash
# Warm up API caches
curl https://yourdomain.com/api/tours
curl https://yourdomain.com/api/categories

# Or use artisan command
php artisan cache:clear
php artisan config:cache
```

### 3. Test Critical Flows

**Manual Testing:**
- [ ] Homepage loads correctly
- [ ] Tour listing displays with images
- [ ] Tour detail page works
- [ ] Registration/Login works
- [ ] Booking flow completes
- [ ] Payment gateway integration works
- [ ] Email notifications sent
- [ ] WhatsApp integration works
- [ ] Admin panel accessible
- [ ] RBAC permissions working

### 4. Performance Testing
```bash
# Install Apache Bench (if not installed)
sudo apt install apache2-utils

# Test API performance
ab -n 1000 -c 10 https://yourdomain.com/api/tours

# Should see:
# - Requests per second: >100
# - 95th percentile: <200ms
```

---

## 📊 Monitoring & Maintenance

### 1. Application Monitoring

**Health Checks:**
```bash
# Add to monitoring service (Pingdom, UptimeRobot, etc)
https://yourdomain.com/api/health
```

**Log Monitoring:**
```bash
# Watch Laravel logs
tail -f storage/logs/laravel.log

# Watch Nginx access logs
tail -f /var/log/nginx/flymora-access.log

# Watch Nginx error logs
tail -f /var/log/nginx/flymora-error.log
```

### 2. Database Backups

Create backup script:
```bash
sudo nano /usr/local/bin/backup-flymora.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/flymora"
mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u flymora_user -p'secure_password' flymora_production | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Storage backup
tar -czf $BACKUP_DIR/storage_$DATE.tar.gz /var/www/flymora-tours/storage/app/public

# Remove backups older than 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make executable and add to cron:
```bash
sudo chmod +x /usr/local/bin/backup-flymora.sh
sudo crontab -e
```

Add daily backup at 2 AM:
```cron
0 2 * * * /usr/local/bin/backup-flymora.sh >> /var/log/flymora-backup.log 2>&1
```

### 3. Maintenance Mode

When deploying updates:
```bash
# Enable maintenance mode
php artisan down --secret="bypass-token-here"

# Deploy updates
git pull origin main
composer install --no-dev --optimize-autoloader
npm ci --production && npm run build
php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache

# Disable maintenance mode
php artisan up
```

---

## 🔄 Rollback Procedure

### Quick Rollback Steps

1. **Identify last working version:**
```bash
git log --oneline -10
```

2. **Rollback code:**
```bash
php artisan down
git reset --hard <commit-hash>
composer install --no-dev --optimize-autoloader
php artisan up
```

3. **Rollback database (if needed):**
```bash
php artisan migrate:rollback --step=1
```

4. **Clear caches:**
```bash
php artisan optimize:clear
php artisan config:cache
```

---

## 🔧 Troubleshooting

### Issue: 500 Internal Server Error
```bash
# Check Laravel logs
tail -100 storage/logs/laravel.log

# Check PHP-FPM logs
sudo tail -100 /var/log/php8.2-fpm.log

# Check Nginx error log
sudo tail -100 /var/log/nginx/flymora-error.log

# Check permissions
ls -la storage bootstrap/cache
```

### Issue: Queue not processing
```bash
# Check supervisor status
sudo supervisorctl status

# Restart workers
sudo supervisorctl restart flymora-worker:*

# Check worker logs
tail -100 storage/logs/worker.log
```

### Issue: Cache not working
```bash
# Check Redis status
redis-cli ping  # Should return: PONG

# Clear and rebuild cache
php artisan cache:clear
php artisan config:cache
php artisan route:cache
```

### Issue: Assets not loading
```bash
# Rebuild assets
npm run build

# Check storage link
ls -la public/storage

# Recreate if needed
php artisan storage:link
```

### Issue: Database connection failed
```bash
# Test connection
mysql -u flymora_user -p flymora_production

# Check credentials in .env
cat .env | grep DB_

# Test from Laravel
php artisan tinker
>>> DB::connection()->getPdo();
```

---

## 📈 Performance Optimization Checklist

- [x] OPcache enabled (PHP)
- [x] Redis cache configured
- [x] Gzip compression enabled (Nginx)
- [x] Static asset caching (1 year)
- [x] Database indexes applied (Phase 13)
- [x] Query optimization done (Phase 13)
- [x] API caching enabled (Phase 13)
- [x] Rate limiting active (Phase 13)
- [x] Image optimization (Spatie conversions)
- [ ] CDN integration (optional)
- [ ] HTTP/2 enabled (automatic with Nginx)

---

## 🔐 Security Checklist

- [x] APP_DEBUG=false in production
- [x] Strong database passwords
- [x] SSL certificate installed
- [x] Security headers configured
- [x] CSRF protection enabled
- [x] Rate limiting active
- [x] File upload validation
- [x] SQL injection protection (Eloquent)
- [x] XSS protection
- [x] RBAC permissions configured
- [ ] Firewall configured (UFW)
- [ ] SSH key-only authentication
- [ ] Fail2ban installed

---

## 📞 Support & Contacts

**Emergency Contacts:**
- System Admin: [your-email]
- Database Admin: [db-admin-email]
- DevOps: [devops-email]

**Service Providers:**
- Hosting: [hosting-provider]
- Domain: [domain-registrar]
- SSL: Let's Encrypt
- Payment: Midtrans
- Email: [email-provider]

---

## 📝 Deployment Logs

**Deployment History:**
```
Date: [YYYY-MM-DD]
Version: [git-hash]
Deployed by: [name]
Changes: [description]
Status: [Success/Failed]
Rollback: [Yes/No]
```

---

## ✅ Final Checklist

**Before Going Live:**
- [ ] All tests passed
- [ ] Migrations successful
- [ ] SSL certificate valid
- [ ] Domain pointing correctly
- [ ] Email sending works
- [ ] Payment gateway tested
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Documentation updated
- [ ] Team trained
- [ ] Support plan ready

**After Going Live:**
- [ ] Health check passing
- [ ] Performance metrics acceptable
- [ ] Error tracking active
- [ ] User feedback collected
- [ ] Team notified
- [ ] Celebrate! 🎉

---

**Deployment Guide Version**: 1.0  
**Last Updated**: February 14, 2026  
**Next Review**: Monthly

🚀 **Ready for Production!**
