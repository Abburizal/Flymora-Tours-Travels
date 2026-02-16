<?php

namespace App\Services;

use App\Models\Tour;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class RecommendationService
{
    /**
     * Get personalized recommendations for a user
     * Based on: browsing history, wishlist, and similar tours
     */
    public function getRecommendedForYou($userId, $limit = 6)
    {
        if (!$userId) {
            return $this->getTrendingTours($limit);
        }

        $cacheKey = "recommendations_user_{$userId}_{$limit}";
        
        return Cache::remember($cacheKey, 600, function () use ($userId, $limit) {
            // Get user's wishlist categories
            $wishlistCategories = Wishlist::where('user_id', $userId)
                ->join('tours', 'wishlists.tour_id', '=', 'tours.id')
                ->pluck('tours.category_id')
                ->unique();

            if ($wishlistCategories->isEmpty()) {
                return $this->getTrendingTours($limit);
            }

            // Get tours from same categories, exclude already in wishlist
            return Tour::whereIn('category_id', $wishlistCategories)
                ->whereNotIn('id', function($query) use ($userId) {
                    $query->select('tour_id')
                        ->from('wishlists')
                        ->where('user_id', $userId);
                })
                ->with(['category', 'media'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderBy('reviews_count', 'desc')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Get tours that customers also viewed
     * Based on collaborative filtering
     */
    public function getCustomersAlsoViewed($tourId, $limit = 6)
    {
        $cacheKey = "also_viewed_tour_{$tourId}_{$limit}";
        
        return Cache::remember($cacheKey, 900, function () use ($tourId, $limit) {
            $tour = Tour::find($tourId);
            if (!$tour) {
                return collect();
            }

            // Get tours from same category with similar price range (±30%)
            $minPrice = $tour->price * 0.7;
            $maxPrice = $tour->price * 1.3;

            return Tour::where('category_id', $tour->category_id)
                ->where('id', '!=', $tourId)
                ->whereBetween('price', [$minPrice, $maxPrice])
                ->with(['category', 'media'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderBy('reviews_count', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Get trending tours
     * Based on views, bookings, and recent activity
     */
    public function getTrendingTours($limit = 6)
    {
        $cacheKey = "trending_tours_{$limit}";
        
        return Cache::remember($cacheKey, 600, function () use ($limit) {
            return Tour::with(['category', 'media'])
                ->withCount([
                    'reviews',
                    'bookings' => function($query) {
                        $query->where('created_at', '>=', now()->subDays(30));
                    }
                ])
                ->withAvg('reviews', 'rating')
                ->orderBy('bookings_count', 'desc')
                ->orderBy('reviews_count', 'desc')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Get similar tours based on category, price, and destination
     */
    public function getSimilarTours($tourId, $limit = 6)
    {
        $cacheKey = "similar_tours_{$tourId}_{$limit}";
        
        return Cache::remember($cacheKey, 900, function () use ($tourId, $limit) {
            $tour = Tour::find($tourId);
            if (!$tour) {
                return collect();
            }

            // Similar = same category OR similar price OR same destination keyword
            $minPrice = $tour->price * 0.8;
            $maxPrice = $tour->price * 1.2;

            return Tour::where('id', '!=', $tourId)
                ->where(function($query) use ($tour, $minPrice, $maxPrice) {
                    $query->where('category_id', $tour->category_id)
                        ->orWhereBetween('price', [$minPrice, $maxPrice])
                        ->orWhere('destination', 'LIKE', '%' . $this->extractKeyword($tour->destination) . '%');
                })
                ->with(['category', 'media'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderByRaw('CASE 
                    WHEN category_id = ? THEN 3
                    WHEN price BETWEEN ? AND ? THEN 2
                    ELSE 1
                END DESC', [$tour->category_id, $minPrice, $maxPrice])
                ->orderBy('reviews_count', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Get complete-the-trip recommendations (upsells)
     * Tours from different categories to create a complete trip
     */
    public function getCompleteYourTrip($tourId, $limit = 4)
    {
        $cacheKey = "complete_trip_{$tourId}_{$limit}";
        
        return Cache::remember($cacheKey, 900, function () use ($tourId, $limit) {
            $tour = Tour::find($tourId);
            if (!$tour) {
                return collect();
            }

            // Get tours from different categories (cross-sell)
            return Tour::where('id', '!=', $tourId)
                ->where('category_id', '!=', $tour->category_id)
                ->with(['category', 'media'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderBy('reviews_avg_rating', 'desc')
                ->orderBy('reviews_count', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Track recommendation click/view for analytics
     */
    public function trackRecommendation($userId, $tourId, $recommendationType, $sourceId = null)
    {
        // Store in analytics table or log for future ML model training
        DB::table('recommendation_clicks')->insert([
            'user_id' => $userId,
            'tour_id' => $tourId,
            'recommendation_type' => $recommendationType, // 'recommended', 'also_viewed', 'trending', 'similar'
            'source_id' => $sourceId, // tour_id that generated the recommendation
            'created_at' => now()
        ]);
    }

    /**
     * Clear recommendation cache for a user
     */
    public function clearUserCache($userId)
    {
        $keys = [
            "recommendations_user_{$userId}_6",
            "recommendations_user_{$userId}_4",
        ];

        foreach ($keys as $key) {
            Cache::forget($key);
        }
    }

    /**
     * Extract main keyword from destination
     */
    private function extractKeyword($destination)
    {
        $keywords = explode(',', $destination);
        return trim($keywords[0] ?? $destination);
    }
}
