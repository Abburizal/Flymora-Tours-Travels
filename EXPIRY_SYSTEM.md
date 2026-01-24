# ⏰ BOOKING EXPIRY SYSTEM

**Status**: ✅ **FULLY IMPLEMENTED & TESTED**

---

## 🎯 OVERVIEW

Bookings automatically expire after **30 minutes** if payment is not completed. This prevents:
- ❌ Seats locked indefinitely
- ❌ Revenue loss from unpaid bookings
- ✅ Automatic seat recovery

---

## 🔄 FLOW

```
User Creates Booking
        ↓
status: pending
expired_at: now() + 30 minutes
        ↓
User Has 30 Minutes to Pay
        ↓
Two Scenarios:
├─ Payment Successful
│  └─ status → paid ✅
│
└─ No Payment + Time Expired
   ├─ Auto-expire via scheduler (bookings:expire command)
   ├─ status → cancelled
   └─ Seat available again ✅
```

---

## 📊 DATABASE CHANGES

### Migration Applied
```
File: database/migrations/2026_01_12_194035_add_expired_at_to_bookings_table.php

Added column:
- expired_at: TIMESTAMP (nullable)
```

### Booking Model Updated
```php
protected $fillable = [..., 'expired_at'];

protected $casts = [
    'expired_at' => 'datetime',
    ...
];
```

---

## 🔧 IMPLEMENTATION DETAILS

### 1️⃣ Booking Creation (BookingController)
```php
$expiryMinutes = 30;
$expiredAt = now()->addMinutes($expiryMinutes);

$booking = Booking::create([
    ...
    'expired_at' => $expiredAt,
]);

return response()->json([
    'data' => $booking,
    'expired_at' => $expiredAt,
    'remaining_seconds' => 1800,
    ...
]);
```

### 2️⃣ Payment Protection (PaymentController)
```php
// Check if booking is expired BEFORE generating payment token
if ($booking->expired_at && now()->greaterThan($booking->expired_at)) {
    $booking->update(['status' => 'cancelled']);
    return response()->json([
        'message' => 'Booking expired'
    ], 410);  // HTTP 410 Gone
}
```

### 3️⃣ Auto-Expire Command (ExpireBookings)
```php
// Command: bookings:expire
Booking::where('status', 'pending')
    ->whereNotNull('expired_at')
    ->where('expired_at', '<', now())
    ->update(['status' => 'cancelled']);
```

### 4️⃣ Scheduler Configuration (bootstrap/app.php)
```php
->withSchedule(function (Schedule $schedule): void {
    $schedule->command('bookings:expire')->everyMinute();
})
```

---

## 📋 API ENDPOINTS

### Create Booking (with Expiry Info)
```bash
POST /api/bookings
Response: {
  "success": true,
  "data": {
    "id": 12,
    "status": "pending",
    "expired_at": "2026-01-12T20:29:59Z",
    ...
  },
  "remaining_seconds": 1800,
  "message": "Booking created. Payment required within 30 minutes."
}
```

### Generate Payment Token
```bash
POST /api/payments/{booking_id}

Error if Expired:
HTTP 410 Gone
{
  "success": false,
  "message": "Booking expired. Please create a new booking."
}
```

---

## ⚙️ SCHEDULER SETUP

### Local Development (Testing)
```bash
# Manually run the command
php artisan bookings:expire
```

### Production (Cron Job)
```bash
# Add to crontab:
* * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1

# This runs every minute and processes expired bookings
```

---

## 🧪 TEST SCENARIOS

### Scenario 1: Booking Within Expiry Time ✅
```bash
# 1. Create booking (expires in 30 min)
POST /api/bookings → booking created

# 2. Pay within 30 minutes
POST /api/payments/{booking_id} → snap_token generated ✅

# 3. Complete payment
POST /api/midtrans/callback → status → paid ✅
```

### Scenario 2: Booking After Expiry ❌
```bash
# 1. Create booking (expires in 30 min)
POST /api/bookings → booking created

# 2. Wait > 30 minutes (or trigger scheduler)
php artisan bookings:expire → status → cancelled

# 3. Try to pay
POST /api/payments/{booking_id} → HTTP 410 Gone ❌

# User must create new booking
```

### Scenario 3: Auto-Expiry via Scheduler ✅
```bash
# Bookings pending for > 30 minutes
# At each minute (scheduler runs):
php artisan bookings:expire

# Updates all expired bookings:
UPDATE bookings 
SET status = 'cancelled' 
WHERE status = 'pending' 
AND expired_at < now()
```

---

## 📊 STATUS SUMMARY

