#!/bin/bash

# WhatsApp Integration - Quick Test Script
# Run this to test the WhatsApp integration

echo "🚀 WhatsApp Integration - Quick Test"
echo "===================================="
echo ""

# Check if .env has WhatsApp number
echo "1️⃣ Checking .env configuration..."
if grep -q "VITE_WHATSAPP_NUMBER" .env; then
    WHATSAPP_NUM=$(grep "VITE_WHATSAPP_NUMBER" .env | cut -d '=' -f2)
    echo "   ✅ WhatsApp Number configured: $WHATSAPP_NUM"
else
    echo "   ⚠️  WhatsApp Number not found in .env"
    echo "   💡 Run: echo 'VITE_WHATSAPP_NUMBER=6282189905173' >> .env"
fi
echo ""

# Check if component exists
echo "2️⃣ Checking WhatsAppButton component..."
if [ -f "resources/js/components/WhatsAppButton.jsx" ]; then
    echo "   ✅ Component exists"
    
    # Check for i18n integration
    if grep -q "useTranslation" resources/js/components/WhatsAppButton.jsx; then
        echo "   ✅ i18n integration found"
    else
        echo "   ⚠️  i18n integration missing"
    fi
    
    # Check for analytics
    if grep -q "useAnalytics" resources/js/components/WhatsAppButton.jsx; then
        echo "   ✅ Analytics tracking found"
    else
        echo "   ⚠️  Analytics tracking missing"
    fi
else
    echo "   ❌ Component not found!"
fi
echo ""

# Check translations
echo "3️⃣ Checking i18n translations..."
if grep -q '"whatsapp"' resources/js/i18n/locales/en.json; then
    echo "   ✅ English translations added"
else
    echo "   ⚠️  English translations missing"
fi

if grep -q '"whatsapp"' resources/js/i18n/locales/id.json; then
    echo "   ✅ Indonesian translations added"
else
    echo "   ⚠️  Indonesian translations missing"
fi
echo ""

# Check TourDetail integration
echo "4️⃣ Checking TourDetail page integration..."
if grep -q "WhatsAppButton" resources/js/pages/TourDetail.jsx; then
    echo "   ✅ WhatsAppButton imported and used"
else
    echo "   ⚠️  WhatsAppButton not integrated in TourDetail"
fi
echo ""

# Check build
echo "5️⃣ Checking build status..."
if [ -d "public/build/assets" ]; then
    ASSET_COUNT=$(ls -1 public/build/assets/*.js 2>/dev/null | wc -l)
    echo "   ✅ Build exists ($ASSET_COUNT JS files)"
else
    echo "   ⚠️  No build found"
    echo "   💡 Run: npm run build"
fi
echo ""

echo "===================================="
echo "✅ WhatsApp Integration Check Complete!"
echo ""
echo "📝 Manual Testing Steps:"
echo ""
echo "1. Start servers:"
echo "   npm run dev"
echo "   php artisan serve (in new terminal)"
echo ""
echo "2. Open browser:"
echo "   http://localhost:8000/tours/1"
echo ""
echo "3. Test inline button:"
echo "   - Should see green 'Tanya via WhatsApp' button"
echo "   - Click → Opens WhatsApp with tour details"
echo ""
echo "4. Test floating button:"
echo "   - Scroll down → Floating button appears (bottom-right)"
echo "   - Hover → Shows tooltip"
echo "   - Click → Opens WhatsApp"
echo ""
echo "5. Test language switch:"
echo "   - Switch to English → Button text changes"
echo "   - Click WhatsApp → Message in English"
echo ""
echo "🎉 Happy Testing!"
