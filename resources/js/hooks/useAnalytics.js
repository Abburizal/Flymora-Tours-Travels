import ReactGA from 'react-ga4';

// Initialize GA4 once
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let isInitialized = false;

export const initializeAnalytics = () => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.warn('GA4 Measurement ID not found in environment variables');
        return;
    }
    
    if (!isInitialized) {
        ReactGA.initialize(GA_MEASUREMENT_ID, {
            gaOptions: {
                cookieFlags: 'SameSite=None;Secure',
            },
            gtagOptions: {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
            },
        });
        isInitialized = true;
        console.log('✅ Google Analytics 4 initialized:', GA_MEASUREMENT_ID);
    }
};

export const useAnalytics = () => {
    // Track page views
    const trackPageView = (path, title) => {
        if (!isInitialized) return;
        
        ReactGA.send({
            hitType: 'pageview',
            page: path,
            title: title
        });
    };

    // Track custom events
    const trackEvent = (category, action, label, value) => {
        if (!isInitialized) return;
        
        ReactGA.event({
            category,
            action,
            label,
            value
        });
    };

    // ===== E-COMMERCE EVENTS (GA4 Format) =====
    
    // View item (tour detail page)
    const trackTourView = (tour) => {
        if (!isInitialized) return;
        
        ReactGA.event('view_item', {
            currency: 'IDR',
            value: parseFloat(tour.price || 0),
            items: [{
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown Tour',
                item_category: tour.category?.name || 'Uncategorized',
                item_category2: tour.destination || '',
                price: parseFloat(tour.price || 0),
                quantity: 1,
            }],
        });
        
        // Legacy event for backward compatibility
        trackEvent('Tour', 'View', tour.name, tour.id);
    };
    
    // View item list (tour listing page)
    const trackTourListView = (tours, listName = 'Tour Listing') => {
        if (!isInitialized || !tours || tours.length === 0) return;
        
        ReactGA.event('view_item_list', {
            item_list_name: listName,
            items: tours.slice(0, 10).map((tour, index) => ({
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown',
                item_category: tour.category?.name || 'Uncategorized',
                price: parseFloat(tour.price || 0),
                index: index,
            })),
        });
    };

    // Select item (click on tour card)
    const trackTourSelect = (tour, position = 0) => {
        if (!isInitialized) return;
        
        ReactGA.event('select_item', {
            item_list_name: 'Tour Listing',
            items: [{
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown',
                item_category: tour.category?.name || 'Uncategorized',
                price: parseFloat(tour.price || 0),
                index: position,
            }],
        });
    };

    // Add to wishlist
    const trackWishlistAdd = (tour) => {
        if (!isInitialized) return;
        
        ReactGA.event('add_to_wishlist', {
            currency: 'IDR',
            value: parseFloat(tour.price || 0),
            items: [{
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown',
                item_category: tour.category?.name || 'Uncategorized',
                price: parseFloat(tour.price || 0),
            }],
        });
        
        // Legacy
        trackEvent('Wishlist', 'Add', tour.name, tour.id);
    };

    const trackWishlistRemove = (tour) => {
        if (!isInitialized) return;
        
        ReactGA.event('remove_from_wishlist', {
            currency: 'IDR',
            value: parseFloat(tour.price || 0),
            items: [{
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown',
                price: parseFloat(tour.price || 0),
            }],
        });
        
        // Legacy
        trackEvent('Wishlist', 'Remove', tour.name, tour.id);
    };

    // Begin checkout
    const trackBookingStart = (tour, participants = 1) => {
        if (!isInitialized) return;
        
        const totalPrice = parseFloat(tour.price || 0) * participants;
        
        ReactGA.event('begin_checkout', {
            currency: 'IDR',
            value: totalPrice,
            items: [{
                item_id: tour.id?.toString() || 'unknown',
                item_name: tour.name || 'Unknown',
                item_category: tour.category?.name || 'Uncategorized',
                price: parseFloat(tour.price || 0),
                quantity: participants,
            }],
        });
        
        // Legacy
        trackEvent('Booking', 'Start', tour.name, tour.id);
    };

    // Purchase (booking complete + payment success)
    const trackBookingComplete = (booking) => {
        if (!isInitialized) return;
        
        ReactGA.event('purchase', {
            transaction_id: booking.id?.toString() || 'unknown',
            value: parseFloat(booking.total_price || 0),
            currency: 'IDR',
            tax: 0,
            shipping: 0,
            items: [{
                item_id: booking.tour_id?.toString() || 'unknown',
                item_name: booking.tour?.name || 'Unknown Tour',
                item_category: booking.tour?.category?.name || 'Uncategorized',
                price: parseFloat(booking.total_price || 0),
                quantity: booking.number_of_participants || 1,
            }],
        });
        
        // Legacy
        trackEvent('Booking', 'Complete', `Tour ${booking.tour_id}`, parseFloat(booking.total_price || 0));
    };

    const trackPaymentSuccess = (booking) => {
        if (!isInitialized) return;
        
        // Already tracked in trackBookingComplete, but add custom event
        trackEvent('Payment', 'Success', `Booking ${booking.id}`, parseFloat(booking.total_price || 0));
    };

    const trackPaymentFailure = (bookingId, reason) => {
        if (!isInitialized) return;
        
        trackEvent('Payment', 'Failure', reason, bookingId);
    };

    // ===== OTHER EVENTS =====

    const trackSearch = (query, results = 0) => {
        if (!isInitialized) return;
        
        ReactGA.event('search', {
            search_term: query,
            results: results,
        });
        
        // Legacy
        trackEvent('Search', 'Query', query, results);
    };

    const trackFilter = (filterType, filterValue) => {
        if (!isInitialized) return;
        
        trackEvent('Filter', filterType, filterValue);
    };

    const trackReviewSubmit = (tourId, rating) => {
        if (!isInitialized) return;
        
        trackEvent('Review', 'Submit', `Tour ${tourId}`, rating);
    };

    const trackCompareAdd = (tour) => {
        if (!isInitialized) return;
        
        trackEvent('Compare', 'Add', tour.name, tour.id);
    };

    const trackCompareRemove = (tour) => {
        if (!isInitialized) return;
        
        trackEvent('Compare', 'Remove', tour.name, tour.id);
    };

    const trackSocialShare = (platform, tour) => {
        if (!isInitialized) return;
        
        ReactGA.event('share', {
            method: platform,
            content_type: 'tour',
            item_id: tour.id?.toString() || 'unknown',
        });
        
        // Legacy
        trackEvent('Social', `Share_${platform}`, tour.name, tour.id);
    };
    
    const trackSignUp = (method = 'email') => {
        if (!isInitialized) return;
        
        ReactGA.event('sign_up', {
            method: method,
        });
        
        trackEvent('Auth', 'Sign Up', method);
    };
    
    const trackLogin = (method = 'email') => {
        if (!isInitialized) return;
        
        ReactGA.event('login', {
            method: method,
        });
        
        trackEvent('Auth', 'Login', method);
    };
    
    const trackNewsletterSubscribe = () => {
        if (!isInitialized) return;
        
        trackEvent('Newsletter', 'Subscribe', 'Footer Form');
    };
    
    const trackContactForm = () => {
        if (!isInitialized) return;
        
        trackEvent('Contact', 'Submit', 'Contact Page');
    };
    
    const trackWhatsAppClick = (tourId = null) => {
        if (!isInitialized) return;
        
        trackEvent('WhatsApp', 'Click', tourId ? `Tour ${tourId}` : 'General');
    };
    
    const trackItineraryDownload = (tourId, tourName) => {
        if (!isInitialized) return;
        
        trackEvent('Itinerary', 'Download', tourName, tourId);
    };
    
    // Track recommendation click
    const trackRecommendationClick = (tour, recommendationType, sourceTourId = null) => {
        if (!isInitialized) return;
        
        trackEvent('Recommendation', 'Click', recommendationType, tour.id);
        
        // Also track as select_item if it leads to tour view
        ReactGA.event('select_item', {
            item_list_id: `recommendations_${recommendationType}`,
            item_list_name: `Recommendations - ${recommendationType}`,
            items: [{
                item_id: tour.id.toString(),
                item_name: tour.name,
                item_category: tour.category?.name || 'Unknown',
                price: parseFloat(tour.price),
                quantity: 1,
                source_tour_id: sourceTourId
            }]
        });
    };
    
    // Set user ID (after login)
    const setUserId = (userId) => {
        if (!isInitialized) return;
        
        ReactGA.set({ userId: userId?.toString() });
    };
    
    // Set user properties
    const setUserProperties = (properties) => {
        if (!isInitialized) return;
        
        ReactGA.set(properties);
    };

    return {
        // Page tracking
        trackPageView,
        
        // Generic event
        trackEvent,
        
        // E-commerce (GA4)
        trackTourView,
        trackTourListView,
        trackTourSelect,
        trackWishlistAdd,
        trackWishlistRemove,
        trackBookingStart,
        trackBookingComplete,
        trackPaymentSuccess,
        trackPaymentFailure,
        
        // User actions
        trackSearch,
        trackFilter,
        trackReviewSubmit,
        trackCompareAdd,
        trackCompareRemove,
        trackSocialShare,
        trackSignUp,
        trackLogin,
        trackNewsletterSubscribe,
        trackContactForm,
        trackWhatsAppClick,
        trackItineraryDownload,
        trackRecommendationClick,
        
        // User identification
        setUserId,
        setUserProperties,
    };
};

