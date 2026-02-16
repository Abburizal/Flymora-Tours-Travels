<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Tour;
use App\Models\Category;
use App\Observers\TourObserver;
use App\Observers\CategoryObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register observers for cache invalidation
        Tour::observe(TourObserver::class);
        Category::observe(CategoryObserver::class);
    }
}
