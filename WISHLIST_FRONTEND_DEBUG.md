# 🔍 Wishlist Frontend Debugging - Visual Step-by-Step

## ✅ Backend Status: PERFECT (17/17 tests ✓)

**Your backend is working 100%!**

Current wishlists in database:
- test@example.com → Bali Adventure Tour
- nurizapalopian24@gmail.com → 4D3N PRIVATE KUALA LUMPUR – SINGAPORE USS

**Problem is in FRONTEND** - Let's fix it together! 💪

---

## 🎯 Quick Test (Copy-Paste in Browser Console)

```javascript
// 1-Minute Test - Copy ALL and paste in Console
console.log('=== WISHLIST DEBUG ===');
console.log('Token:', localStorage.getItem('auth_token') ? '✓ EXISTS' : '✗ MISSING');
console.log('User:', localStorage.getItem('user') ? '✓ EXISTS' : '✗ MISSING');

if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Email:', user.email);
    console.log('Name:', user.name);
}

// Test API call
fetch('/api/wishlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify({ tour_id: 1 })
})
.then(r => r.json())
.then(data => {
    console.log('API Result:', data);
    if (data.success) {
        alert('✅ WISHLIST WORKS! Go to /wishlist page');
    } else {
        alert('❌ ERROR: ' + data.message);
    }
})
.catch(err => alert('❌ NETWORK ERROR: ' + err.message));
```

**Expected Output:**
```
=== WISHLIST DEBUG ===
Token: ✓ EXISTS
User: ✓ EXISTS
Email: nurizapalopian24@gmail.com
Name: nuriza palopian
API Result: {success: true, message: "Tour added to wishlist", ...}
Alert: ✅ WISHLIST WORKS! Go to /wishlist page
```

---

## 📋 Detailed Step-by-Step Debugging

### Step 1: Open Browser Console

Press `F12` or right-click → Inspect

You'll see tabs like this:
```
[Elements] [Console] [Sources] [Network] [Application]
            ↑ Click here!
```

---

### Step 2: Check Login Status

Type in Console:
```javascript
localStorage.getItem('auth_token')
```

**Result A: Long string (GOOD ✓)**
```
"8|lMbKs4El7c885HWFXmtT..."
```
→ You're logged in! Continue to Step 3.

**Result B: null (BAD ✗)**
```
null
```
→ You're NOT logged in!

**FIX:**
1. Clear storage: `localStorage.clear()`
2. Go to `/login` page
3. Login with your credentials
4. Come back to tours page
5. Try again

---

### Step 3: Test Button Click

Keep Console open, go to `/tours` page.

Click heart button (❤️) on any tour.

**Watch Console. You SHOULD see:**
```
Adding tour to wishlist: 1
Add response: {success: true, message: "Tour added to wishlist", data: {...}}
```

**AND you SHOULD see alert:**
```
🔔 Tour added to wishlist! 💖
```

**AND button SHOULD turn red:** ❤️ → ❤️ (filled)

---

### What If You See Errors?

#### Error 1: Nothing in Console
```
→ Console logs might be filtered
→ Check filter settings (should show "All levels")
→ Or WishlistButton not imported correctly
```

#### Error 2: Alert "Please login..."
```
→ AuthContext.user is null
→ Even though token exists
→ Check if you're using correct login flow
```

#### Error 3: "Network Error"
```javascript
Error: Network Error
    at createError (axios.js:...)
```
```
→ Backend server not running!
→ Open terminal, run: php artisan serve
→ Check http://localhost:8000 is accessible
```

#### Error 4: "401 Unauthorized"
```javascript
Error response: {message: "Unauthenticated"}
```
```
→ Token not sent or invalid
→ Go to Network tab (Step 4)
```

#### Error 5: "422 Validation Error"
```javascript
Error response: {
    message: "The tour_id field is required",
    errors: {...}
}
```
```
→ tour_id not in request
→ Check Network tab Payload
```

---

### Step 4: Check Network Tab

Click **[Network]** tab.

Filter by typing: `wishlist`

Click heart button again.

You should see:
```
┌─────────────────────────────────────┐
│ POST  /api/wishlist  201  wishlist  │
└─────────────────────────────────────┘
```

Click on it to see details:

**Headers should show:**
```
Request Method: POST
Request URL: http://localhost:8000/api/wishlist
Authorization: Bearer 8|lMbKs...
Content-Type: application/json
```

**Payload should show:**
```json
{
  "tour_id": 1
}
```

**Response should show:**
```json
{
  "success": true,
  "message": "Tour added to wishlist",
  "data": {
    "id": 6,
    "user_id": 2,
    "tour_id": 1,
    ...
  }
}
```

---

### What If Network Tab Shows Problems?

#### No Authorization Header
```
→ api.js interceptor not working
→ Check if auth_token in localStorage
→ Token might have wrong key name
```

