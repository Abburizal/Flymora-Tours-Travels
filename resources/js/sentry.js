// resources/js/sentry.js
import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking
 * Only initializes in production or if DSN is configured
 */
export function initSentry() {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    const environment = import.meta.env.MODE;
    const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
    
    // Only initialize if DSN is configured
    if (!dsn) {
        console.log('🔕 Sentry not initialized - No DSN configured');
        return;
    }

    Sentry.init({
        dsn,
        environment,
        release: `flymora-tours@${appVersion}`,
        
        // Performance Monitoring
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
        ],
        
        // Set sample rates based on environment
        tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
        replaysSessionSampleRate: environment === 'production' ? 0.1 : 1.0,
        replaysOnErrorSampleRate: 1.0, // Always capture replays on error
        
        // Filter out sensitive data
        beforeSend(event, hint) {
            // Don't send in development unless forced
            if (environment === 'development' && !import.meta.env.VITE_SENTRY_DEBUG) {
                return null;
            }
            
            // Filter sensitive data from error reports
            if (event.request) {
                delete event.request.cookies;
                
                // Remove tokens from headers
                if (event.request.headers) {
                    delete event.request.headers.Authorization;
                    delete event.request.headers.Cookie;
                }
            }
            
            return event;
        },
        
        // Ignore specific errors
        ignoreErrors: [
            // Browser extensions
            'top.GLOBALS',
            'ChunkLoadError',
            'ResizeObserver loop limit exceeded',
            // Network errors
            'NetworkError',
            'Network request failed',
            // User cancelled actions
            'AbortError',
        ],
    });

    console.log('✅ Sentry initialized:', environment);
}

/**
 * Set user context for error tracking
 */
export function setSentryUser(user) {
    if (!user) {
        Sentry.setUser(null);
        return;
    }
    
    Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.name,
    });
}

/**
 * Clear user context (on logout)
 */
export function clearSentryUser() {
    Sentry.setUser(null);
}

/**
 * Capture custom error with context
 */
export function captureError(error, context = {}) {
    Sentry.captureException(error, {
        extra: context,
    });
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message, data = {}) {
    Sentry.addBreadcrumb({
        message,
        data,
        level: 'info',
    });
}

export default Sentry;
