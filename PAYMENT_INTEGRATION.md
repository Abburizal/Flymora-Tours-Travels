# 🎯 TRIPIN TRAVEL - PAYMENT INTEGRATION GUIDE

## 📌 OVERVIEW

Payment integration menggunakan **Midtrans** dengan konsep **callback webhook** sebagai sumber kebenaran pembayaran.

### Status Booking State Machine
```
pending   → menunggu pembayaran
  ↓
paid      → pembayaran sukses (via Midtrans callback)
  ↓
cancelled → dibatalkan/expired
```

---

## 🔧 SETUP YANG SUDAH SELESAI

### 1️⃣ Environment Configuration
File: `.env`
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-4v8hfNhGR-OflKfqy_4nKlJg
MIDTRANS_CLIENT_KEY=SB-Mid-client-rJ_LPGc6JFJGvW3P
MIDTRANS_IS_PRODUCTION=false
```

### 2️⃣ Service Configuration
File: `config/services.php`
```php
'midtrans' => [
    'server_key' => env('MIDTRANS_SERVER_KEY'),
    'client_key' => env('MIDTRANS_CLIENT_KEY'),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
],
```

### 3️⃣ Database Tables
- `payments` - menyimpan data pembayaran dari Midtrans
- `bookings` - dengan status: `pending`, `paid`, `cancelled`

### 4️⃣ Models
- **Payment.php** - relationship ke Booking
- **Booking.php** - relationship ke Payment

### 5️⃣ Controllers
- **PaymentController** - generate snap token
- **MidtransCallbackController** - handle callback dari Midtrans

### 6️⃣ Routes
```php
// Generate payment token
POST /api/payments/{booking_id}

// Midtrans webhook (NO AUTH)
POST /api/midtrans/callback
```

---

## 🔄 PAYMENT FLOW (END-TO-END)

### Step 1: User Creates Booking
```bash
POST /api/bookings
Body: {
  "user_id": 1,
  "tour_id": 1,
  "booking_date": "2026-01-15",
  "number_of_participants": 2
}
Response: booking dengan status "pending"
```

### Step 2: Generate Snap Token (Backend)
```bash
POST /api/payments/{booking_id}
Response: {
  "snap_token": "xxx",
  "order_id": "BOOKING-1-1234567890"
}
```

### Step 3: Show Payment Gateway (Frontend)
```javascript
snap.pay(snap_token, {
  onSuccess: () => { /* redirect */ },
  onPending: () => { /* wait */ },
  onError: () => { /* show error */ }
});
```

### Step 4: User Bayar di Midtrans
- User input kartu kredit/metode pembayaran lain
- Midtrans memproses pembayaran

### Step 5: Midtrans Kirim Callback
Midtrans akan **POST** ke:
```
POST /api/midtrans/callback
Body: {
  "transaction_status": "settlement" | "pending" | "deny" | "expire" | "cancel",
  "order_id": "BOOKING-1-1234567890",
  "transaction_id": "xxx",
  "payment_type": "credit_card",
  "fraud_status": "accept" | "deny"
}
```

### Step 6: Backend Update Status
Controller `MidtransCallbackController` akan:
1. Extract booking_id dari order_id
2. Validasi booking & payment exist
3. Update status berdasarkan transaction_status
4. Simpan payload lengkap

---

## 🧪 API ENDPOINTS

### 1. Get Tours
```bash
GET /api/tours
Response: [
  {
    "id": 1,
    "name": "Bali Adventure Tour",
    "price": "899.99",
    "duration": 5,
    ...
  }
]
```

### 2. Create Booking
```bash
POST /api/bookings
Body: {
  "user_id": 1,
  "tour_id": 1,
  "booking_date": "2026-01-15",
  "number_of_participants": 2
}
Response: {
  "id": 1,
  "status": "pending",
  "total_price": 1799.98
}
```

### 3. Get Bookings
```bash
GET /api/bookings
Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "status": "pending",
      "user_id": 1,
      "tour_id": 1,
      "tour": { ... }
    }
  ]
}
```

### 4. Generate Payment Token
```bash
POST /api/payments/{booking_id}
Response: {
  "success": true,
  "snap_token": "xxx",
  "booking_id": 1,
  "order_id": "BOOKING-1-1768245571",
  "gross_amount": 1799
}
```

### 5. Midtrans Callback (Webhook)
```bash
POST /api/midtrans/callback
Body: {
  "transaction_status": "settlement",
  "transaction_id": "1234567890",
  "order_id": "BOOKING-1-1768245571",
  "payment_type": "credit_card",
  "fraud_status": "accept"
}
Response: {
  "message": "Callback processed successfully"
}
```

---

## 🔐 SECURITY CHECKLIST

✅ **Frontend TIDAK bisa update booking status**
  - Hanya backend yang bisa via callback

✅ **Callback endpoint NO AUTH**
  - Route: `->withoutMiddleware('api')`
  - Reason: Midtrans tidak bisa send auth token

✅ **Status immutable setelah PAID**
  - Prevent downgrade dari paid ke pending
  - Implemented: `if ($booking->status === 'paid') return 200`

✅ **Simpan payload lengkap**
  - Untuk audit trail & debugging
  - Column: `payments.payload` (JSON)

✅ **Validasi order_id format**
  - Extract booking_id dari BOOKING-{id}-{timestamp}
  - Prevent injection attacks

---

## 🧪 TESTING SCENARIOS

### Scenario 1: Settlement (SUCCESS)
```bash
POST /api/midtrans/callback
{
  "transaction_status": "settlement",
  "fraud_status": "accept"
}
Result: Booking status → "paid"
```

### Scenario 2: Pending
```bash
POST /api/midtrans/callback
{
  "transaction_status": "pending"
}
Result: Booking status → "pending"
```

### Scenario 3: Denied
```bash
POST /api/midtrans/callback
{
  "transaction_status": "deny"
}
Result: Booking status → "cancelled"
```

### Scenario 4: Expired
```bash
POST /api/midtrans/callback
{
  "transaction_status": "expire"
}
Result: Booking status → "cancelled"
```

---

## 📝 MIDTRANS DASHBOARD SETUP

1. Login ke https://dashboard.sandbox.midtrans.com
2. Settings → Configuration
3. Payment Notification URL:
   ```
   https://yourdomain.com/api/midtrans/callback
   ```

Untuk **Local Testing**:
```bash
# 1. Start server
php artisan serve

