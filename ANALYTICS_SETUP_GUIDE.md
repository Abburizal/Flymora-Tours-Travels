# 📊 Analytics Setup & Implementation Guide

## Overview
Comprehensive Google Analytics 4 (GA4) integration with e-commerce tracking, user behavior analytics, and conversion tracking.

---

## 🎯 What's Implemented

### Google Analytics 4 Features
✅ **Page View Tracking** - Automatic on route changes  
✅ **E-commerce Tracking** - GA4 recommended events  
✅ **Custom Events** - User interactions & conversions  
✅ **User Identification** - Post-login tracking  
✅ **Privacy Compliance** - IP anonymization, cookie flags  

---

## 🚀 Setup Instructions

### Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property details:
   - Property name: "Flymora Tours"
   - Reporting time zone: "Asia/Jakarta"
   - Currency: "Indonesian Rupiah (IDR)"
5. Click **Next** → Select industry category
6. Click **Create** → Accept Terms of Service
7. Choose **Web** platform
8. Set up data stream:
   - Website URL: `https://yourdomain.com`
   - Stream name: "Flymora Website"
9. Click **Create stream**
10. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Configure Application

**Add to `.env`:**
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Add to `.env.production.example`:**
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # From Google Analytics Dashboard
```

### Step 3: Rebuild Frontend
```bash
npm run build
```

### Step 4: Verify Installation

1. Open website in browser
2. Open browser Console (F12)
3. Look for: `✅ Google Analytics 4 initialized: G-XXXXXXXXXX`
4. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) extension
5. Enable debugger and navigate site
6. Check GA4 Real-Time reports

---

## 📈 Tracked Events

### E-commerce Events (GA4 Standard)

| Event | Trigger | Data Sent |
|-------|---------|-----------|
| `view_item_list` | Tour listing page loads | Tours array (max 10) |
| `select_item` | Click on tour card | Tour details + position |
| `view_item` | Tour detail page loads | Full tour details |
| `add_to_wishlist` | Add to wishlist | Tour details + price |
| `remove_from_wishlist` | Remove from wishlist | Tour details |
| `begin_checkout` | Click "Book Now" | Tour + participants + total |
| `purchase` | Payment successful | Booking details + revenue |

### Custom Events

| Category | Action | Label | Value |
|----------|--------|-------|-------|
| **Search** | Query | Search term | Results count |
| **Filter** | [Filter Type] | Filter value | - |
| **Review** | Submit | Tour ID | Rating (1-5) |
| **Compare** | Add/Remove | Tour name | Tour ID |
| **Social** | Share_[Platform] | Tour name | Tour ID |
| **Auth** | Sign Up/Login | Method | - |
| **Newsletter** | Subscribe | Form location | - |
| **Contact** | Submit | Contact Page | - |
| **WhatsApp** | Click | Tour ID | - |
| **Itinerary** | Download | Tour name | Tour ID |
| **Wishlist** | Add/Remove | Tour name | Tour ID |
| **Payment** | Success/Failure | Booking ID | Amount |

---

## 🔧 Implementation Details

### Analytics Hook Usage

```javascript
import { useAnalytics } from '../hooks/useAnalytics';