### Booking States
| State | Meaning | Expiry |
|-------|---------|--------|
| `pending` | Waiting for payment | Yes (30 min) |
| `paid` | Payment successful | No |
| `cancelled` | Expired or rejected | No |

---

## 🔐 SECURITY NOTES

✅ **Expiry Check Before Payment**
- Prevents payment generation for expired bookings
- Returns HTTP 410 Gone (resource no longer valid)

✅ **Auto-Cancellation**
- Scheduler runs every minute
- Updates database state automatically
- No manual intervention needed

✅ **Timestamp Validation**
- Uses server time (not client time)
- Prevents frontend manipulation

---

## 📱 FRONTEND INTEGRATION

### Show Countdown Timer
```javascript
const booking = await fetch(`/api/bookings/${bookingId}`).then(r => r.json());
const expiresAt = new Date(booking.data.expired_at);
const now = new Date();
const secondsLeft = Math.floor((expiresAt - now) / 1000);

// Display countdown (30:00, 29:59, ...)
setInterval(() => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  console.log(`Time left: ${minutes}:${seconds}`);
}, 1000);
```

### Handle Expired Booking
```javascript
const response = await fetch(`/api/payments/${bookingId}`, { method: 'POST' });
if (response.status === 410) {
  alert('Booking expired! Please create a new booking.');
  window.location.href = '/bookings/new';
}
```

---

## 🛠️ CONFIGURATION

### Adjust Expiry Time
Edit: `app/Http/Controllers/Api/BookingController.php`
```php
$expiryMinutes = 30;  // Change this value
// Recommended: 15–60 minutes
```

### Change Scheduler Frequency
Edit: `bootstrap/app.php`
```php
->withSchedule(function (Schedule $schedule): void {
    $schedule->command('bookings:expire')->everyMinute();
    // Options: everyMinute(), everyFiveMinutes(), every(5)->minutes(), etc.
})
```

---

## 📊 DATABASE QUERIES

### Check Expired Bookings
```sql
SELECT id, status, expired_at 
FROM bookings 
WHERE status = 'pending' 
AND expired_at < NOW();
```

### Count Expired Today
```sql
SELECT COUNT(*) as expired_count
FROM bookings 
WHERE status = 'cancelled' 
AND expired_at > DATE('now')
AND expired_at < NOW();
```

---

## ✅ TEST RESULTS

```
🧪 CLEAN EXPIRY TEST
====================

1️⃣ Creating fresh booking
✅ Created booking with expired_at
✅ Remaining time: 1800 seconds (30 minutes)

2️⃣ Payment generation (not expired)
✅ Snap token generated successfully

3️⃣ Simulating expiry
✅ Marked booking as expired (time in past)

4️⃣ Payment on expired booking
✅ Got HTTP 410 Gone
✅ Correct error message

5️⃣ Auto-expire via scheduler
✅ bookings:expire command executed
✅ Status changed to cancelled

6️⃣ Final verification
✅ Booking status: cancelled
```

**Status**: 🟢 **ALL TESTS PASSED**

---

## 📞 OPERATIONS

### Monitor Expired Bookings
```bash
# Check pending bookings
php artisan tinker
> Booking::where('status', 'pending')->count()

# Force expire bookings
php artisan bookings:expire
```

### Manual Expiry (if needed)
```bash
php artisan tinker
> Booking::where('status', 'pending')
>   ->where('expired_at', '<', now())
>   ->update(['status' => 'cancelled'])
```

---

## 🎯 BEST PRACTICES

✅ **DO**
- Set reasonable expiry time (15-60 minutes)
- Monitor scheduler logs
- Alert users before expiry
- Allow rebooking after expiry

❌ **DON'T**
- Set expiry too short (< 10 minutes)
- Manually delete expired bookings (let scheduler handle it)
- Trust client-side expiry timers
- Allow payment after expiry

---

## 📚 FILES MODIFIED

1. `database/migrations/2026_01_12_194035_add_expired_at_to_bookings_table.php`
   - Added `expired_at` column

2. `app/Models/Booking.php`
   - Added `expired_at` to fillable
   - Added datetime cast

3. `app/Http/Controllers/Api/BookingController.php`
   - Set expiry time on booking creation
   - Return expiry info in response

4. `app/Http/Controllers/Api/PaymentController.php`
   - Check expiry before generating payment token
   - Return HTTP 410 if expired

5. `app/Console/Commands/ExpireBookings.php`
   - Auto-cancel expired bookings (new file)

6. `bootstrap/app.php`
   - Register scheduler for expiry command

---

**Status**: ✅ **PRODUCTION READY**  
**Last Updated**: 2026-01-12  
**Test Score**: 100% ✅

