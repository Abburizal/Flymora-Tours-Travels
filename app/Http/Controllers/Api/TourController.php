<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Support\Facades\Cache;

class TourController extends Controller
{
    public function index()
    {
        // Build cache key based on request parameters
        $cacheKey = 'tours_' . md5(json_encode(request()->all()));
        
        return Cache::remember($cacheKey, 900, function () {
            $query = Tour::with(['category:id,name,description', 'media'])
                ->select([
                    'id', 'name', 'description', 'price', 'duration', 'destination',
                    'image', 'category_id', 'max_participants', 'start_date', 'end_date',
                    'created_at', 'updated_at', 'booked_participants', 'highlights',
                    'included', 'excluded', 'departure_location', 'available_from',
                    'available_until', 'is_recommended', 'recommendation_order',
                    'discount_percentage', 'promo_end_date', 'promo_label', 'itinerary_url'
                ])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating');

        // Search by name or destination
        if (request()->has('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('destination', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if (request()->has('category_id') && request('category_id') != '') {
            $query->where('category_id', request('category_id'));
        }

        // Filter by price range
        if (request()->has('min_price')) {
            $query->where('price', '>=', request('min_price'));
        }
        if (request()->has('max_price')) {
            $query->where('price', '<=', request('max_price'));
        }

        // Filter by duration
        if (request()->has('duration')) {
            $query->where('duration', request('duration'));
        }

        // Filter by availability (only tours with available seats)
        if (request()->has('available') && request('available') == 'true') {
            $query->whereColumn('booked_participants', '<', 'max_participants');
        }

        // Sort options
        $sortBy = request('sort_by', 'created_at');
        $sortOrder = request('sort_order', 'desc');
        
        switch($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'popularity':
                $query->orderBy('booked_participants', 'desc');
                break;
            case 'date':
                $query->orderBy('start_date', 'asc');
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

            $tours = $query->get()->map(function($tour) {
                // Add full image URL (old field)
                if ($tour->image) {
                    $tour->image_url = asset('storage/' . $tour->image);
                } else {
                    $tour->image_url = null;
                }
                
                // Add media library gallery images (already eager loaded)
                $tour->gallery_images = $tour->media->map(function($media) {
                    return [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                        'name' => $media->file_name,
                    ];
                });
                
                // Use first gallery image as thumbnail if no old image
                if (!$tour->image_url && $tour->gallery_images->count() > 0) {
                    $tour->image_url = $tour->gallery_images->first()['url'];
                }
                
                // Add rating data (already aggregated)
                $tour->average_rating = round($tour->reviews_avg_rating ?? 0, 1);
                $tour->review_count = $tour->reviews_count ?? 0;
                
                // Remove media relation from response
                unset($tour->media, $tour->reviews_avg_rating, $tour->reviews_count);
                
                return $tour;
            });
            
            return $tours;
        });
        
        return response()->json($tours);
    }

    public function show($id)
    {
        $cacheKey = "tour_{$id}";
        
        $tour = Cache::remember($cacheKey, 600, function () use ($id) {
            return Tour::with(['category:id,name,description', 'media'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->findOrFail($id);
        });
        
        // Add full image URL (old field)
        if ($tour->image) {
            $tour->image_url = asset('storage/' . $tour->image);
        } else {
            $tour->image_url = null;
        }
        
        // Add media library gallery images (already eager loaded)
        $tour->gallery_images = $tour->media->map(function($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'name' => $media->file_name,
            ];
        });
        
        // Use first gallery image as thumbnail if no old image
        if (!$tour->image_url && $tour->gallery_images->count() > 0) {
            $tour->image_url = $tour->gallery_images->first()['url'];
        }
        
        // Add rating data (already aggregated)
        $tour->average_rating = round($tour->reviews_avg_rating ?? 0, 1);
        $tour->review_count = $tour->reviews_count ?? 0;
        
        // Remove relations from response
        unset($tour->media, $tour->reviews_avg_rating, $tour->reviews_count);
        
        return response()->json($tour);
    }
}