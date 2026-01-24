# ⚡ QUICK REFERENCE - TRIPIN TRAVEL API

## 🚀 START SERVER
```bash
cd /Users/user/tripin-travel
php artisan serve
# Server: http://127.0.0.1:8000
```

---

## 📍 API ENDPOINTS

### Get Tours
```bash
curl http://127.0.0.1:8000/api/tours | jq
```

### Create Booking
```bash
curl -X POST http://127.0.0.1:8000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "tour_id": 1,
    "booking_date": "2026-01-15",
    "number_of_participants": 2
  }'
```

### Get Bookings (Check Status)
```bash
curl http://127.0.0.1:8000/api/bookings | jq '.data[] | {id, status}'
```

### Generate Snap Token (Midtrans)
```bash
curl -X POST http://127.0.0.1:8000/api/payments/1
# Response contains: snap_token, order_id
```

### Simulate Payment Callback
```bash
curl -X POST http://127.0.0.1:8000/api/midtrans/callback \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_status": "settlement",
    "transaction_id": "1234567890",
    "order_id": "BOOKING-1-1234567890",
    "payment_type": "credit_card",
    "fraud_status": "accept"
  }'
```

---

## 📊 PAYMENT STATUS FLOW

```
BOOKING CREATED
    ↓
status: "pending"
    ↓
GENERATE PAYMENT TOKEN
    ↓
USER PAYS (MIDTRANS GATEWAY)
    ↓
MIDTRANS SENDS CALLBACK
    ↓
STATUS UPDATES
    ├─ settlement/capture → "paid" ✅
    ├─ pending → "pending" ⏳
    ├─ deny/expire/cancel → "cancelled" ❌
```

---

## 🧪 QUICK TEST FLOW

```bash
# 1. Get one tour
TOUR_ID=$(curl -s http://127.0.0.1:8000/api/tours | jq '.[0].id')

# 2. Create booking
BOOKING=$(curl -s -X POST http://127.0.0.1:8000/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": 1, \"tour_id\": $TOUR_ID, \"booking_date\": \"2026-01-15\", \"number_of_participants\": 1}")
BOOKING_ID=$(echo $BOOKING | jq '.data.id')
echo "Created booking: $BOOKING_ID"

# 3. Generate payment
PAYMENT=$(curl -s -X POST http://127.0.0.1:8000/api/payments/$BOOKING_ID)
ORDER_ID=$(echo $PAYMENT | jq -r '.order_id')
echo "Generated order: $ORDER_ID"

# 4. Simulate payment success
curl -s -X POST http://127.0.0.1:8000/api/midtrans/callback \
  -H "Content-Type: application/json" \
  -d "{\"transaction_status\": \"settlement\", \"order_id\": \"$ORDER_ID\"}"

# 5. Check status changed to PAID
curl -s http://127.0.0.1:8000/api/bookings | jq ".data[] | select(.id == $BOOKING_ID)"
```

---

## 🔐 IMPORTANT NOTES

### ✅ DO's
- Generate snap token from backend
- Validate order_id format: `BOOKING-{id}-{timestamp}`
- Only update status via Midtrans callback
- Store full Midtrans payload for audit

### ❌ DON'Ts
- Don't update booking status from frontend
- Don't skip callback validation
- Don't remove `withoutMiddleware('api')` from callback route
- Don't hardcode Midtrans credentials (use .env)

---

## 📝 KEY FILES

| File | Purpose |
|------|---------|
| `app/Http/Controllers/Api/PaymentController.php` | Generate snap token |
| `app/Http/Controllers/Api/MidtransCallbackController.php` | Handle Midtrans webhook |
| `app/Models/Booking.php` | Booking model + relationships |
| `app/Models/Payment.php` | Payment model + relationships |
| `routes/api.php` | All API routes |
| `config/services.php` | Midtrans config |
| `.env` | Midtrans credentials |

---

## 🔧 CONFIGURATION

### .env
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-4v8hfNhGR-OflKfqy_4nKlJg
MIDTRANS_CLIENT_KEY=SB-Mid-client-rJ_LPGc6JFJGvW3P
MIDTRANS_IS_PRODUCTION=false
```

For production:
```env
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_SERVER_KEY=your-production-key
MIDTRANS_CLIENT_KEY=your-production-client-key
```

---

## 📱 STATUS VALUES

| Value | Meaning |
|-------|---------|
| `pending` | Waiting for payment |
| `paid` | Payment successful ✅ |
| `cancelled` | Payment failed/expired ❌ |

---

## 🔄 CALLBACK STATUS MAPPING

| Midtrans Status | → | Booking Status |
|---|---|---|
| settlement | → | paid |
| capture | → | paid |
| pending | → | pending |
| deny | → | cancelled |
| expire | → | cancelled |
| cancel | → | cancelled |

---

## 📞 TROUBLESHOOTING

### Payment not updating
1. Check database: `SELECT * FROM bookings WHERE id = ?`
2. Check logs: `tail -f storage/logs/laravel.log | grep -i midtrans`
3. Verify callback route is not protected: `withoutMiddleware('api')`

### Invalid order_id error
- Format must be: `BOOKING-{booking_id}-{timestamp}`
- Example: `BOOKING-1-1768245571`

### Snap token not working
- Check Midtrans credentials in `.env`
- Verify booking status is "pending" (not already paid)
- Check if booking exists

---

## 📚 DOCUMENTATION LINKS

- **Full Guide**: `PAYMENT_INTEGRATION.md`
- **Test Cases**: `API_TEST_SCENARIOS.md`
- **Implementation**: `IMPLEMENTATION_SUMMARY.md`
- **Midtrans API**: https://api-docs.midtrans.com

---

## ✅ PRODUCTION CHECKLIST

- [ ] Update `.env` with production credentials
- [ ] Set `MIDTRANS_IS_PRODUCTION=true`
- [ ] Configure callback URL in Midtrans Dashboard
- [ ] Enable HTTPS
- [ ] Test with real payment
- [ ] Set up error monitoring
- [ ] Enable logging

---

**Quick Help**: Check `PAYMENT_INTEGRATION.md` for detailed guide
