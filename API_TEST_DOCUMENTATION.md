# Tripin Travel API - Test Documentation

## ✅ Setup Complete

### Models Created
- **Tour** - Represents travel tours with $fillable properties
- **Booking** - Manages tour bookings with validation
- **Payment** - Handles payment transactions
- **Category** - Tour categories

### Database Migrations
- `categories` table - Stores tour categories
- `tours` table - Stores tour information
- `bookings` table - Stores booking records
- `payments` table - Stores payment information

All migrations have been successfully executed.

## 🧪 API Testing Guide

### Base URL
```
http://localhost:8000/api
```

### 1. Tours Endpoints

#### Get All Tours
```bash
GET /api/tours
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Bali Adventure Tour",
      "description": "Experience the beauty of Bali...",
      "price": "899.99",
      "duration": 5,
      "destination": "Bali, Indonesia",
      "category_id": 1,
      "max_participants": 30,
      "start_date": "2026-01-22T17:07:48.000000Z",
      "end_date": "2026-01-27T17:07:48.000000Z",
      "category": { "id": 1, "name": "Adventure" },
      "bookings": []
    }
  ],
  "pagination": {
    "total": 5,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1
  }
}
```

#### Get Tours by Destination (Filter)
```bash
GET /api/tours?destination=Bali
```

#### Get Tours by Category (Filter)
```bash
GET /api/tours?category_id=1
```

#### Get Single Tour
```bash
GET /api/tours/{id}
```

**Example:**
```bash
curl -s http://localhost:8000/api/tours/1 | jq .
```

---

### 2. Bookings Endpoints

#### Create Booking
```bash
POST /api/bookings
Content-Type: application/json
```

**Request Body:**
```json
{
  "user_id": 1,
  "tour_id": 1,
  "booking_date": "2026-01-15",
  "number_of_participants": 2,
  "total_price": 1799.98,
  "status": "pending",
  "notes": "Special accommodation needed"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "user_id": 1,
    "tour_id": 1,
    "booking_date": "2026-01-15T00:00:00.000000Z",
    "number_of_participants": 2,
    "total_price": "1799.98",
    "status": "pending",
    "notes": "Special accommodation needed",
    "created_at": "2026-01-12T17:15:00.000000Z",
    "updated_at": "2026-01-12T17:15:00.000000Z"
  },
  "message": "Booking created successfully"
}
```

**Validation Rules:**
- `user_id` - Required, must exist in users table
- `tour_id` - Required, must exist in tours table
- `booking_date` - Required, must be a valid date
- `number_of_participants` - Required, must be integer >= 1
- `total_price` - Required, must be numeric >= 0
- `status` - Optional, must be one of: pending, confirmed, cancelled, completed
- `notes` - Optional, can be a string

**Status Values:**
- `pending` - Booking awaiting payment
- `confirmed` - Payment received, booking confirmed
- `cancelled` - Booking has been cancelled
- `completed` - Tour has been completed

---

### 3. Payments Endpoints

#### Create Payment
```bash
POST /api/payments
Content-Type: application/json
```

**Request Body:**
```json
{
  "booking_id": 1,
  "amount": 1799.98,
  "payment_method": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "id": 1,
    "booking_id": 1,
    "amount": "1799.98",
    "payment_method": "credit_card",
    "payment_status": "pending",
    "transaction_id": null,
    "payment_date": null,
    "created_at": "2026-01-12T17:15:00.000000Z",
    "updated_at": "2026-01-12T17:15:00.000000Z"
  },
  "message": "Payment initiated successfully"
}
```

**Validation Rules:**
- `booking_id` - Required, must exist in bookings table
- `amount` - Required, must be numeric >= 0
- `payment_method` - Required, must be one of: credit_card, bank_transfer, ewallet, cash

**Payment Methods:**
- `credit_card` - Credit/debit card payment
- `bank_transfer` - Bank transfer payment
- `ewallet` - E-wallet payment (PayPal, GCash, etc.)
- `cash` - Cash payment

#### Payment Callback
```bash
POST /api/payment/callback
Content-Type: application/json
```

**Request Body:**
```json
{
  "transaction_id": "TXN-123456789",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "id": 1,
    "booking_id": 1,
    "amount": "1799.98",
    "payment_method": "credit_card",
    "payment_status": "completed",
    "transaction_id": "TXN-123456789",
    "payment_date": "2026-01-12T17:15:00.000000Z",
    "created_at": "2026-01-12T17:15:00.000000Z",
    "updated_at": "2026-01-12T17:15:00.000000Z"
  },
  "message": "Payment callback processed"
}
```

**Payment Status Values:**
- `pending` - Payment is pending
- `completed` - Payment has been completed
- `failed` - Payment has failed
- `refunded` - Payment has been refunded

---

## 📬 Testing with cURL

### Example: Complete Booking and Payment Flow

```bash
# 1. Get available tours
curl -s http://localhost:8000/api/tours | jq .

# 2. Create a booking
BOOKING=$(curl -s -X POST http://localhost:8000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "tour_id": 1,
    "booking_date": "2026-01-15",
    "number_of_participants": 2,
    "total_price": 1799.98
  }')

BOOKING_ID=$(echo $BOOKING | jq '.booking.id')

# 3. Create a payment
curl -s -X POST http://localhost:8000/api/payments \
  -H "Content-Type: application/json" \
  -d "{
    \"booking_id\": $BOOKING_ID,
    \"amount\": 1799.98,
    \"payment_method\": \"credit_card\"
  }"

# 4. Process payment callback
curl -s -X POST http://localhost:8000/api/payment/callback \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "TXN-123456789",
    "status": "completed"
  }'
```

---

## 🎯 Sample Tours Data

The database has been seeded with 5 sample tours:

1. **Bali Adventure Tour** - $899.99 (5 days, Adventure category)
2. **Maldives Beach Paradise** - $1299.99 (7 days, Beach category)
3. **Tokyo Cultural Experience** - $1199.99 (6 days, Cultural category)
4. **Mount Everest Base Camp Trek** - $1999.99 (14 days, Mountain category)
5. **Paris City Tour** - $1099.99 (5 days, City category)

---

## 📋 Model Fillable Properties

### Tour Model
```php
protected $fillable = [
    'name',
    'description',
    'price',
    'duration',
    'destination',
    'image',
    'category_id',
    'max_participants',
    'start_date',
    'end_date',
];
```

### Booking Model
```php
protected $fillable = [
    'user_id',
    'tour_id',
    'booking_date',
    'number_of_participants',
    'total_price',
    'status',
    'notes',
];
```

### Payment Model
```php
protected $fillable = [
    'booking_id',
    'amount',
    'payment_method',
    'payment_status',
    'transaction_id',
    'payment_date',
    'notes',
];
```

---

## ⚠️ Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request (resource created)
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

### Example Error Response
```json
{
  "message": "Validation failed",
  "errors": {
    "user_id": ["The user_id field is required."],
    "tour_id": ["The tour_id must exist in the tours table."]
  }
}
```

---

## 🚀 Quick Start

1. **Start the server:** `php artisan serve`
2. **Run the tests:** Use the provided API_COLLECTION.json in Postman/Insomnia
3. **View database:** Check `database/database.sqlite`
4. **Run migrations:** `php artisan migrate`
5. **Seed data:** `php artisan db:seed`

