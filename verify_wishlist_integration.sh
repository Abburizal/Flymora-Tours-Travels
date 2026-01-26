#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🔧 WISHLIST INTEGRATION VERIFICATION & FIX               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ISSUES=0

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 1: Verify Backend Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check User model
if grep -q "public function wishlists()" app/Models/User.php 2>/dev/null; then
    echo -e "${GREEN}✓${NC} User model has wishlists() method"
else
    echo -e "${RED}✗${NC} User model missing wishlists() method"
    ((ISSUES++))
fi

if grep -q "public function hasInWishlist" app/Models/User.php 2>/dev/null; then
    echo -e "${GREEN}✓${NC} User model has hasInWishlist() method"
else
    echo -e "${RED}✗${NC} User model missing hasInWishlist() method"
    ((ISSUES++))
fi

# Check Wishlist model
if [ -f "app/Models/Wishlist.php" ]; then
    echo -e "${GREEN}✓${NC} Wishlist model exists"
    if grep -q "protected \$fillable" app/Models/Wishlist.php; then
        echo -e "${GREEN}✓${NC} Wishlist model has fillable fields"
    else
        echo -e "${RED}✗${NC} Wishlist model missing fillable"
        ((ISSUES++))
    fi
else
    echo -e "${RED}✗${NC} Wishlist model missing"
    ((ISSUES++))
fi

# Check WishlistController
if [ -f "app/Http/Controllers/Api/WishlistController.php" ]; then
    echo -e "${GREEN}✓${NC} WishlistController exists"
