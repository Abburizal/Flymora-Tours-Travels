# 🧪 Wishlist Testing & Debugging Guide

## ✅ Backend Verification - PASSED

**All backend tests passed successfully:**
- ✓ Database model working
- ✓ User relationships working
- ✓ hasInWishlist() helper working
- ✓ Create wishlist entry working
- ✓ Delete wishlist entry working
- ✓ API routes registered correctly

Run backend test:
```bash
php test_wishlist_api.php
```

---

## 🔍 Frontend Debugging Steps

### Step 1: Check Browser Console

**Open Developer Tools (F12 or Cmd+Option+I) and check Console tab**

When you click the wishlist button, you should see:
```javascript
Adding tour to wishlist: 1
Add response: {success: true, message: "Tour added to wishlist", data: {...}}
```

**If you see errors, check:**

#### Error 1: "401 Unauthorized"
```
Error response: {message: "Unauthenticated"}
```

**Solution:**
- You're not logged in properly
- Check localStorage: `localStorage.getItem('auth_token')`
- Try login again
- Clear browser cache and login fresh

#### Error 2: "422 Validation Error"
```
Error response: {message: "The tour_id field is required"}
```

**Solution:**
- tour_id is not being sent correctly
- Check WishlistButton component receiving correct `tourId` prop

#### Error 3: Network Error / CORS
```
Error: Network Error
```

**Solution:**
- Backend server not running: `php artisan serve`
- Check if API endpoint accessible: http://localhost:8000/api/wishlist

---

### Step 2: Check Network Tab

**Open Developer Tools → Network tab**

1. Click wishlist button
2. Look for request to `/api/wishlist`
3. Click on the request to see details

**Expected Request:**
```
Method: POST
URL: http://localhost:8000/api/wishlist
Headers:
  - Authorization: Bearer [token]
  - Content-Type: application/json
  - Accept: application/json
Payload:
  {
    "tour_id": 1
  }
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Tour added to wishlist",
  "data": {
    "id": 5,
    "user_id": 1,
    "tour_id": 1,
    "created_at": "2026-01-26T11:43:00.000000Z",
    "updated_at": "2026-01-26T11:43:00.000000Z",
    "tour": {
      "id": 1,
      "name": "Bali Adventure Tour",
      ...
    }
  }
}
```

---

### Step 3: Verify Data Persistence

**After clicking wishlist button:**

1. **Check database directly:**
```bash
php artisan tinker --execute="
\$user = App\Models\User::first();
echo 'Wishlists count: ' . \$user->wishlists()->count() . PHP_EOL;
\$user->wishlists()->get()->each(function(\$w) {
    echo '- Tour: ' . \$w->tour->name . ' (ID: ' . \$w->tour_id . ')' . PHP_EOL;
});
"
```

2. **Navigate to Wishlist page:**
- Click "Wishlist" link in navbar
- You should see the tour you just added
- If page is empty but database has data → frontend display issue
- If database is empty → API call issue

3. **Reload page and check button state:**
- Refresh the Tours page
- Wishlist button should remain red (filled heart)
- If it turns gray → checkWishlistStatus() not working

---

## 🐛 Common Issues & Solutions

### Issue 1: Button turns red but data not in database

**Symptoms:**
- Button changes color immediately
- Alert shows "Tour added to wishlist! 💖"
- But database query shows count = 0
- Wishlist page is empty

**Root Cause:**
- State (inWishlist) is set BEFORE API call completes
- Or API call is failing silently

**Solution:**
Check console logs. If you see error, the state should revert:
```javascript
// In toggleWishlist catch block:
setInWishlist(!inWishlist); // Revert on error
```

---

### Issue 2: Button gray but data is in database

**Symptoms:**
- Database shows wishlist entry exists
- Button shows gray (outline heart)
- clicking button shows "already in wishlist" error

**Root Cause:**
- checkWishlistStatus() not called on mount
- Or API endpoint returning wrong data

**Solution:**
```javascript
useEffect(() => {
    if (user) {
        checkWishlistStatus();
    }
}, [user, tourId]);
```

---

### Issue 3: Token not being sent

**Symptoms:**
- Console shows "401 Unauthorized"
- Network tab shows no Authorization header

**Root Cause:**
- api interceptor not working
- auth_token not in localStorage

**Check:**
```javascript
// In browser console:
localStorage.getItem('auth_token')
// Should return: "6|laWi4v7KG..."

// If null, login again
```

