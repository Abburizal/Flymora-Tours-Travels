# 🧪 PAYMENT API TEST SCENARIOS

## 📋 Prerequisites
- Server running: `php artisan serve`
- Postman or curl installed

---

## ✅ TEST SUITE 1: HAPPY PATH (Success Scenario)

### 1.1 Get Available Tours
```bash
GET http://127.0.0.1:8000/api/tours

Expected: 200 OK
Response: Array of tours with id, name, price, duration, etc
```

### 1.2 Create New Booking
```bash
POST http://127.0.0.1:8000/api/bookings
Content-Type: application/json

{
  "user_id": 1,
  "tour_id": 1,
  "booking_date": "2026-01-15",
  "number_of_participants": 2
}

Expected: 201 Created
Response: {
  "success": true,
  "data": {
    "id": 6,
    "user_id": 1,
    "tour_id": 1,
    "booking_date": "2026-01-15T00:00:00.000000Z",
    "number_of_participants": 2,
    "total_price": "1799.98",
    "status": "pending",
    "created_at": "2026-01-12T19:21:27.000000Z",
    "updated_at": "2026-01-12T19:21:27.000000Z"
  },
  "message": "Booking created successfully"
}
```

### 1.3 Get All Bookings
```bash
GET http://127.0.0.1:8000/api/bookings

Expected: 200 OK
Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "tour_id": 1,
      "status": "paid",
      "total_price": "1799.98",
      "tour": { ... }
    }
  ]
}
```

### 1.4 Generate Payment Token
```bash
POST http://127.0.0.1:8000/api/payments/6

Expected: 200 OK
Response: {
  "success": true,
  "snap_token": "xxx",
  "booking_id": 6,
  "order_id": "BOOKING-6-1234567890",
  "gross_amount": 1800
}

⚠️ Save snap_token untuk step berikutnya
```

### 1.5 Simulate Midtrans Payment Success
```bash
POST http://127.0.0.1:8000/api/midtrans/callback
Content-Type: application/json

{
  "transaction_time": "2026-01-12 19:21:27",
  "transaction_status": "settlement",
  "transaction_id": "1234567890-success",
  "status_message": "Settlement has been completed successfully",
  "payment_type": "credit_card",
  "order_id": "BOOKING-6-1234567890",
  "gross_amount": "1799.98",
  "fraud_status": "accept"
}

Expected: 200 OK
Response: {
  "message": "Callback processed successfully"
}
```

### 1.6 Verify Booking Status Changed to PAID
```bash
GET http://127.0.0.1:8000/api/bookings

Expected: booking dengan id 6 sekarang status = "paid"
```

---

## ❌ TEST SUITE 2: FAILURE SCENARIOS

### 2.1 Create Booking - Invalid User ID
```bash
POST http://127.0.0.1:8000/api/bookings
{
  "user_id": 9999,
  "tour_id": 1,
  "booking_date": "2026-01-15",
  "number_of_participants": 2
}

Expected: 422 Unprocessable Entity
Response: {
  "success": false,
  "message": "Validation error",
  "errors": {
    "user_id": ["The selected user id is invalid."]
  }
}
```

### 2.2 Create Booking - Invalid Tour ID
```bash
POST http://127.0.0.1:8000/api/bookings
{
  "user_id": 1,
  "tour_id": 9999,
  "booking_date": "2026-01-15",
  "number_of_participants": 2
}

Expected: 422 Validation Error
```

### 2.3 Generate Payment for Non-Existent Booking
```bash
POST http://127.0.0.1:8000/api/payments/9999

Expected: 404 Not Found
Response: {
  "success": false,
  "message": "..."
}
```

### 2.4 Callback with Invalid Booking ID
```bash
POST http://127.0.0.1:8000/api/midtrans/callback
{
  "transaction_status": "settlement",
  "order_id": "BOOKING-9999-1234567890"
}

Expected: 404 Not Found
Response: {
  "message": "Booking not found"
}
```

---

## 🔄 TEST SUITE 3: ALL PAYMENT STATUS SCENARIOS

### 3.1 Payment PENDING
```bash
POST http://127.0.0.1:8000/api/bookings
{ "user_id": 1, "tour_id": 1, "booking_date": "2026-01-15", "number_of_participants": 1 }
# Note: new booking id = 7

POST http://127.0.0.1:8000/api/payments/7
# Get order_id from response

POST http://127.0.0.1:8000/api/midtrans/callback
{
  "transaction_status": "pending",
  "order_id": "BOOKING-7-xxx"
}

GET http://127.0.0.1:8000/api/bookings
# Booking 7 status = "pending"
```

