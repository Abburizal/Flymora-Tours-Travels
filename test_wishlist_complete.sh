#!/bin/bash

# Wishlist Debug Script - Complete Flow Testing
# This script tests the entire wishlist feature from frontend to database

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       🔍 Wishlist Complete Debug & Test Script            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
PASS=0
FAIL=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 1: Database & Model Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if wishlists table exists
php artisan tinker --execute="
try {
    \$count = App\Models\Wishlist::count();
    echo 'success:' . \$count;
} catch (Exception \$e) {
    echo 'error:' . \$e->getMessage();
}
" > /tmp/wishlist_test_1.txt

if grep -q "success" /tmp/wishlist_test_1.txt; then
    COUNT=$(grep "success" /tmp/wishlist_test_1.txt | cut -d: -f2)
    test_result 0 "Wishlist table exists (${COUNT} records)"
else
    test_result 1 "Wishlist table check failed"
fi

# Check User model has wishlists() relation
php artisan tinker --execute="
\$user = App\Models\User::first();
if (\$user && method_exists(\$user, 'wishlists')) {
    echo 'success:' . \$user->wishlists()->count();
} else {
    echo 'error:no method';
}
" > /tmp/wishlist_test_2.txt

if grep -q "success" /tmp/wishlist_test_2.txt; then
    test_result 0 "User model has wishlists() relation"
else
    test_result 1 "User model missing wishlists() method"
fi

# Check User model has hasInWishlist() helper
php artisan tinker --execute="
\$user = App\Models\User::first();
if (\$user && method_exists(\$user, 'hasInWishlist')) {
    echo 'success';
} else {
    echo 'error';
}
" > /tmp/wishlist_test_3.txt

if grep -q "success" /tmp/wishlist_test_3.txt; then
    test_result 0 "User model has hasInWishlist() helper"
else
    test_result 1 "User model missing hasInWishlist() method"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 2: API Routes Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check routes
php artisan route:list --path=wishlist 2>&1 | grep -q "WishlistController"
test_result $? "Wishlist routes registered"

php artisan route:list --path=wishlist 2>&1 | grep -q "wishlist/check"
test_result $? "Check endpoint exists (GET /api/wishlist/check/{id})"

php artisan route:list --path=wishlist 2>&1 | grep -q "POST.*api/wishlist"
test_result $? "Store endpoint exists (POST /api/wishlist)"

php artisan route:list --path=wishlist 2>&1 | grep -q "DELETE.*api/wishlist"
test_result $? "Delete endpoint exists (DELETE /api/wishlist/{id})"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 3: Controller & Logic Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test CRUD operations
php artisan tinker --execute="
\$user = App\Models\User::first();
\$tour = App\Models\Tour::skip(2)->first();

if (!\$user || !\$tour) {
    echo 'error:no data';
    exit;
}

// Clear test data
App\Models\Wishlist::where('user_id', \$user->id)
    ->where('tour_id', \$tour->id)
    ->delete();

// Test 1: Create wishlist
try {
    \$wishlist = App\Models\Wishlist::create([
        'user_id' => \$user->id,
        'tour_id' => \$tour->id
    ]);
    echo 'create:success:' . \$wishlist->id . PHP_EOL;
} catch (Exception \$e) {
    echo 'create:error:' . \$e->getMessage() . PHP_EOL;
}

// Test 2: Check if in wishlist
\$inWishlist = \$user->hasInWishlist(\$tour->id);
echo 'check:' . (\$inWishlist ? 'success' : 'error') . PHP_EOL;

// Test 3: Get wishlist count
\$count = \$user->wishlists()->count();
echo 'count:' . \$count . PHP_EOL;

// Test 4: Delete wishlist
\$deleted = App\Models\Wishlist::where('user_id', \$user->id)
    ->where('tour_id', \$tour->id)
    ->delete();
echo 'delete:' . (\$deleted > 0 ? 'success' : 'error') . PHP_EOL;

// Test 5: Verify deleted
\$inWishlist = \$user->hasInWishlist(\$tour->id);
echo 'verify:' . (!\$inWishlist ? 'success' : 'error') . PHP_EOL;
" > /tmp/wishlist_test_4.txt

grep "create:success" /tmp/wishlist_test_4.txt > /dev/null
test_result $? "Create wishlist operation"

grep "check:success" /tmp/wishlist_test_4.txt > /dev/null
test_result $? "Check wishlist status (hasInWishlist)"

grep "delete:success" /tmp/wishlist_test_4.txt > /dev/null
test_result $? "Delete wishlist operation"

grep "verify:success" /tmp/wishlist_test_4.txt > /dev/null
test_result $? "Verify deletion"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 4: Authentication Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if Sanctum is installed
php artisan tinker --execute="
if (class_exists('Laravel\Sanctum\Sanctum')) {
    echo 'success';
} else {
    echo 'error';
}
" > /tmp/wishlist_test_5.txt

if grep -q "success" /tmp/wishlist_test_5.txt; then
    test_result 0 "Laravel Sanctum installed"
else
    test_result 1 "Laravel Sanctum not installed"
fi

