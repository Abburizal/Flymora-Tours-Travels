# 📝 PANDUAN CUSTOMER: Cara Review & Rating Tour

**Last Updated:** January 24, 2026  
**Status:** ✅ Fully Integrated & Operational

---

## 🎯 CARA ME-REVIEW TOUR (STEP BY STEP)

### **LANGKAH 1: Selesaikan Booking & Bayar**

1. **Login** ke akun Anda
2. **Browse Tours** - Pilih tour yang Anda inginkan
3. **Book Tour** - Klik "Book Now" dan isi form booking
4. **Bayar** - Lakukan pembayaran via Midtrans
5. **Konfirmasi** - Tunggu konfirmasi payment (status berubah jadi "Paid")

**Status Booking:**
- 🟡 **Pending** = Belum bayar (tidak bisa review)
- 🟢 **Paid** = Sudah bayar (BISA review)
- 🔵 **Completed** = Tour selesai (BISA review)

---

### **LANGKAH 2: Buka Dashboard**

1. Klik **"My Bookings"** di navbar (atau kunjungi `/dashboard`)
2. Anda akan melihat daftar semua booking Anda

**Tampilan Dashboard:**
```
+---------------------------------------+
| My Bookings                           |
| Welcome back, John Doe!               |
+---------------------------------------+

┌─────────────────────────────────────┐
│ Bali Beach Paradise Tour           │
│ 📍 Bali, Indonesia                  │
│ 📅 Feb 10, 2026                     │
│ 👥 2 participants                   │
│ Status: Paid ✅                     │
│ ─────────────────────────────────   │
│ [⭐ Write a Review]                 │ ← KLIK INI
└─────────────────────────────────────┘
```

---

### **LANGKAH 3: Klik "Write a Review"**

Setelah status booking Anda **"Paid"** atau **"Completed"**, akan muncul tombol:

```
┌───────────────────────────┐
│ ⭐ Write a Review         │
└───────────────────────────┘
```

**Klik tombol tersebut** untuk membuka form review.

---

### **LANGKAH 4: Isi Form Review**

Form review akan muncul dengan tampilan:

```
┌──────────────────────────────────────┐
│ ⭐ Write a Review                    │
├──────────────────────────────────────┤
│                                      │
│ You're reviewing:                    │
│ Bali Beach Paradise Tour             │
│                                      │
│ Your Rating *                        │
│ ☆ ☆ ☆ ☆ ☆  (0 stars)                │
│                                      │
│ Your Review (Optional)               │
│ ┌──────────────────────────────┐    │
│ │ Share your experience...     │    │
│ │                              │    │
│ │                              │    │
│ └──────────────────────────────┘    │
│ 0/1000 characters                    │
│                                      │
│ [Submit Review]                      │
└──────────────────────────────────────┘
```

**Isi Form:**

1. **Rating (Required):**
   - Klik bintang untuk memberi rating (1-5)
   - ⭐ = Sangat buruk
   - ⭐⭐ = Buruk
   - ⭐⭐⭐ = Cukup
   - ⭐⭐⭐⭐ = Bagus
   - ⭐⭐⭐⭐⭐ = Sangat bagus!

2. **Comment (Optional):**
   - Tulis review Anda (max 1000 karakter)
   - Contoh: "Amazing tour! The guide was friendly and the scenery was breathtaking. Highly recommended!"

3. **Klik "Submit Review"**

---

### **LANGKAH 5: Konfirmasi**

Setelah submit, Anda akan melihat:

```
✅ Review submitted successfully! 
   Thank you for your feedback.
```

**Perubahan:**
- ✅ Form review akan disembunyikan
- ✅ Tombol "Write a Review" akan diganti dengan pesan: "Already reviewed"
- ✅ Review Anda akan muncul di halaman detail tour

---

## 🔍 DIMANA REVIEW SAYA MUNCUL?

### **1. Di Halaman Tour Detail**

Kunjungi halaman tour yang Anda review:
- URL: `/tours/{tour_id}`
- Scroll ke bawah ke section **"Customer Reviews"**

