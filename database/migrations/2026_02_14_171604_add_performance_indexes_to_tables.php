<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tours table indexes
        Schema::table('tours', function (Blueprint $table) {
            $table->index('category_id', 'idx_tours_category_id');
            $table->index('price', 'idx_tours_price');
            $table->index('duration', 'idx_tours_duration');
            $table->index('start_date', 'idx_tours_start_date');
            $table->index(['is_recommended', 'recommendation_order'], 'idx_tours_recommended');
            $table->index('created_at', 'idx_tours_created_at');
            
            // Separate indexes for search fields (fulltext alternative for SQLite)
            $table->index('name', 'idx_tours_name');
            $table->index('destination', 'idx_tours_destination');
        });

        // Bookings table indexes
        Schema::table('bookings', function (Blueprint $table) {
            $table->index('user_id', 'idx_bookings_user_id');
            $table->index('tour_id', 'idx_bookings_tour_id');
            $table->index('status', 'idx_bookings_status');
            $table->index('booking_date', 'idx_bookings_booking_date');
            $table->index('expired_at', 'idx_bookings_expired_at');
            $table->index(['user_id', 'status'], 'idx_bookings_user_status');
            $table->index(['tour_id', 'status'], 'idx_bookings_tour_status');
        });

        // Reviews table indexes
        Schema::table('reviews', function (Blueprint $table) {
            $table->index('tour_id', 'idx_reviews_tour_id');
            $table->index('user_id', 'idx_reviews_user_id');
            $table->index('rating', 'idx_reviews_rating');
            $table->index('created_at', 'idx_reviews_created_at');
        });

        // Wishlists table indexes
        Schema::table('wishlists', function (Blueprint $table) {
            $table->index('user_id', 'idx_wishlists_user_id');
            $table->index('tour_id', 'idx_wishlists_tour_id');
        });

        // Categories table indexes
        Schema::table('categories', function (Blueprint $table) {
            $table->index('name', 'idx_categories_name');
        });
    }

    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropIndex('idx_tours_category_id');
            $table->dropIndex('idx_tours_price');
            $table->dropIndex('idx_tours_duration');
            $table->dropIndex('idx_tours_start_date');
            $table->dropIndex('idx_tours_recommended');
            $table->dropIndex('idx_tours_created_at');
            $table->dropIndex('idx_tours_name');
            $table->dropIndex('idx_tours_destination');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex('idx_bookings_user_id');
            $table->dropIndex('idx_bookings_tour_id');
            $table->dropIndex('idx_bookings_status');
            $table->dropIndex('idx_bookings_booking_date');
            $table->dropIndex('idx_bookings_expired_at');
            $table->dropIndex('idx_bookings_user_status');
            $table->dropIndex('idx_bookings_tour_status');
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex('idx_reviews_tour_id');
            $table->dropIndex('idx_reviews_user_id');
            $table->dropIndex('idx_reviews_rating');
            $table->dropIndex('idx_reviews_created_at');
        });

        Schema::table('wishlists', function (Blueprint $table) {
            $table->dropIndex('idx_wishlists_user_id');
            $table->dropIndex('idx_wishlists_tour_id');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex('idx_categories_name');
        });
    }
};
