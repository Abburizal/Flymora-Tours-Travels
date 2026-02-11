# Admin User Generator Command

## 🚀 Overview
Artisan command untuk membuat admin user dengan cepat dan aman untuk development/production.

---

## 📦 Command

```bash
php artisan make:admin
```

---

## ✨ Features

- ✅ **Interactive Mode** - Prompt input untuk Name, Email, Password
- ✅ **Non-Interactive Mode** - Gunakan options untuk automation
- ✅ **Validation** - Email unique, password min 12 characters
- ✅ **Confirmation Table** - Preview sebelum create
- ✅ **Success Summary** - Tampilkan info admin yang dibuat
- ✅ **Auto-Configuration** - Set is_admin, role, is_active, email_verified otomatis

---

## 🎯 Usage

### **Mode 1: Interactive (Recommended)**
```bash
php artisan make:admin
```

Output:
```
🚀 Flymora Admin User Generator

 Admin Name:
 > John Doe

 Admin Email:
 > john@flymora.com

 Admin Password (min 12 characters):
 > 

+--------------+-------------------+
| Field        | Value             |
+--------------+-------------------+
| Name         | John Doe          |
| Email        | john@flymora.com  |
| Password     | •••••••••••••     |
| Role         | Administrator     |
| Admin Access | ✅ Yes            |
+--------------+-------------------+

 Create this admin user? (yes/no) [yes]:
 > yes

✅ Admin user created successfully!

+--------------------+-------------------+
| Field              | Value             |
+--------------------+-------------------+
| ID                 | 5                 |
| Name               | John Doe          |
| Email              | john@flymora.com  |
| Role               | admin             |
| Admin Panel Access | ✅ Enabled        |
+--------------------+-------------------+

🔐 Login URL: http://localhost/admin
📧 Email: john@flymora.com
```

---

### **Mode 2: Non-Interactive (CI/CD)**
```bash
php artisan make:admin \
  --name="Admin User" \
  --email="admin@flymora.com" \
  --password="SecurePassword123!"
```

Perfect untuk:
- 🔧 Deployment scripts
- 🤖 CI/CD pipelines
- 📝 Seeding production database
- ⚡ Quick admin creation

---

## 📋 Options

| Option | Description | Required | Example |
|--------|-------------|----------|---------|
| `--name` | Full name of admin | No | `--name="John Doe"` |
| `--email` | Email address | No | `--email="admin@example.com"` |
| `--password` | Password (min 12 chars) | No | `--password="SecurePass123"` |

**Note:** Jika option tidak diberikan, command akan prompt secara interactive.

---

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Required, string, max 255 characters |
| **Email** | Required, valid email format, unique in users table |
| **Password** | Required, string, minimum 12 characters |

**Contoh Error:**
```bash
❌ Validation failed:
   • The email has already been taken.
   • The password must be at least 12 characters.
```

---

## 🔐 Admin User Configuration

User yang dibuat akan memiliki setting:

```php
[
    'name' => 'Input dari user',
    'email' => 'Input dari user',
    'password' => Hash::make('Input dari user'),
    'is_admin' => true,              // ✅ Full admin access
    'role' => 'admin',               // ✅ Administrator role
    'is_active' => true,             // ✅ Active account
    'email_verified_at' => now(),   // ✅ Pre-verified email
]
```

---

## 🛠️ Use Cases

### **1. Development Setup**
```bash
# Buat admin pertama untuk development
php artisan make:admin \
  --name="Dev Admin" \
  --email="dev@localhost" \
  --password="password1234"
```

### **2. Production Deployment**
```bash
# Script deployment untuk create super admin
php artisan make:admin \
  --name="Super Admin" \
  --email="admin@flymora.com" \
  --password="${ADMIN_PASSWORD}"
```

### **3. Team Onboarding**
```bash
# Buat admin untuk team member baru
php artisan make:admin
# Input interactively
```

---

## 📊 Example Output