**Tampilan:**
```
┌─────────────────────────────────────────┐
│ Customer Reviews                        │
├─────────────────────────────────────────┤
│                                         │
│ ⭐⭐⭐⭐⭐ 4.8                          │
│ (25 reviews)                            │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ John Doe                        │    │
│ │ ⭐⭐⭐⭐⭐                        │    │
│ │ "Amazing tour! The guide was    │    │
│ │ friendly and the scenery was    │    │
│ │ breathtaking."                  │    │
│ │ Jan 24, 2026                    │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### **2. Rating Summary di Tour Detail**

Di bagian atas tour detail, rating rata-rata akan update:

```
┌─────────────────────────────────────┐
│ Bali Beach Paradise Tour           │
│                                     │
│ ⭐⭐⭐⭐⭐ 4.8 (25 reviews)         │ ← UPDATE!
│ ─────────────────────────────────   │
│ 📍 Bali, Indonesia                  │
│ ⏱️ 5 days                           │
└─────────────────────────────────────┘
```

### **3. Di Tour Listing (Coming Soon)**

Nantinya rating juga akan muncul di halaman tour listing (`/tours`).

---

## ❓ FAQ - PERTANYAAN UMUM

### **Q1: Saya sudah bayar tapi tombol "Write a Review" tidak muncul?**

**Troubleshooting:**

1. **Cek Status Booking:**
   - Pastikan status booking = **"Paid"** atau **"Completed"**
   - Bukan "Pending" atau "Cancelled"

2. **Refresh Halaman:**
   - Tekan F5 atau refresh browser Anda
   - Logout lalu login kembali

3. **Cek Backend:**
   ```bash
   # Test API manually
   curl http://localhost:8000/api/bookings/{booking_id}/can-review \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

### **Q2: Bisakah saya review sebelum tour selesai?**

✅ **YA!** Anda bisa review segera setelah **status = Paid**.

**Alasan:**
- Sistem asumsi Anda sudah booking dan siap berangkat
- Tidak perlu tunggu tour selesai
- Tapi idealnya review **SETELAH** tour selesai untuk feedback yang akurat

**Rekomendasi:**
- Review setelah tour = lebih bermanfaat untuk customer lain ✅
- Review sebelum tour = kurang objektif ⚠️

---

### **Q3: Bisakah saya review lebih dari 1x untuk booking yang sama?**

❌ **TIDAK!** Sistem mencegah duplicate reviews.

**Batasan:**
- **1 Booking = 1 Review** (fixed)
- Setelah submit, tombol "Write a Review" hilang
- Database memiliki **unique constraint** pada `booking_id`

**Jika Coba Review Lagi:**
```json
{
  "success": false,
  "message": "You have already reviewed this tour"
}
```

---

### **Q4: Bisakah saya edit review saya?**

❌ **SAAT INI BELUM!** (Future Feature)

**Workaround:**
- Hubungi admin untuk edit/hapus review
- Atau booking tour yang sama lagi dan beri review baru

**Future Enhancement:**
- Phase 6: Edit review feature
- Phase 6: Delete review feature

---

### **Q5: Apakah review saya harus di-approve admin dulu?**

✅ **TIDAK!** Review langsung publish (auto-approved).

**Setting Saat Ini:**
```php
'is_approved' => true  // Auto-approve
```

**Jika Manual Moderation:**
- Admin bisa ubah setting ke `false`
- Review baru perlu approval admin dulu
- Customer tunggu sampai admin approve

---

### **Q6: Bisakah saya review tanpa comment? Cuma rating aja?**

✅ **YA!** Comment optional.

**Minimum Requirement:**
- Rating (1-5 bintang) = **REQUIRED** ✅
- Comment = **OPTIONAL** (boleh kosong)

**Contoh Valid:**
```json
{
  "booking_id": 12,
  "rating": 5,
  "comment": ""  // ← Boleh kosong
}
```

---

### **Q7: Kenapa review saya tidak muncul di tour detail?**

**Troubleshooting:**

