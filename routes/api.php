<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TourController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\MidtransCallbackController;
use App\Http\Controllers\Api\PaymentSimulatorController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ItineraryController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\BookingCancellationController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\Api\HealthCheckController;

// Health check endpoints (no rate limiting)
Route::get('/health', [HealthCheckController::class, 'index']);
Route::get('/ping', [HealthCheckController::class, 'ping']);

// Public routes
Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);
Route::get('/tours/{id}/itinerary/download', [ItineraryController::class, 'download']);
Route::get('/categories', [CategoryController::class, 'index']);

// Public reviews (no auth required to view)
Route::get('/tours/{tour}/reviews', [ReviewController::class, 'index']);

// Contact form submission
Route::post('/contact', [ContactController::class, 'submit']);

// Newsletter subscription routes (Public)
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe']);
Route::post('/newsletter/check-status', [NewsletterController::class, 'checkStatus']);

// Recommendation routes (Public - accessible to all)
Route::get('/recommendations/trending', [App\Http\Controllers\Api\RecommendationController::class, 'trending']);
Route::get('/recommendations/also-viewed/{tourId}', [App\Http\Controllers\Api\RecommendationController::class, 'alsoViewed']);
Route::get('/recommendations/similar/{tourId}', [App\Http\Controllers\Api\RecommendationController::class, 'similar']);
Route::get('/recommendations/complete-trip/{tourId}', [App\Http\Controllers\Api\RecommendationController::class, 'completeTrip']);

// Authentication routes (Public) - Rate limited
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
});

// Midtrans callback - NO AUTH REQUIRED
Route::post('/midtrans/callback', [MidtransCallbackController::class, 'handle'])->withoutMiddleware('api');

// Payment Simulator (Development Only) - NO AUTH REQUIRED
Route::get('/payment-simulator/{snapToken}', [PaymentSimulatorController::class, 'show']);
Route::post('/payment-simulator/complete', [PaymentSimulatorController::class, 'complete']);

// Protected routes - Requires Authentication
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken']);

    // Booking routes - Rate limited (10 per hour)
    Route::middleware('throttle:10,60')->group(function () {
        Route::post('/bookings', [BookingController::class, 'store']);
    });
    
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings/{id}/cancel', [BookingCancellationController::class, 'cancel']);

    // Payment routes
    Route::post('/payments/{booking}', [PaymentController::class, 'create']);
    Route::post('/payments', [PaymentController::class, 'pay']);

    // Review routes - Rate limited (5 per hour)
    Route::middleware('throttle:5,60')->group(function () {
        Route::post('/reviews', [ReviewController::class, 'store']);
    });
    
    Route::get('/bookings/{booking}/can-review', [ReviewController::class, 'canReview']);

    // Wishlist routes
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{tourId}', [WishlistController::class, 'destroy']);
    Route::get('/wishlist/check/{tourId}', [WishlistController::class, 'check']);
    
    // Personalized recommendation (requires auth)
    Route::get('/recommendations/for-you', [App\Http\Controllers\Api\RecommendationController::class, 'forYou']);
    Route::post('/recommendations/track', [App\Http\Controllers\Api\RecommendationController::class, 'track']);
    
    // Analytics routes (admin only - add middleware in future)
    Route::get('/analytics/popular-tours', [AnalyticsController::class, 'popularTours']);
    Route::get('/analytics/conversion-rates', [AnalyticsController::class, 'conversionRates']);
    Route::get('/analytics/revenue-stats', [AnalyticsController::class, 'revenueStats']);
    Route::get('/analytics/booking-trends', [AnalyticsController::class, 'bookingTrends']);
    Route::get('/analytics/user-engagement', [AnalyticsController::class, 'userEngagement']);
    Route::get('/analytics/dashboard-overview', [AnalyticsController::class, 'dashboardOverview']);
});