# Generate test token
php artisan tinker --execute="
\$user = App\Models\User::first();
if (\$user) {
    \$token = \$user->createToken('debug-test')->plainTextToken;
    echo \$token;
}
" > /tmp/wishlist_test_token.txt

if [ -s /tmp/wishlist_test_token.txt ]; then
    test_result 0 "Can generate Sanctum token"
    TOKEN=$(cat /tmp/wishlist_test_token.txt)
    echo -e "   ${BLUE}Token:${NC} ${TOKEN:0:20}..."
else
    test_result 1 "Cannot generate Sanctum token"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 5: Frontend Files Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if WishlistButton exists
if [ -f "resources/js/components/WishlistButton.jsx" ]; then
    test_result 0 "WishlistButton.jsx exists"
else
    test_result 1 "WishlistButton.jsx not found"
fi

# Check if using AuthContext
if grep -q "useAuth" "resources/js/components/WishlistButton.jsx" 2>/dev/null; then
    test_result 0 "WishlistButton uses AuthContext"
else
    test_result 1 "WishlistButton doesn't use AuthContext"
fi

# Check if api service is imported
if grep -q "import api from" "resources/js/components/WishlistButton.jsx" 2>/dev/null; then
    test_result 0 "WishlistButton imports api service"
else
    test_result 1 "WishlistButton doesn't import api service"
fi

# Check api.js interceptor
if grep -q "auth_token" "resources/js/services/api.js" 2>/dev/null; then
    test_result 0 "API service uses correct token key (auth_token)"
else
    test_result 1 "API service token key issue"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 6: Current Database State"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

php artisan tinker --execute="
echo 'Total Users: ' . App\Models\User::count() . PHP_EOL;
echo 'Total Tours: ' . App\Models\Tour::count() . PHP_EOL;
echo 'Total Wishlists: ' . App\Models\Wishlist::count() . PHP_EOL;
echo PHP_EOL;

if (App\Models\Wishlist::count() > 0) {
    echo 'Current Wishlists:' . PHP_EOL;
    App\Models\Wishlist::with('user', 'tour')->get()->each(function(\$w) {
        echo '  • ' . \$w->user->email . ' → ' . \$w->tour->name . PHP_EOL;
    });
}
"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TOTAL=$((PASS + FAIL))
PERCENT=$((PASS * 100 / TOTAL))

echo ""
if [ $PERCENT -eq 100 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ ALL TESTS PASSED (${PASS}/${TOTAL})            ║${NC}"
    echo -e "${GREEN}║  Backend is working perfectly!         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
elif [ $PERCENT -ge 70 ]; then
    echo -e "${YELLOW}╔════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  ⚠ MOSTLY WORKING (${PASS}/${TOTAL})             ║${NC}"
    echo -e "${YELLOW}║  Some issues need attention            ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════╝${NC}"
else
    echo -e "${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ✗ CRITICAL ISSUES (${PASS}/${TOTAL})            ║${NC}"
    echo -e "${RED}║  Major problems detected               ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 NEXT STEPS FOR DEBUGGING"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $PERCENT -eq 100 ]; then
    echo ""
    echo -e "${GREEN}Backend is working perfectly!${NC}"
    echo ""
    echo "If wishlist still not saving, the issue is in FRONTEND:"
    echo ""
    echo "1. Open Browser Console (F12 → Console tab)"
    echo "2. Login to your application"
    echo "3. Check if you see auth_token in localStorage:"
    echo "   • Type: localStorage.getItem('auth_token')"
    echo "   • Should return: '6|laWi4v7...' (long string)"
    echo ""
    echo "4. Click wishlist button on any tour"
    echo "5. Look for these console logs:"
    echo "   • 'Adding tour to wishlist: X'"
    echo "   • 'Add response: {success: true, ...}'"
    echo ""
    echo "6. Check Network tab (F12 → Network):"
    echo "   • Look for POST request to /api/wishlist"
    echo "   • Check if Authorization header is present"
    echo "   • Look at response (should be 200 or 201)"
    echo ""
    echo "7. If you see 401 error:"
    echo "   • You're not logged in properly"
    echo "   • Clear browser cache and login again"
    echo ""
    echo "8. If you see 422 error:"
    echo "   • tour_id validation failed"
    echo "   • Check console for actual tour_id being sent"
    echo ""
    echo "9. Navigate to /wishlist page"
    echo "   • Tours should appear there"
    echo "   • If empty, check console for API errors"
    echo ""
else
    echo ""
    echo -e "${RED}Found ${FAIL} issue(s) that need fixing:${NC}"
    echo ""
    echo "Run these commands to fix:"
    echo ""
    if [ $FAIL -gt 5 ]; then
        echo "1. Re-run migration:"
        echo "   php artisan migrate:fresh --seed"
        echo ""
        echo "2. Clear all caches:"
        echo "   php artisan config:clear"
        echo "   php artisan route:clear"
        echo "   php artisan cache:clear"
        echo ""
    fi
    echo "3. Check Laravel logs:"
    echo "   tail -f storage/logs/laravel.log"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Cleanup
rm -f /tmp/wishlist_test_*.txt
