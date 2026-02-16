# 🧪 Test Smart Recommendations - Step by Step

## 🚀 Quick Test (5 minutes)

### **Step 1: Start Server**
```bash
cd /Users/user/Flymora-Tours-Travels
php artisan serve
```
Server running at: **http://127.0.0.1:8000**

---

### **Step 2: Hard Refresh Browser**
**IMPORTANT:** Clear browser cache first!
- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + F5`

---

### **Step 3: Test Tour Detail Page**

**Navigate to:**
```
http://127.0.0.1:8000/tours/33
```

**Scroll down past the price estimator. You should see:**

✅ **Section 1: Similar Tours (🔍)**
- Title: "🔍 Tour Serupa yang Mungkin Anda Suka"
- 6 tour cards in grid
- Same category or similar price

✅ **Section 2: Customers Also Viewed (👥)**
- Title: "👥 Pelanggan Juga Melihat"
- 6 tour cards in grid
- Collaborative filtering

✅ **Section 3: Complete Your Trip (✨)**
- Title: "✨ Lengkapi Perjalanan Anda"
- 4 tour cards in grid
- Different categories (cross-sell)
- Blue gradient background

**What to check:**
- [ ] All 3 sections appear
- [ ] Tour cards have images
- [ ] Prices displayed correctly
- [ ] Category badges visible
- [ ] Rating badges (if reviews exist)
- [ ] Click any card → goes to tour detail

---

### **Step 4: Test Tours Listing Page**

**Navigate to:**
```
http://127.0.0.1:8000/tours
```

**Scroll to bottom (don't apply any filters). You should see:**

✅ **Trending Tours (��)**
- Title: "🔥 Tour Trending Bulan Ini"
- Description: "Tour paling populer..."
- 6 tour cards in grid

**What to check:**
- [ ] Section appears at bottom
- [ ] Only shows when NO filters active
- [ ] Cards clickable

---

### **Step 5: Test Dashboard**

**Navigate to:**
```
http://127.0.0.1:8000/dashboard
```
(Must be logged in)

**Scroll to bottom. You should see:**

✅ **If you have bookings:**
- "🎯 Rekomendasi Khusus untuk Anda"
- Personalized recommendations

✅ **If no bookings:**
- "🔥 Tour Populer"
- Trending tours

**What to check:**
- [ ] Section appears
- [ ] Appropriate title based on user state
- [ ] Cards clickable

---

### **Step 6: Test Click Tracking**

**Open DevTools (F12) → Network tab**

1. Click any recommendation card
2. Check Network tab for:
   - ✅ POST to `/api/recommendations/track`
   - ✅ Status: 200 OK

**Open DevTools (F12) → Console tab**

3. Should see GA4 events:
   - ✅ `[Analytics] Event: Recommendation`
   - ✅ `select_item` event with tour data

---

## 🐛 Troubleshooting

### **Problem: Recommendations not showing**

**Solution 1: Clear cache**
```bash
php artisan cache:clear
```

**Solution 2: Check API directly**
```bash
curl http://127.0.0.1:8000/api/recommendations/trending?limit=3
```
Should return JSON with tours.

**Solution 3: Hard refresh browser**
- Cmd+Shift+R (Mac)
- Ctrl+Shift+F5 (Windows)

---

### **Problem: Empty recommendations**

**Cause:** Tour #33 might be only tour in its category.

**Solution:** Test with different tour:
```bash
# Find tours with category
curl http://127.0.0.1:8000/api/tours | jq '.[0:5][] | {id, name, category}'
```

Try URL: `http://127.0.0.1:8000/tours/{different_id}`

---

### **Problem: Click tracking not working**

**Check 1:** Network tab shows 401 Unauthorized
- **Solution:** Track endpoint should work without auth

**Check 2:** Console shows errors
- **Solution:** Check `useAnalytics` is imported
- Rebuild: `npm run build`

---

## 📊 Verify in Database

**Check tracking data:**
```bash
php artisan tinker
```

```php
// Check recommendation clicks
DB::table('recommendation_clicks')->count();

// See recent clicks
DB::table('recommendation_clicks')
    ->latest()
    ->limit(5)
    ->get();

// Count by type
DB::table('recommendation_clicks')
    ->select('recommendation_type', DB::raw('count(*) as clicks'))
    ->groupBy('recommendation_type')
    ->get();
```

---

## 🎯 Success Criteria

### **Must Have:**
- [x] Backend API working
- [x] Frontend components rendering
- [x] Caching functional
- [x] Click tracking to database
- [x] GA4 events firing

### **Nice to Have:**
- [ ] Test on mobile (responsive)
- [ ] Test with slow network
- [ ] Verify cache TTL
- [ ] Monitor analytics dashboard

---

## 📈 Monitor Performance

### **Week 1:**
**Track these metrics:**
1. Recommendation CTR (Click-Through Rate)
2. Most clicked recommendation type
3. Tours clicked via recommendations
4. Time spent on site (increased?)

**Query recommendations clicks:**
```sql
SELECT 
  recommendation_type,
  COUNT(*) as clicks,
  COUNT(DISTINCT user_id) as unique_users
FROM recommendation_clicks
WHERE created_at >= DATE('now', '-7 days')
GROUP BY recommendation_type;
```

### **Month 1:**
**Measure business impact:**
1. Conversion rate lift
2. Revenue from recommendations
3. Repeat customer rate
4. Average session duration

---

## 🚀 What's Next?

### **Immediate:**
1. ✅ Test all 3 pages in browser
2. ✅ Verify click tracking works
3. ✅ Check GA4 Real-Time reports

### **This Week:**
- Monitor recommendation CTR
- Adjust limits if needed (6 → 8 cards)
- Optimize cache TTL based on traffic

### **This Month:**
- Measure conversion improvement
- Calculate ROI
- Identify best-performing types
- Optimize algorithms

### **Future (Optional):**
- Add ML model for better predictions
- Implement A/B testing
- Add seasonal recommendations
- Real-time personalization

---

## 📞 Need Help?

**Documentation:**
- Full Guide: `SMART_RECOMMENDATIONS_GUIDE.md`
- Summary: `SMART_RECOMMENDATIONS_COMPLETE.md`
- This File: `TEST_RECOMMENDATIONS.md`

**Check API:**
```bash
# Test all endpoints
curl http://localhost:8000/api/recommendations/trending?limit=3
curl http://localhost:8000/api/recommendations/similar/33?limit=3
curl http://localhost:8000/api/recommendations/also-viewed/33?limit=3
```

**Check Logs:**
```bash
tail -f storage/logs/laravel.log
```

---

**Status:** ✅ Ready to test!  
**Time:** 5 minutes  
**Difficulty:** Easy  

Happy testing! 🎉
