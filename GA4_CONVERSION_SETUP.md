# 🎯 GA4 Conversion Setup Guide

## Why Setup Conversions?
Conversions = tujuan bisnis yang ingin Anda capai (purchases, sign-ups, dll).
GA4 akan track conversion rate dan revenue dari conversions ini.

---

## 📍 Setup Conversions (5 menit):

### **Step 1: Masuk ke Events**
1. Buka: https://analytics.google.com/
2. Pilih property: **"Flymora Website"**
3. Sidebar kiri: **Admin** (gear icon ⚙️)
4. Di kolom **Property**, klik: **Events**

### **Step 2: Mark as Conversion**
Tunggu 24 jam untuk events muncul di list (atau browse website untuk trigger events)

Mark events berikut sebagai **Conversions**:

#### **🎯 Critical Conversions (Must Have):**
- **`purchase`** - Payment successful (MOST IMPORTANT!)
  - Ini track actual revenue
  - Toggle "Mark as conversion" = ON

#### **🎯 Important Conversions:**
- **`begin_checkout`** - User mulai booking
  - Track funnel conversion rate
  - Toggle = ON

- **`sign_up`** - User registrasi
  - Track user acquisition
  - Toggle = ON

#### **🎯 Optional but Recommended:**
- **`add_to_wishlist`** - User interested
- **`contact_submit`** - Lead generation
- **`search`** - User intent

---

## 📊 Metrics You'll Get:

### **After Setup Conversions:**

1. **Revenue Tracking:**
   - Total purchase value
   - Average Order Value (AOV)
   - Revenue per user

2. **Conversion Rate:**
   - % visitors yang booking
   - % visitors yang sign up
   - Funnel drop-off analysis

3. **User Behavior:**
   - Path to conversion
   - Time to convert
   - Devices/sources dengan conversion tertinggi

---

## 🧪 Test Conversion Tracking:

### **Test Purchase Event:**
1. Browse ke tour detail
2. Klik "Book Now"
3. Isi form booking
4. Submit payment
5. Cek GA4 Real-Time → Events → Cari `purchase`
6. Should show revenue value!

### **Test Sign Up:**
1. Klik Register
2. Isi form
3. Submit
4. Cek GA4 Real-Time → Events → Cari `sign_up`

---

## 📈 Create Custom Reports (Optional):

### **Report 1: Booking Funnel**
- View tours → Select tour → View detail → Begin checkout → Purchase

### **Report 2: Revenue by Tour**
- Which tours generate most revenue?
- Track via `item_name` parameter in purchase event

### **Report 3: User Acquisition**
- Which traffic source converts best?
- Organic vs Direct vs Referral

---

## 🎯 KPIs to Monitor:

### **Daily:**
- Active users
- Page views
- Conversions (purchases)
- Revenue

### **Weekly:**
- Conversion rate trend
- Most viewed tours
- Most booked tours
- Average session duration

### **Monthly:**
- Total revenue
- Customer acquisition cost
- Lifetime value
- Return visitor rate

---

## 🚀 Next Steps:

1. ✅ Wait 24 hours for events to appear in GA4
2. ✅ Mark `purchase`, `begin_checkout`, `sign_up` as conversions
3. ✅ Create custom dashboards
4. ✅ Set up alerts for conversion drops
5. ✅ After deploy, update stream URL to production domain

---

## 📞 Support:

**GA4 Documentation:**
- Events: https://support.google.com/analytics/answer/9267735
- Conversions: https://support.google.com/analytics/answer/9267568
- E-commerce: https://support.google.com/analytics/answer/9267735

**Already Implemented Events (30+):**
See full list in: `ANALYTICS_SETUP_GUIDE.md`

---

**Status:** ✅ Analytics code implemented and working!
**Next:** Wait 24h for events → Mark as conversions → Monitor data