### Success Case:
```
✅ Admin user created successfully!

+--------------------+---------------------+
| Field              | Value               |
+--------------------+---------------------+
| ID                 | 4                   |
| Name               | Test Admin          |
| Email              | test@flymora.com    |
| Role               | admin               |
| Admin Panel Access | ✅ Enabled          |
+--------------------+---------------------+

🔐 Login URL: http://localhost/admin
📧 Email: test@flymora.com
```

### Error Case (Duplicate Email):
```
❌ Validation failed:
   • The email has already been taken.
```

### Error Case (Weak Password):
```
❌ Validation failed:
   • The password must be at least 12 characters.
```

---

## 🔒 Security Notes

### **✅ Safe Practices:**
- Command hanya untuk internal use (CLI only)
- Password di-hash dengan bcrypt
- Email verification otomatis set
- Validasi input sebelum create

### **⚠️ Important:**
- **JANGAN expose command ini via web route**
- **JANGAN simpan password di version control**
- **GUNAKAN strong password untuk production**
- **Environment variable untuk CI/CD:**
  ```bash
  php artisan make:admin \
    --email="${ADMIN_EMAIL}" \
    --password="${ADMIN_PASSWORD}"
  ```

---

## 🧪 Testing

### Test Command Availability:
```bash
php artisan make:admin --help
```

### Test Interactive Mode:
```bash
php artisan make:admin
```

### Test Non-Interactive Mode:
```bash
php artisan make:admin \
  --name="Test User" \
  --email="test@example.com" \
  --password="TestPassword123"
```

### Verify Created Admin:
```bash
php artisan tinker
>>> User::where('email', 'test@example.com')->first();
```

---

## 🎯 Benefits

| Benefit | Description |
|---------|-------------|
| ⚡ **Speed** | Create admin in 5 seconds vs manual entry |
| 🔒 **Security** | CLI-only, no web exposure, proper validation |
| 🤖 **Automation** | Perfect for CI/CD and deployment scripts |
| ✅ **Consistency** | Always creates admin with correct settings |
| 📊 **Visibility** | Clear table output and confirmation |

---

## 📝 Comparison: Before vs After

### **Before (Manual via Admin Panel):**
1. Login dengan existing admin
2. Navigate to Users
3. Click Create
4. Fill 10+ form fields
5. Toggle multiple switches
6. Save
7. Time: ~2-3 minutes

### **After (With Command):**
```bash
php artisan make:admin
```
Time: **5 seconds!** ⚡

---

## 🚀 Production Deployment Example

**Deploy Script (deploy.sh):**
```bash
#!/bin/bash

# Pull latest code
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader

# Run migrations
php artisan migrate --force

# Create admin if not exists
php artisan make:admin \
  --name="Production Admin" \
  --email="${ADMIN_EMAIL}" \
  --password="${ADMIN_PASSWORD}"

# Clear & cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment complete!"
```

---

## 📚 Related

- **Admin Login**: `/admin` - Login page for admin panel
- **User Management**: `/admin/users` - Manage all users via Filament
- **Role System**: Users table has `role` and `is_admin` fields

---

## 🛠️ Technical Details

**File Location:**
```
app/Console/Commands/MakeAdminCommand.php
```

**Dependencies:**
- `App\Models\User`
- `Illuminate\Support\Facades\Hash`
- `Illuminate\Support\Facades\Validator`

**Database Impact:**
- Inserts 1 row to `users` table
- Sets multiple fields automatically

---

## ✅ Tested & Verified

- [x] Interactive mode works
- [x] Non-interactive mode works
- [x] Email validation works
- [x] Password validation works (min 12 chars)
- [x] Duplicate email detection works
- [x] Admin created with correct permissions
- [x] Login successful after creation

---

**Implementation Date:** February 11, 2026  
**Status:** ✅ Production Ready  
**Command:** `php artisan make:admin`  
**Version:** 1.0.0