---

## 📝 Manual Test Checklist

### Scenario 1: Add to Wishlist (Logged In)
- [ ] Login to application
- [ ] Navigate to Tours page
- [ ] Click wishlist button (gray heart) on any tour
- [ ] Button should turn red (filled heart)
- [ ] Alert shows "Tour added to wishlist! 💖"
- [ ] Console shows "Add response: {success: true, ...}"
- [ ] Navigate to Wishlist page
- [ ] Tour should appear in wishlist
- [ ] Refresh page - button stays red

### Scenario 2: Remove from Wishlist
- [ ] Find tour with red heart button
- [ ] Click button
- [ ] Button should turn gray (outline heart)
- [ ] Alert shows "Tour removed from wishlist! ❤️"
- [ ] Console shows "Remove response: {success: true, ...}"
- [ ] Navigate to Wishlist page
- [ ] Tour should be removed from list
- [ ] Refresh page - button stays gray

### Scenario 3: Not Logged In
- [ ] Logout from application
- [ ] Navigate to Tours page
- [ ] Wishlist button should be visible (gray heart)
- [ ] Click button
- [ ] Should redirect to /login page

### Scenario 4: Multiple Tours
- [ ] Login to application
- [ ] Add 3 different tours to wishlist
- [ ] All 3 buttons should turn red
- [ ] Navigate to Wishlist page
- [ ] Should see all 3 tours
- [ ] Remove 1 tour from wishlist page
- [ ] Go back to Tours page
- [ ] That tour's button should be gray now

### Scenario 5: Page Refresh Persistence
- [ ] Add tour to wishlist (button red)
- [ ] Hard refresh page (Cmd+Shift+R or Ctrl+F5)
- [ ] Button should still be red
- [ ] Click button to remove
- [ ] Button turns gray
- [ ] Refresh again
- [ ] Button should still be gray

---

## 🔧 Troubleshooting Commands

### Check database directly:
```bash
# Count all wishlists
php artisan tinker --execute="echo App\Models\Wishlist::count();"

# Show all wishlists
php artisan tinker --execute="
App\Models\Wishlist::with('user', 'tour')->get()->each(function(\$w) {
    echo \$w->user->name . ' -> ' . \$w->tour->name . PHP_EOL;
});
"

# Clear all wishlists
php artisan tinker --execute="App\Models\Wishlist::truncate();"
```

### Check API routes:
```bash
php artisan route:list --path=wishlist
```

### Check Laravel logs:
```bash
tail -f storage/logs/laravel.log
```

### Clear caches:
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

---

## 📊 Expected Behavior Summary

| Action | Frontend State | API Call | Database | Visual |
|--------|---------------|----------|----------|--------|
| Initial Load (not in wishlist) | `inWishlist = false` | GET `/wishlist/check/{id}` | No record | Gray heart |
| Initial Load (in wishlist) | `inWishlist = true` | GET `/wishlist/check/{id}` | Has record | Red heart |
| Click to Add | `inWishlist = true` | POST `/wishlist` | Record created | Gray → Red |
| Click to Remove | `inWishlist = false` | DELETE `/wishlist/{id}` | Record deleted | Red → Gray |
| Refresh Page | State reloaded | GET `/wishlist/check/{id}` | Persisted | Matches DB |

---

## 🎯 Success Criteria

Wishlist feature is working correctly if:

1. ✅ Backend test passes (php test_wishlist_api.php)
2. ✅ Button color matches database state
3. ✅ Console logs show successful API responses
4. ✅ Network tab shows 200/201 status codes
5. ✅ Database count matches wishlist page display
6. ✅ State persists after page refresh
7. ✅ No console errors or warnings
8. ✅ Add/remove operations are instant (< 1s)
9. ✅ Alert messages show on success
10. ✅ Not logged in users get redirected to login

---

## 📞 Need More Help?

If issue persists after following this guide:

1. **Run backend test first:**
   ```bash
   php test_wishlist_api.php
   ```
   If this fails → backend issue
   If this passes → frontend issue

2. **Check browser console** for exact error message

3. **Check network tab** for API request/response details

4. **Provide screenshot** of:
   - Console logs when clicking button
   - Network tab showing API request
   - Database query result

---

**Last Updated:** 2026-01-26  
**Version:** 1.0  
**Status:** Backend ✅ | Frontend 🔍 Debugging
