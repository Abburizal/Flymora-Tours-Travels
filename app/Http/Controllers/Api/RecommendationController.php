<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RecommendationService;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    protected $recommendationService;

    public function __construct(RecommendationService $recommendationService)
    {
        $this->recommendationService = $recommendationService;
    }

    /**
     * Get personalized recommendations for logged-in user
     */
    public function forYou(Request $request)
    {
        $userId = $request->user()?->id;
        $limit = $request->input('limit', 6);

        $recommendations = $this->recommendationService->getRecommendedForYou($userId, $limit);

        return response()->json([
            'success' => true,
            'data' => $recommendations,
            'type' => 'recommended_for_you'
        ]);
    }

    /**
     * Get "Customers also viewed" recommendations
     */
    public function alsoViewed(Request $request, $tourId)
    {
        $limit = $request->input('limit', 6);

        $recommendations = $this->recommendationService->getCustomersAlsoViewed($tourId, $limit);

        return response()->json([
            'success' => true,
            'data' => $recommendations,
            'type' => 'also_viewed',
            'source_tour_id' => $tourId
        ]);
    }

    /**
     * Get trending tours
     */
    public function trending(Request $request)
    {
        $limit = $request->input('limit', 6);

        $recommendations = $this->recommendationService->getTrendingTours($limit);

        return response()->json([
            'success' => true,
            'data' => $recommendations,
            'type' => 'trending'
        ]);
    }

    /**
     * Get similar tours
     */
    public function similar(Request $request, $tourId)
    {
        $limit = $request->input('limit', 6);

        $recommendations = $this->recommendationService->getSimilarTours($tourId, $limit);

        return response()->json([
            'success' => true,
            'data' => $recommendations,
            'type' => 'similar',
            'source_tour_id' => $tourId
        ]);
    }

    /**
     * Get complete-the-trip recommendations
     */
    public function completeTrip(Request $request, $tourId)
    {
        $limit = $request->input('limit', 4);

        $recommendations = $this->recommendationService->getCompleteYourTrip($tourId, $limit);

        return response()->json([
            'success' => true,
            'data' => $recommendations,
            'type' => 'complete_trip',
            'source_tour_id' => $tourId
        ]);
    }

    /**
     * Track recommendation click
     */
    public function track(Request $request)
    {
        $request->validate([
            'tour_id' => 'required|exists:tours,id',
            'recommendation_type' => 'required|string',
            'source_id' => 'nullable|integer'
        ]);

        $userId = $request->user()?->id;

        $this->recommendationService->trackRecommendation(
            $userId,
            $request->tour_id,
            $request->recommendation_type,
            $request->source_id
        );

        return response()->json([
            'success' => true,
            'message' => 'Recommendation tracked'
        ]);
    }
}