# 2. Expose dengan ngrok
ngrok http 8000

# 3. Gunakan URL ngrok ke Midtrans
# https://xxxxx.ngrok.io/api/midtrans/callback
```

---

## 📊 STATUS MAPPING

| Midtrans Status | Booking Status | Meaning |
|---|---|---|
| `capture` | `paid` | Pembayaran berhasil (kartu kredit) |
| `settlement` | `paid` | Dana sudah diterima (transfer bank) |
| `pending` | `pending` | Menunggu pembayaran |
| `deny` | `cancelled` | Pembayaran ditolak |
| `expire` | `cancelled` | Waktu pembayaran habis |
| `cancel` | `cancelled` | User batalkan pembayaran |

---

## 🚀 NEXT STEPS

### For Frontend (React/Vue)
```javascript
// 1. Get snap token
const response = await fetch(`/api/payments/${bookingId}`, {
  method: 'POST'
});
const { snap_token } = await response.json();

// 2. Show Midtrans Snap
window.snap.pay(snap_token, {
  onSuccess: () => alert('Pembayaran berhasil!'),
  onError: () => alert('Pembayaran gagal')
});
```

### For Production
1. Update `.env`:
   ```env
   MIDTRANS_IS_PRODUCTION=true
   MIDTRANS_SERVER_KEY=your-production-key
   MIDTRANS_CLIENT_KEY=your-production-client-key
   ```

2. Update callback URL di Midtrans Dashboard ke domain production

3. Test dengan pembayaran asli

---

## 📞 SUPPORT

- Midtrans Docs: https://docs.midtrans.com
- Snap Integration: https://docs.midtrans.com/en/snap/overview
- API Reference: https://api-docs.midtrans.com
