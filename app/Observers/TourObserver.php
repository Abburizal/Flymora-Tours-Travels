<?php

namespace App\Observers;

use App\Models\Tour;
use Illuminate\Support\Facades\Cache;

class TourObserver
{
    /**
     * Handle the Tour "created" event.
     */
    public function created(Tour $tour): void
    {
        $this->clearTourCaches($tour);
    }

    /**
     * Handle the Tour "updated" event.
     */
    public function updated(Tour $tour): void
    {
        $this->clearTourCaches($tour);
    }

    /**
     * Handle the Tour "deleted" event.
     */
    public function deleted(Tour $tour): void
    {
        $this->clearTourCaches($tour);
    }

    /**
     * Handle the Tour "restored" event.
     */
    public function restored(Tour $tour): void
    {
        $this->clearTourCaches($tour);
    }

    /**
     * Handle the Tour "force deleted" event.
     */
    public function forceDeleted(Tour $tour): void
    {
        $this->clearTourCaches($tour);
    }

    /**
     * Clear all tour-related caches when tour changes
     */
    private function clearTourCaches(Tour $tour): void
    {
        // Clear specific tour detail cache
        Cache::forget("tour_{$tour->id}");
        
        // Clear viral tours cache
        Cache::forget('viral_tours');
        
        // Clear tours listing caches
        // Since cache keys are dynamic based on query params, 
        // we need to clear all tours_ prefixed keys
        // For simplicity, we'll use cache tags pattern
        $this->clearTourListingCaches();
    }

    /**
     * Clear all tour listing caches
     * This clears all possible variations of tour listing queries
     */
    private function clearTourListingCaches(): void
    {
        // Clear common cache patterns
        $patterns = [
            'tours_*', // All listing variations
        ];
        
        // For file/database cache drivers, we need to flush all
        // since they don't support pattern matching
        Cache::flush();
        
        // Note: If using Redis/Memcached with tags in future, use:
        // Cache::tags(['tours'])->flush();
    }
}