function MyComponent() {
    const {
        trackTourView,
        trackBookingStart,
        trackPurchase,
        // ... other methods
    } = useAnalytics();

    // Example: Track tour view
    const viewTour = (tour) => {
        trackTourView(tour);
    };

    // Example: Track booking start
    const startBooking = (tour, participants) => {
        trackBookingStart(tour, participants);
    };
}
```

### E-commerce Data Format

All e-commerce events follow GA4 item schema:
```javascript
{
    item_id: "123",                    // Required: Tour ID
    item_name: "Bali Adventure Tour",  // Required: Tour name
    item_category: "Indonesia",        // Category name
    item_category2: "Bali",           // Destination
    price: 2500000,                    // Price in IDR
    quantity: 2,                       // Number of participants
    index: 0,                          // Position in list
}
```

---

## 📊 Available Analytics Methods

### Page Tracking
```javascript
trackPageView(path, title)
```

### E-commerce (GA4 Format)
```javascript
trackTourView(tour)                    // View item
trackTourListView(tours, listName)     // View item list
trackTourSelect(tour, position)        // Select item
trackWishlistAdd(tour)                 // Add to wishlist
trackWishlistRemove(tour)              // Remove from wishlist
trackBookingStart(tour, participants)  // Begin checkout
trackBookingComplete(booking)          // Purchase
trackPaymentSuccess(booking)           // Payment confirmation
trackPaymentFailure(bookingId, reason) // Payment failure
```

### User Actions
```javascript
trackSearch(query, results)
trackFilter(filterType, filterValue)
trackReviewSubmit(tourId, rating)
trackCompareAdd(tour)
trackCompareRemove(tour)
trackSocialShare(platform, tour)
trackSignUp(method)
trackLogin(method)
trackNewsletterSubscribe()
trackContactForm()
trackWhatsAppClick(tourId)
trackItineraryDownload(tourId, tourName)
```

### User Identification
```javascript
setUserId(userId)              // Set after login
setUserProperties(properties)  // Custom user properties
```

---

## 🎯 Conversion Goals Setup

### In Google Analytics 4:

1. Go to **Admin** → **Events**
2. Click **Create event** or **Mark as conversion**
3. Mark these events as conversions:
   - `purchase` ✅ (Primary conversion)
   - `begin_checkout` ✅
   - `add_to_wishlist` ✅
   - `sign_up` ✅
   - `Newsletter Subscribe` (custom event)

---

## 📈 Key Metrics to Monitor

### E-commerce Metrics
- Total Revenue
- Average Order Value
- Conversion Rate (purchase / view_item)
- Cart Abandonment (begin_checkout / purchase)
- Product Performance (view_item by item_name)

### User Behavior
- Page Views
- Session Duration
- Bounce Rate
- Top Landing Pages
- User Flow

### Marketing
- Traffic Sources
- Campaign Performance
- Social Media Referrals
- Search Keywords (organic)

### Engagement
- Wishlist Additions
- Tour Comparisons
- Social Shares
- Review Submissions
- Newsletter Signups

---

## 🔍 GA4 Reports to Create

### Custom Explorations

**1. Booking Funnel:**
```
Event sequence:
1. view_item (Tour Detail)
2. begin_checkout (Book Now)
3. purchase (Payment Success)

Analyze drop-off at each stage
```

**2. Tour Performance:**
```
Dimensions: item_name
Metrics: view_item count, add_to_wishlist count, purchase count
Calculated: Conversion rate per tour
```

**3. User Journey:**
```
Path exploration:
- Landing page → Tour listing → Tour detail → Booking → Purchase
- Identify common paths and drop-off points
```

**4. Revenue Analysis:**
```
Dimensions: item_category, item_name
Metrics: purchase_revenue, purchase count
Breakdown by: Date, Source/Medium, Device
```

---

## 🛡️ Privacy & Compliance

### GDPR Compliance
✅ IP Anonymization enabled  
✅ Cookie consent respected  
✅ Secure cookie flags set  
✅ Data retention configured (default: 2 months)  

### Cookie Banner (Recommended)
Consider adding cookie consent banner:
- Ask user permission before tracking
- Allow opt-out
- Provide privacy policy link

Example implementation:
```javascript
// Only initialize GA after consent
if (cookieConsent) {
    initializeAnalytics();
}
```

---

## 📱 Enhanced Measurements (Auto-tracked by GA4)

GA4 automatically tracks (if enabled):
- Scrolls (90% depth)
- Outbound clicks
- Site search (if configured)
- Video engagement
- File downloads

### Enable in GA4:
1. Go to **Admin** → **Data Streams**
2. Click your web stream
3. Click **Enhanced measurement**
4. Toggle on/off desired features

---

## 🧪 Testing Your Implementation

### Method 1: Real-Time Reports
1. Open GA4 → **Reports** → **Realtime**
2. Navigate your site
3. See events appear in real-time
4. Check event parameters

### Method 2: GA Debugger Extension
1. Install [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
2. Enable extension
3. Open browser Console
4. See detailed event logs

### Method 3: Google Tag Assistant
1. Install [Tag Assistant](https://tagassistant.google.com/)
2. Connect to your site
3. Test all tracked events
4. Validate implementation

### Method 4: Check Console Logs
```javascript
// Development mode shows logs
console.log('✅ Google Analytics 4 initialized: G-XXXXXXXXXX')
// Events logged when fired
```

---

## 📊 Dashboard Widgets (Optional)

Add custom dashboard in GA4:
1. **Revenue by Tour Category**
2. **Top Performing Tours**
3. **Conversion Funnel**
4. **User Acquisition**
5. **Traffic Sources**
6. **Device Performance**
7. **Geographic Distribution**
8. **Real-time Active Users**

---

## 🔗 Integration with Marketing Tools

### Google Ads
- Link GA4 with Google Ads account
- Create remarketing audiences
- Track conversion value
- Optimize campaigns based on GA4 data

### Facebook Pixel (Separate Implementation)
- Consider adding Facebook Pixel for Meta ads
- Sync conversion events
- Create custom audiences

### Search Console
- Link GA4 with Google Search Console
- See search queries driving traffic
- Monitor SEO performance

---

## 🚨 Troubleshooting

### Analytics Not Working?

**Check 1: Environment Variable**
```bash
grep VITE_GA .env
# Should show: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Check 2: Rebuild Required**
```bash
npm run build
# Vite needs rebuild to include new env vars
```