1. **Cek Status Approval:**
   - Default: Auto-approved (langsung muncul)
   - Jika manual moderation: tunggu admin approve

2. **Cek Filter:**
   - Hanya review dengan `is_approved = true` yang tampil
   - Review pending moderation tidak tampil

3. **Refresh Halaman:**
   - Clear cache browser (Ctrl+Shift+R)
   - Atau buka incognito window

4. **Cek Database:**
   ```sql
   SELECT * FROM reviews WHERE booking_id = 12;
   ```

---

### **Q8: Bisakah saya review booking yang sudah dibatalkan?**

❌ **TIDAK!** Hanya booking dengan status:
- ✅ **Paid** (sudah bayar)
- ✅ **Completed** (tour selesai)

**Status yang TIDAK BISA review:**
- ❌ Pending (belum bayar)
- ❌ Cancelled (dibatalkan)
- ❌ Expired (kadaluarsa)

---

### **Q9: Apa yang terjadi jika saya hapus booking?**

⚠️ **Review ikut terhapus!**

**Cascade Delete:**
```php
$table->foreignId('booking_id')
      ->constrained()
      ->onDelete('cascade');  // ← Review otomatis terhapus
```

**Jadi:**
- Booking dihapus → Review ikut hilang
- Tour dihapus → Semua review tour hilang
- User dihapus → Semua review user hilang

---

### **Q10: Bagaimana cara melihat rating distribution?**

**Via API:**
```bash
GET /api/tours/{tour_id}/reviews
```

**Response:**
```json
{
  "stats": {
    "average_rating": 4.5,
    "total_reviews": 25,
    "rating_distribution": {
      "5": 15,  // 15 orang beri 5 bintang
      "4": 7,   // 7 orang beri 4 bintang
      "3": 2,   // 2 orang beri 3 bintang
      "2": 1,   // 1 orang beri 2 bintang
      "1": 0    // 0 orang beri 1 bintang
    }
  }
}
```

**Frontend (Coming Soon):**
- Rating bars visual (histogram)
- Percentage per rating
- Filter by rating

---

## 🧪 TESTING - CARA TEST REVIEW SYSTEM

### **Test Scenario 1: Submit Review (Happy Path)**

1. **Register akun baru:**
   - POST `/api/register`
   - Email: `test@example.com`
   - Password: `password123`

2. **Login:**
   - POST `/api/login`
   - Dapat Bearer Token

3. **Book tour:**
   - POST `/api/bookings`
   - Tour ID: 1, Participants: 2

4. **Bayar:**
   - POST `/api/payments/{booking_id}`
   - Gunakan Payment Simulator
   - Klik "Simulate Success"

5. **Cek status:**
   - GET `/api/bookings`
   - Pastikan status = "paid"

6. **Submit review:**
   - Buka `/dashboard`
   - Klik "Write a Review"
   - Isi rating: 5 stars
   - Isi comment: "Amazing tour!"
   - Klik "Submit Review"

7. **Verify:**
   - Lihat alert: "✅ Review submitted successfully!"
   - Tombol "Write a Review" hilang
   - Buka `/tours/1` → Lihat review Anda muncul

**Expected:** ✅ Semua berhasil

---

### **Test Scenario 2: Duplicate Review (Error)**

1. Submit review pertama (sukses)
2. Coba submit review kedua untuk booking yang sama

**Expected:**
- ❌ Error: "You have already reviewed this tour"
- Form tidak submit
- Alert error muncul

---

### **Test Scenario 3: Review Unpaid Booking (Error)**

1. Buat booking baru (status: pending)
2. Jangan bayar
3. Coba klik "Write a Review"

**Expected:**
- ❌ Tombol "Write a Review" tidak muncul
- Atau pesan: "Booking must be completed first"

---

## 🔧 API ENDPOINTS - UNTUK DEVELOPER

