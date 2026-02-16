# 🚀 Production Deployment - Quick Checklist

## ⏱️ Estimated Time: 2-3 hours

---

## 📋 PRE-DEPLOYMENT (30 mins)

### Server Preparation
- [ ] VPS/Server provisioned (2 CPU, 4GB RAM minimum)
- [ ] Ubuntu 20.04+ installed
- [ ] Domain purchased and DNS configured
- [ ] SSH access configured with key-based auth

### Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.2
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install -y php8.2-fpm php8.2-cli php8.2-common \
  php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl \
  php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl php8.2-redis

# Install Nginx
sudo apt install -y nginx

# Install MySQL
sudo apt install -y mysql-server

# Install Redis
sudo apt install -y redis-server

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Supervisor (for queue workers)
sudo apt install -y supervisor

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

**Checklist:**
- [ ] PHP 8.2 installed (`php -v`)
- [ ] Nginx running (`sudo systemctl status nginx`)
- [ ] MySQL running (`sudo systemctl status mysql`)
- [ ] Redis running (`sudo systemctl status redis`)
- [ ] Composer installed (`composer --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Supervisor installed (`supervisorctl --version`)

---

## 🗄️ DATABASE SETUP (15 mins)

### Create Database & User
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE flymora_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'flymora_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON flymora_production.* TO 'flymora_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Checklist:**
- [ ] Database created
- [ ] User created with strong password (min 20 chars)
- [ ] Privileges granted
- [ ] Connection tested

---

## 📂 APPLICATION DEPLOYMENT (45 mins)

### 1. Clone Repository
```bash
cd /var/www
sudo git clone YOUR_REPOSITORY_URL flymora-tours
cd flymora-tours
```

### 2. Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/flymora-tours
sudo chmod -R 755 /var/www/flymora-tours
sudo chmod -R 775 storage bootstrap/cache
```

### 3. Configure Environment
```bash
cp .env.production.example .env
nano .env
```

**Update these critical values:**
```env
APP_URL=https://yourdomain.com
DB_DATABASE=flymora_production
DB_USERNAME=flymora_user
DB_PASSWORD=YOUR_DATABASE_PASSWORD
MIDTRANS_SERVER_KEY=YOUR_PRODUCTION_SERVER_KEY
MIDTRANS_CLIENT_KEY=YOUR_PRODUCTION_CLIENT_KEY
MAIL_HOST=your-smtp-host
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-email-password
```

### 4. Install Dependencies
```bash
# As www-data user
sudo -u www-data composer install --no-dev --optimize-autoloader
sudo -u www-data npm ci --production
sudo -u www-data npm run build
```

### 5. Generate Application Key
```bash
sudo -u www-data php artisan key:generate
```

### 6. Run Migrations & Seeders
```bash
sudo -u www-data php artisan migrate --force
sudo -u www-data php artisan db:seed --class=RolePermissionSeeder --force
sudo -u www-data php artisan db:seed --class=CategorySeeder --force
```

### 7. Create Storage Link
```bash
sudo -u www-data php artisan storage:link
```

### 8. Optimize Application
```bash
sudo -u www-data php artisan config:cache
sudo -u www-data php artisan route:cache
sudo -u www-data php artisan view:cache
sudo -u www-data php artisan event:cache
```

**Checklist:**
- [ ] .env configured with production values
- [ ] APP_KEY generated
- [ ] Dependencies installed
- [ ] Assets built successfully
- [ ] Migrations completed
- [ ] Seeders completed
- [ ] Storage linked
- [ ] Application optimized

---

## 🌐 NGINX CONFIGURATION (20 mins)

### 1. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/flymora
```

**Paste this configuration** (see PRODUCTION_DEPLOYMENT_GUIDE.md for full config)

### 2. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/flymora /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Checklist:**
- [ ] Nginx config created
- [ ] Syntax test passed (`nginx -t`)
- [ ] Site enabled
- [ ] Nginx restarted

---

## 🔒 SSL CERTIFICATE (10 mins)

### Obtain Let's Encrypt Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts:
- Enter email
- Agree to terms
- Choose redirect (option 2)

**Test auto-renewal:**
```bash
sudo certbot renew --dry-run
```

**Checklist:**
- [ ] SSL certificate obtained
- [ ] HTTPS redirect configured
- [ ] Auto-renewal tested
- [ ] Site accessible via https://

---

## 👷 QUEUE WORKERS SETUP (15 mins)

### 1. Create Supervisor Config
```bash
sudo nano /etc/supervisor/conf.d/flymora-worker.conf
```

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

### 2. Start Workers
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start flymora-worker:*
sudo supervisorctl status
```

**Checklist:**
- [ ] Supervisor config created
- [ ] Workers started
- [ ] Status shows RUNNING

---

## ⏰ SCHEDULER SETUP (5 mins)

### Add Cron Job
```bash
sudo crontab -e -u www-data
```

Add this line:
```cron
* * * * * cd /var/www/flymora-tours && php artisan schedule:run >> /dev/null 2>&1
```

**Checklist:**
- [ ] Cron job added
- [ ] Runs every minute

---

## 👤 CREATE ADMIN USER (5 mins)

```bash
sudo -u www-data php artisan tinker
```

```php
$admin = \App\Models\User::create([
    'name' => 'Super Admin',
    'email' => 'admin@yourdomain.com',
    'password' => bcrypt('YOUR_SECURE_ADMIN_PASSWORD'),
    'is_admin' => true,
]);
$admin->assignRole('super_admin');
exit
```

**Checklist:**
- [ ] Admin user created
- [ ] Super admin role assigned
- [ ] Can login to /admin

---

## ✅ VERIFICATION (20 mins)

### 1. Health Checks
```bash
# API Health
curl https://yourdomain.com/api/health

# Expected: {"status":"ok","checks":{"database":"ok","cache":"ok","storage":"ok"}}

# Frontend
curl -I https://yourdomain.com

# Expected: HTTP/2 200
```

### 2. Manual Testing
- [ ] Homepage loads (https://yourdomain.com)
- [ ] Tour listing works
- [ ] Tour detail page works
- [ ] Registration works
- [ ] Login works
- [ ] Admin panel accessible (/admin)
- [ ] Can create booking
- [ ] Email notifications work
- [ ] Payment gateway sandbox works

### 3. Performance Check
```bash
# Response time test
curl -w "@-" -o /dev/null -s https://yourdomain.com/api/tours << 'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
   time_pretransfer:  %{time_pretransfer}\n
      time_redirect:  %{time_redirect}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
EOF
```

**Target:** time_total < 0.200s (200ms)

### 4. Security Check
- [ ] APP_DEBUG=false verified
- [ ] HTTPS working
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] Admin panel requires auth

**Checklist:**
- [ ] All health checks passing
- [ ] Manual testing complete
- [ ] Performance acceptable
- [ ] Security verified

---

## 📊 MONITORING SETUP (15 mins)

### 1. Setup UptimeRobot/Pingdom
- URL: https://yourdomain.com/api/health
- Interval: 5 minutes
- Alert: Email/SMS

### 2. Log Rotation
```bash
sudo nano /etc/logrotate.d/flymora
```

```
/var/www/flymora-tours/storage/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0664 www-data www-data
}
```

### 3. Database Backup
```bash
sudo nano /usr/local/bin/backup-flymora.sh
```

(See PRODUCTION_DEPLOYMENT_GUIDE.md for backup script)

```bash
sudo chmod +x /usr/local/bin/backup-flymora.sh
sudo crontab -e
```

Add daily backup at 2 AM:
```cron
0 2 * * * /usr/local/bin/backup-flymora.sh >> /var/log/flymora-backup.log 2>&1
```

**Checklist:**
- [ ] Uptime monitoring configured
- [ ] Log rotation configured
- [ ] Daily backups scheduled
- [ ] Alert emails configured

---

## 🎉 GO LIVE CHECKLIST

### Final Verification
- [ ] DNS propagated (check with: `nslookup yourdomain.com`)
- [ ] SSL certificate valid (check with: `curl -I https://yourdomain.com`)
- [ ] All services running
- [ ] Admin can login
- [ ] Test booking works end-to-end
- [ ] Midtrans production keys active
- [ ] Email sending works
- [ ] WhatsApp integration works
- [ ] Backups tested and working
- [ ] Team notified of go-live
- [ ] Support plan in place

### Post-Launch (First 24 Hours)
- [ ] Monitor error logs: `tail -f storage/logs/laravel.log`
- [ ] Check queue workers: `sudo supervisorctl status`
- [ ] Monitor server resources: `htop`
- [ ] Watch uptime monitor
- [ ] Test all critical flows
- [ ] Check analytics (Google Analytics)
- [ ] Respond to user feedback

---

## 📞 EMERGENCY CONTACTS

**In case of issues:**
- System Admin: [your-email]
- Hosting Support: [hosting-support]
- Payment Gateway: [midtrans-support]

**Quick Commands:**
```bash
# Enable maintenance mode
php artisan down --secret="emergency-bypass"

# Check logs
tail -100 storage/logs/laravel.log

# Restart services
sudo systemctl restart nginx php8.2-fpm
sudo supervisorctl restart flymora-worker:*

# Clear cache
php artisan optimize:clear
```

---

## 🎯 SUCCESS CRITERIA

✅ **Site is live and accessible**
✅ **SSL certificate active and valid**
✅ **All health checks passing**
✅ **Performance < 200ms response time**
✅ **Security headers configured**
✅ **Monitoring active**
✅ **Backups scheduled**
✅ **Queue workers running**
✅ **Admin panel accessible**
✅ **Payment gateway working**

---

## 📚 DOCUMENTATION REFERENCE

- **Full Guide**: `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Phase 13 Performance**: `PHASE13_COMPLETION.md`
- **RBAC Setup**: `RBAC_IMPLEMENTATION.md`
- **Export/Import**: `EXPORT_IMPORT_FEATURES.md`
- **Feature Audit**: `FEATURE_AUDIT_2026_COMPLETE.md`

---

**Deployment Date**: __________________
**Deployed By**: __________________
**Production URL**: __________________
**Status**: __________________

🚀 **READY FOR PRODUCTION!**