**Check 3: Browser Console**
```javascript
// Look for initialization message
✅ Google Analytics 4 initialized: G-XXXXXXXXXX
```

**Check 4: Ad Blockers**
- Disable ad blockers
- Try incognito mode
- Test with GA Debugger

**Check 5: GA4 Configuration**
- Verify Measurement ID is correct
- Check data stream is active
- Wait 24-48 hours for data to appear in reports

### Events Not Firing?

**Debug Mode:**
```javascript
// Add to useAnalytics.js for debugging
console.log('Event fired:', eventName, parameters);
```

**Check Network Tab:**
- Open DevTools → Network
- Filter: "google-analytics.com" or "gtag"
- See if requests are being sent

---

## 📚 Resources

**Official Documentation:**
- [GA4 Documentation](https://support.google.com/analytics/answer/9306384)
- [GA4 E-commerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [React GA4 Library](https://github.com/PriceRunner/react-ga4)

**Best Practices:**
- [GA4 Implementation Guide](https://support.google.com/analytics/answer/9304153)
- [E-commerce Tracking Best Practices](https://support.google.com/analytics/answer/9267735)

---

## ✅ Implementation Checklist

**Setup:**
- [ ] Google Analytics 4 property created
- [ ] Measurement ID obtained
- [ ] `.env` configured with `VITE_GA_MEASUREMENT_ID`
- [ ] Frontend rebuilt (`npm run build`)

**Verification:**
- [ ] Console shows GA initialized
- [ ] Real-time reports showing data
- [ ] Page views tracked
- [ ] E-commerce events firing
- [ ] Custom events working

**Configuration:**
- [ ] Conversions marked in GA4
- [ ] Enhanced measurements enabled
- [ ] Data retention configured
- [ ] Privacy settings reviewed

**Monitoring:**
- [ ] Custom dashboard created
- [ ] Key metrics tracked
- [ ] Conversion funnel analyzed
- [ ] Weekly reports scheduled

---

## 🎯 Success Metrics

**Track these KPIs:**
- Conversion Rate: >2% (industry avg: 1-3%)
- Average Order Value: Monitor trend
- Cart Abandonment: <70%
- Bounce Rate: <60%
- Session Duration: >2 minutes
- Pages per Session: >3

---

## 📝 Next Steps

1. **Week 1:** Monitor real-time data, verify all events
2. **Week 2:** Analyze user behavior, identify drop-offs
3. **Week 3:** Create custom reports and dashboards
4. **Month 1:** Set up conversion goals and funnels
5. **Month 2:** Optimize based on insights
6. **Ongoing:** Regular monitoring and A/B testing

---

**Last Updated:** February 14, 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready

🎉 **Analytics setup complete!** Start collecting valuable insights about your users.