### **1. Get Reviews for Tour**
```bash
GET /api/tours/{tour_id}/reviews?per_page=10

# Public endpoint (no auth required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing tour!",
        "created_at": "2026-01-24T18:00:00.000000Z",
        "user": {
          "name": "John Doe"
        }
      }
    ],
    "current_page": 1,
    "total": 25
  },
  "stats": {
    "average_rating": 4.8,
    "total_reviews": 25,
    "rating_distribution": {
      "5": 15, "4": 7, "3": 2, "2": 1, "1": 0
    }
  }
}
```

---

### **2. Submit Review**
```bash
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "booking_id": 12,
  "rating": 5,
  "comment": "Amazing experience!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 26,
    "rating": 5,
    "comment": "Amazing experience!",
    "user": {
      "name": "John Doe"
    }
  },
  "message": "Review submitted successfully!"
}
```

**Response (Error - Duplicate):**
```json
{
  "success": false,
  "message": "You have already reviewed this tour"
}
```

**Response (Error - Not Paid):**
```json
{
  "success": false,
  "message": "You can only review completed bookings"
}
```

---

### **3. Check Can Review**
```bash
GET /api/bookings/{booking_id}/can-review
Authorization: Bearer {token}
```

**Response (Can Review):**
```json
{
  "success": true,
  "can_review": true,
  "message": "You can review this tour"
}
```

**Response (Already Reviewed):**
```json
{
  "success": true,
  "can_review": false,
  "message": "Already reviewed"
}
```

---

## 📊 STATISTIK & ANALYTICS

### **Review Metrics:**

| Metric | Description | Where to See |
|--------|-------------|--------------|
| **Average Rating** | Rating rata-rata (1-5) | Tour detail page |
| **Total Reviews** | Jumlah review | Tour detail page |
| **Rating Distribution** | Histogram per rating | API response |
| **Review Count** | Per user / per tour | Admin panel |

### **Expected Review Rate:**

- **15-20%** dari bookings → akan jadi review
- **High satisfaction** (4-5 stars) → lebih sering submit review
- **Low satisfaction** (1-2 stars) → complaint via email/support

### **Impact Metrics:**

- Tours dengan rating **4.5+** → **+30% conversion rate**
- Tours dengan **25+ reviews** → lebih dipercaya customer
- Reviews dengan **photo** (future) → **+50% engagement**

---

## ✨ FUTURE FEATURES (Coming Soon)

### **Phase 6 - Review Enhancements:**

1. **Edit Review**
   - Customer bisa edit review mereka
   - Add "Edit" button di dashboard

2. **Delete Review**
   - Customer bisa hapus review
   - Add "Delete" confirmation

3. **Photo Upload**
   - Attach 1-3 photos per review
   - Display photos in gallery

4. **Helpful Votes**
   - "Was this helpful?" button
   - Sort by most helpful

5. **Review Response**
   - Tour operator bisa balas review
   - Show thread di review list

6. **Verified Badge**
   - "Verified Traveler" badge
   - Only for confirmed bookings

---

## 📞 SUPPORT & TROUBLESHOOTING

**Jika Ada Masalah:**

1. **Check Backend Server:**
   ```bash
   php artisan serve
   # Pastikan running di http://localhost:8000
   ```

2. **Check Frontend Build:**
   ```bash
   npm run build
   # Atau: npm run dev
   ```

3. **Check Database:**
   ```bash
   php artisan migrate:status
   # Pastikan migration reviews table sudah run
   ```

4. **Check Browser Console:**
   - F12 → Console tab
   - Lihat error messages
   - Screenshot untuk support

5. **Contact Developer:**
   - Email: developer@tripin.com
   - Include: booking ID, error message, screenshot

---

## 🎉 SUMMARY

**Cara Review (Singkat):**

1. ✅ Booking tour & bayar
2. ✅ Buka "My Bookings" (`/dashboard`)
3. ✅ Klik "⭐ Write a Review"
4. ✅ Isi rating (1-5 stars) + optional comment
5. ✅ Submit!
6. ✅ Review muncul di tour detail page

**Status:** ✅ **FULLY OPERATIONAL**  
**Last Updated:** January 24, 2026  
**Version:** 1.0.0

---

**Selamat menikmati fitur review! 🎊**  
**Your feedback helps other travelers make better decisions!** 🌟
