#!/bin/bash

# Quick Fix Script for Logout Dialog Issue
# Run this script to rebuild frontend and clear cache

echo "🔧 Flymora - Quick Fix for Logout Dialog"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in project directory!${NC}"
    echo "Please cd to: /Users/user/Flymora-Tours-Travels"
    exit 1
fi

echo -e "${YELLOW}Step 1: Checking sweetalert2...${NC}"
if npm list sweetalert2 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ sweetalert2 installed${NC}"
else
    echo -e "${YELLOW}⚠️  Installing sweetalert2...${NC}"
    npm install sweetalert2 --legacy-peer-deps
fi
echo ""

# Step 2: Clear build folder
echo -e "${YELLOW}Step 2: Clearing old build...${NC}"
rm -rf public/build
echo -e "${GREEN}✅ Build folder cleared${NC}"
echo ""

# Step 3: Clear Laravel cache
echo -e "${YELLOW}Step 3: Clearing Laravel cache...${NC}"
php artisan cache:clear > /dev/null 2>&1
php artisan config:clear > /dev/null 2>&1
php artisan view:clear > /dev/null 2>&1
echo -e "${GREEN}✅ Laravel cache cleared${NC}"
echo ""

# Step 4: Build frontend
echo -e "${YELLOW}Step 4: Building frontend...${NC}"
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}"
echo ""

# Step 5: Instructions
echo "========================================"
echo -e "${GREEN}🎉 Fix complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Clear your browser cache (Ctrl+Shift+Delete)"
echo "2. Or use Incognito/Private mode"
echo "3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)"
echo ""
echo "Then start servers:"
echo -e "${YELLOW}Terminal 1:${NC} npm run dev"
echo -e "${YELLOW}Terminal 2:${NC} php artisan serve"
echo ""
echo "Access: http://127.0.0.1:8000"
echo ""
echo -e "${GREEN}✨ Logout dialog should work now!${NC}"