else
    echo -e "${RED}✗${NC} WishlistController missing"
    ((ISSUES++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 2: Verify API Routes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if grep -q "WishlistController" routes/api.php 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Wishlist routes registered in api.php"
    
    # Count routes
    ROUTE_COUNT=$(grep -c "wishlist" routes/api.php 2>/dev/null || echo "0")
    echo -e "  ${BLUE}ℹ${NC} Found ${ROUTE_COUNT} wishlist route entries"
else
    echo -e "${RED}✗${NC} Wishlist routes not registered"
    ((ISSUES++))
fi

# Test route registration
php artisan route:list --path=wishlist 2>&1 | grep -q "wishlist"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Routes properly registered (verified with artisan)"
else
    echo -e "${RED}✗${NC} Routes not registered properly"
    ((ISSUES++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 3: Verify Frontend Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check AuthContext
if [ -f "resources/js/context/AuthContext.jsx" ]; then
    echo -e "${GREEN}✓${NC} AuthContext exists"
    
    if grep -q "export const AuthProvider" resources/js/context/AuthContext.jsx; then
        echo -e "${GREEN}✓${NC} AuthProvider exported"
    else
        echo -e "${RED}✗${NC} AuthProvider not exported"
        ((ISSUES++))
    fi
    
    if grep -q "export const useAuth" resources/js/context/AuthContext.jsx; then
        echo -e "${GREEN}✓${NC} useAuth hook exported"
    else
        echo -e "${RED}✗${NC} useAuth hook not exported"
        ((ISSUES++))
    fi
else
    echo -e "${RED}✗${NC} AuthContext missing"
    ((ISSUES++))
fi

# Check api.js
if [ -f "resources/js/services/api.js" ]; then
    echo -e "${GREEN}✓${NC} API service exists"
    
    if grep -q "auth_token" resources/js/services/api.js; then
        echo -e "${GREEN}✓${NC} API service uses 'auth_token' key"
    else
        echo -e "${YELLOW}⚠${NC} API service may use wrong token key"
    fi
    
    if grep -q "interceptors.request" resources/js/services/api.js; then
        echo -e "${GREEN}✓${NC} Request interceptor configured"
    else
        echo -e "${RED}✗${NC} Request interceptor missing"
        ((ISSUES++))
    fi
else
    echo -e "${RED}✗${NC} API service missing"
    ((ISSUES++))
fi

# Check WishlistButton
if [ -f "resources/js/components/WishlistButton.jsx" ]; then
    echo -e "${GREEN}✓${NC} WishlistButton component exists"
    
    if grep -q "useAuth" resources/js/components/WishlistButton.jsx; then
        echo -e "${GREEN}✓${NC} WishlistButton uses useAuth"
    else
        echo -e "${RED}✗${NC} WishlistButton not using useAuth"
        ((ISSUES++))
    fi
    
    if grep -q "import api from" resources/js/components/WishlistButton.jsx; then
        echo -e "${GREEN}✓${NC} WishlistButton imports api service"
    else
        echo -e "${RED}✗${NC} WishlistButton not importing api"
        ((ISSUES++))
    fi
else
    echo -e "${RED}✗${NC} WishlistButton component missing"
    ((ISSUES++))
fi

# Check Wishlist page
if [ -f "resources/js/pages/Wishlist.jsx" ]; then
    echo -e "${GREEN}✓${NC} Wishlist page exists"
else
    echo -e "${RED}✗${NC} Wishlist page missing"
    ((ISSUES++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 4: Verify Integration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check main.jsx wrapping
if grep -q "AuthProvider" resources/js/main.jsx; then
    echo -e "${GREEN}✓${NC} AuthProvider wrapped in main.jsx"
else
    echo -e "${RED}✗${NC} AuthProvider not in main.jsx"
    ((ISSUES++))
fi

# Check WishlistButton usage
if grep -q "WishlistButton" resources/js/pages/Tours.jsx; then
    echo -e "${GREEN}✓${NC} WishlistButton used in Tours.jsx"
else
    echo -e "${YELLOW}⚠${NC} WishlistButton not in Tours.jsx"
fi

if grep -q "WishlistButton" resources/js/pages/TourDetail.jsx; then
    echo -e "${GREEN}✓${NC} WishlistButton used in TourDetail.jsx"
else
    echo -e "${YELLOW}⚠${NC} WishlistButton not in TourDetail.jsx"
fi

# Check route configuration
if grep -q "path.*wishlist" resources/js/app.jsx 2>/dev/null || \
   grep -q "path=.*wishlist" resources/js/app.jsx 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Wishlist route configured in app.jsx"
else
    echo -e "${RED}✗${NC} Wishlist route not configured"
    ((ISSUES++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 5: Database & Backend Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

php artisan tinker --execute="
\$errors = 0;

// Test User methods
\$user = App\Models\User::first();
if (!\$user) {
    echo '✗ No users in database' . PHP_EOL;
    \$errors++;
} else {
    if (method_exists(\$user, 'wishlists')) {
        echo '✓ User->wishlists() method exists' . PHP_EOL;
    } else {
        echo '✗ User->wishlists() missing' . PHP_EOL;
        \$errors++;
    }
    
    if (method_exists(\$user, 'hasInWishlist')) {
        echo '✓ User->hasInWishlist() method exists' . PHP_EOL;
    } else {
        echo '✗ User->hasInWishlist() missing' . PHP_EOL;
        \$errors++;
    }
}

// Test Wishlist model
try {
    \$count = App\Models\Wishlist::count();
    echo '✓ Wishlist model working (count: ' . \$count . ')' . PHP_EOL;
} catch (Exception \$e) {
    echo '✗ Wishlist model ERROR: ' . \$e->getMessage() . PHP_EOL;
    \$errors++;
}

// Test Controller
\$controller = 'App\Http\Controllers\Api\WishlistController';
if (class_exists(\$controller)) {
    echo '✓ WishlistController class exists' . PHP_EOL;
    \$methods = ['index', 'store', 'destroy', 'check'];
    foreach (\$methods as \$method) {
        if (method_exists(\$controller, \$method)) {
            echo '  ✓ ' . \$method . '() exists' . PHP_EOL;
        } else {
            echo '  ✗ ' . \$method . '() missing' . PHP_EOL;
            \$errors++;
        }
    }
} else {
    echo '✗ WishlistController NOT FOUND' . PHP_EOL;
    \$errors++;
}

if (\$errors > 0) {
    exit(1);
}
"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend test passed"
else
    echo -e "${RED}✗${NC} Backend test failed"
    ((ISSUES++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 6: Build Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "public/build/manifest.json" ]; then
    echo -e "${GREEN}✓${NC} Frontend built"
    
    # Check if recent
    AGE=$(( $(date +%s) - $(stat -f %m public/build/manifest.json 2>/dev/null || stat -c %Y public/build/manifest.json 2>/dev/null) ))
    if [ $AGE -gt 3600 ]; then
        echo -e "${YELLOW}⚠${NC} Build is older than 1 hour - consider rebuilding"
    else
        echo -e "${BLUE}ℹ${NC} Build is recent (${AGE} seconds old)"
    fi
else
    echo -e "${YELLOW}⚠${NC} Frontend not built - run: npm run build"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 VERIFICATION SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ ALL CHECKS PASSED!                  ║${NC}"
    echo -e "${GREEN}║  Wishlist fully integrated             ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo "Your wishlist system is properly integrated!"
    echo ""
    echo "If wishlist still not saving, issue is in browser:"
    echo "1. Open browser console (F12)"
    echo "2. Check: localStorage.getItem('auth_token')"
    echo "3. Click wishlist button"
    echo "4. Watch for console logs"
    echo "5. Check Network tab for API calls"
    echo ""
    echo "Run for detailed frontend debug:"
    echo "  cat WISHLIST_FRONTEND_DEBUG.md"
else
    echo -e "${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ✗ FOUND ${ISSUES} ISSUE(S)                    ║${NC}"
    echo -e "${RED}║  Integration incomplete                ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo "Please fix the issues above and run again."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $ISSUES
