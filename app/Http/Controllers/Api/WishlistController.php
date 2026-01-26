<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Get user's wishlist
     */
    public function index()
    {
        $user = Auth::user();
        
        // Debug logging
        \Log::info('📋 Wishlist Index Called', [
            'user_id' => $user->id,
            'user_email' => $user->email,
        ]);
        
        $wishlists = $user->wishlists()
            ->with('tour.category')
            ->latest()
            ->get();
        
        \Log::info('✅ Wishlist Retrieved', [
            'count' => $wishlists->count(),
            'wishlist_ids' => $wishlists->pluck('id')->toArray(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $wishlists
        ]);
    }

    /**
     * Add tour to wishlist
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        // Debug logging
        \Log::info('💖 Adding to Wishlist', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'tour_id' => $request->tour_id,
        ]);
        
        $request->validate([
            'tour_id' => 'required|exists:tours,id'
        ]);

        // Check if already in wishlist
        $exists = $user->hasInWishlist($request->tour_id);
        
        if ($exists) {
            \Log::warning('⚠️ Tour already in wishlist', [
                'user_id' => $user->id,
                'tour_id' => $request->tour_id,
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Tour already in wishlist'
            ], 400);
        }

        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'tour_id' => $request->tour_id
        ]);

        $wishlist->load('tour.category');
        
        \Log::info('✅ Wishlist Created', [
            'wishlist_id' => $wishlist->id,
            'user_id' => $user->id,
            'tour_id' => $request->tour_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tour added to wishlist',
            'data' => $wishlist
        ], 201);
    }

    /**
     * Remove tour from wishlist
     */
    public function destroy($tourId)
    {
        $wishlist = Auth::user()->wishlists()
            ->where('tour_id', $tourId)
            ->first();

        if (!$wishlist) {
            return response()->json([
                'success' => false,
                'message' => 'Tour not found in wishlist'
            ], 404);
        }

        $wishlist->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tour removed from wishlist'
        ]);
    }

    /**
     * Check if tour is in wishlist
     */
    public function check($tourId)
    {
        $inWishlist = Auth::user()->hasInWishlist($tourId);

        return response()->json([
            'success' => true,
            'in_wishlist' => $inWishlist
        ]);
    }
}