**FIX:** Run in console:
```javascript
// Check token key
console.log(Object.keys(localStorage));
// Should include 'auth_token'

// If you see 'token' instead:
localStorage.setItem('auth_token', localStorage.getItem('token'));
```

#### No tour_id in Payload
```
→ WishlistButton not receiving tourId prop
→ Check Tours.jsx line where WishlistButton used
```

**FIX:** Check this in Tours.jsx:
```jsx
<WishlistButton tourId={tour.id} size="sm" />
                ↑ This must be here!
```

#### Status Code 401
```
→ Token invalid or expired
→ Login again
```

**FIX:**
```javascript
localStorage.clear();
// Then go to /login
```

#### Status Code 500
```
→ Backend error
→ Check Laravel logs
```

**FIX:** Run in terminal:
```bash
tail -20 storage/logs/laravel.log
```

---

### Step 5: Verify in Wishlist Page

Navigate to: `/wishlist`

You should see your saved tours.

**If empty but API said success:**

Check console for errors when page loads.

You should see GET request:
```
GET /api/wishlist  200
```

Response should have your tours:
```json
{
  "success": true,
  "data": [
    {
      "id": 6,
      "user_id": 2,
      "tour_id": 1,
      "tour": {
        "id": 1,
        "name": "Bali Adventure Tour",
        ...
      }
    }
  ]
}
```

**If response is empty array but database has data:**
```json
{
  "success": true,
  "data": []
}
```

→ You're logged in as different user!

Check:
```javascript
JSON.parse(localStorage.getItem('user')).email
```

vs database user who has wishlists.

---

### Step 6: Verify in Database

Run in terminal:
```bash
php artisan tinker --execute="
\$email = 'YOUR_EMAIL_HERE';
\$user = App\Models\User::where('email', \$email)->first();
if (\$user) {
    echo 'User: ' . \$user->name . PHP_EOL;
    echo 'Wishlists: ' . \$user->wishlists()->count() . PHP_EOL;
    \$user->wishlists()->with('tour')->get()->each(function(\$w) {
        echo '  → ' . \$w->tour->name . PHP_EOL;
    });
} else {
    echo 'User not found!';
}
"
```

Replace `YOUR_EMAIL_HERE` with your email.

**This is the TRUTH** - what's really in database.

---

## 🎓 Understanding the Flow

```
User clicks ❤️
    ↓
WishlistButton.toggleWishlist() runs
    ↓
Check: user from AuthContext
    ↓ (if null)
    Alert "Please login"
    ↓ (if exists)
API call: POST /api/wishlist { tour_id: X }
    ↓
Headers: Authorization: Bearer [token]
    ↓
Laravel receives request
    ↓
Middleware: auth:sanctum validates token
    ↓ (if invalid)
    Return 401
    ↓ (if valid)
Controller: WishlistController@store
    ↓
Validate: tour_id exists
    ↓
Create: Wishlist record in database
    ↓
Return: 201 { success: true, data: {...} }
    ↓
Frontend receives response
    ↓
Set state: inWishlist = true
    ↓
Button turns red ❤️
    ↓
Alert: "Tour added to wishlist! 💖"
```

**Find where this flow breaks!**

---

## 🔧 Common Fix Commands

### Clear Everything and Start Fresh
```javascript
// In browser console:
localStorage.clear();
// Then go to /login
```

### Check Current State
```javascript
// In browser console:
console.log({
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('user') || '{}')
});
```

### Manual API Test
```javascript
// In browser console:
fetch('/api/wishlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify({ tour_id: 1 })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Check Database
```bash
# In terminal:
php artisan tinker --execute="
echo 'Total Wishlists: ' . App\Models\Wishlist::count() . PHP_EOL;
App\Models\Wishlist::with('user', 'tour')->get()->each(function(\$w) {
    echo \$w->user->email . ' → ' . \$w->tour->name . PHP_EOL;
});
"
```

---

## ✅ Success Checklist

Your wishlist works if ALL these are true:

- [ ] `localStorage.getItem('auth_token')` returns long string
- [ ] `localStorage.getItem('user')` returns user object
- [ ] Console shows "Adding tour to wishlist: X"
- [ ] Console shows "Add response: {success: true, ...}"
- [ ] Network tab shows POST /api/wishlist with 201
- [ ] Alert shows "Tour added to wishlist! 💖"
- [ ] Button changes from gray ❤️ to red ❤️
- [ ] /wishlist page shows the tour
- [ ] Database confirms record exists
- [ ] Refresh page keeps button red

---

## 📸 Need More Help?

Take screenshots of:

1. **Console tab** after clicking button
2. **Network tab** showing POST request details
3. **localStorage** (type `localStorage` in console)
4. **/wishlist page** (empty or with tours)

And share with me!

---

**Backend:** ✅ Working (17/17 tests passed)  
**Frontend:** 🔍 Need your console output  
**Next:** Run the "Quick Test" at top of this guide!