### 3.2 Payment DENIED
```bash
POST http://127.0.0.1:8000/api/bookings
{ "user_id": 1, "tour_id": 2, "booking_date": "2026-01-15", "number_of_participants": 1 }
# new booking id = 8

POST http://127.0.0.1:8000/api/payments/8
# Get order_id

POST http://127.0.0.1:8000/api/midtrans/callback
{
  "transaction_status": "deny",
  "order_id": "BOOKING-8-xxx"
}

GET http://127.0.0.1:8000/api/bookings
# Booking 8 status = "cancelled"
```

### 3.3 Payment EXPIRED
```bash
POST http://127.0.0.1:8000/api/bookings
{ "user_id": 1, "tour_id": 3, "booking_date": "2026-01-15", "number_of_participants": 1 }
# new booking id = 9

POST http://127.0.0.1:8000/api/payments/9

POST http://127.0.0.1:8000/api/midtrans/callback
{
  "transaction_status": "expire",
  "order_id": "BOOKING-9-xxx"
}

# Booking 9 status = "cancelled"
```

### 3.4 Payment CANCELLED
```bash
POST http://127.0.0.1:8000/api/bookings
{ "user_id": 1, "tour_id": 4, "booking_date": "2026-01-15", "number_of_participants": 1 }
# new booking id = 10

POST http://127.0.0.1:8000/api/payments/10

POST http://127.0.0.1:8000/api/midtrans/callback
{
  "transaction_status": "cancel",
  "order_id": "BOOKING-10-xxx"
}

# Booking 10 status = "cancelled"
```

---

## 🔐 TEST SUITE 4: SECURITY TESTS

### 4.1 Duplicate Callback (Idempotent)
```bash
# Generate token dan bayar
POST /api/payments/1 → order_id

# Send callback 2x dengan data yang sama
POST /api/midtrans/callback { order_id: "BOOKING-1-xxx" }
POST /api/midtrans/callback { order_id: "BOOKING-1-xxx" }

Expected: Kedua request return 200, status tetap "paid"
(tidak downgrade atau duplikasi)
```

### 4.2 Status Immutable (Paid Status Cannot Change)
```bash
# Booking sudah paid (status = "paid")
POST /api/midtrans/callback
{
  "transaction_status": "pending",
  "order_id": "BOOKING-1-xxx"
}

Expected: 200 OK
Message: "Booking already paid"
Status tetap: "paid" (tidak berubah)
```

### 4.3 Invalid Order ID Format
```bash
POST /api/midtrans/callback
{
  "transaction_status": "settlement",
  "order_id": "INVALID-FORMAT"
}

Expected: 400 Bad Request
Response: {
  "message": "Invalid order_id format"
}
```

### 4.4 Missing Required Fields
```bash
POST /api/midtrans/callback
{
  "order_id": "BOOKING-1-xxx"
  # Missing: transaction_status
}

Expected: 400 Bad Request
Response: {
  "message": "Missing required fields"
}
```

---

## 📊 EXPECTED RESULTS SUMMARY

| Test Case | Expected Status | Booking Status |
|-----------|-----------------|----------------|
| 1.1 | 200 | N/A |
| 1.2 | 201 | pending |
| 1.3 | 200 | various |
| 1.4 | 200 | pending |
| 1.5 | 200 | → paid |
| 1.6 | 200 | paid ✅ |
| 2.1 | 422 | N/A |
| 2.2 | 422 | N/A |
| 2.3 | 404 | N/A |
| 2.4 | 404 | N/A |
| 3.1 | 200 | pending |
| 3.2 | 200 | cancelled |
| 3.3 | 200 | cancelled |
| 3.4 | 200 | cancelled |
| 4.1 | 200 | paid (no change) |
| 4.2 | 200 | paid (no change) |
| 4.3 | 400 | N/A |
| 4.4 | 400 | N/A |

---

## 🚀 AUTOMATING TESTS WITH CURL

```bash
#!/bin/bash

BASE_URL="http://127.0.0.1:8000/api"

# Test 1: Create booking
BOOKING=$(curl -s -X POST "$BASE_URL/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "tour_id": 1,
    "booking_date": "2026-01-15",
    "number_of_participants": 2
  }')
BOOKING_ID=$(echo $BOOKING | jq -r '.data.id')
echo "Created booking: $BOOKING_ID"

# Test 2: Generate payment
PAYMENT=$(curl -s -X POST "$BASE_URL/payments/$BOOKING_ID")
ORDER_ID=$(echo $PAYMENT | jq -r '.order_id')
echo "Generated order: $ORDER_ID"

# Test 3: Simulate callback
curl -s -X POST "$BASE_URL/midtrans/callback" \
  -H "Content-Type: application/json" \
  -d "{
    \"transaction_status\": \"settlement\",
    \"order_id\": \"$ORDER_ID\",
    \"fraud_status\": \"accept\"
  }"

# Test 4: Verify status
RESULT=$(curl -s "$BASE_URL/bookings" | jq ".data[] | select(.id == $BOOKING_ID)")
echo "Final booking status: $(echo $RESULT | jq -r '.status')"
```

