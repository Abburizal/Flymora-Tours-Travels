<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For SQLite, we need to recreate the table with cascade
        // First backup the data
        Schema::rename('bookings', 'bookings_old');
        
        // Create new table with cascade
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tour_id')->constrained()->cascadeOnDelete();
            $table->dateTime('booking_date');
            $table->integer('number_of_participants');
            $table->decimal('total_price', 12, 2);
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->enum('paid_status', ['unpaid', 'partially_paid', 'paid'])->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('tour_id');
            $table->index('status');
            $table->index('booking_date');
            $table->index('expired_at');
            $table->index(['user_id', 'status']);
            $table->index(['tour_id', 'status']);
        });
        
        // Copy data back (map columns explicitly and fix status values)
        \DB::statement('INSERT INTO bookings (id, user_id, tour_id, booking_date, number_of_participants, total_price, status, notes, created_at, updated_at, expired_at, paid_status) 
                       SELECT id, user_id, tour_id, booking_date, number_of_participants, total_price, 
                              CASE WHEN status = "paid" THEN "confirmed" ELSE status END,
                              notes, created_at, updated_at, expired_at, 
                              CASE WHEN status = "paid" THEN "paid" ELSE "unpaid" END 
                       FROM bookings_old');
        
        // Drop old table
        Schema::dropIfExists('bookings_old');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse: remove cascade
        Schema::rename('bookings', 'bookings_cascade');
        
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('tour_id')->constrained();
            $table->dateTime('booking_date');
            $table->integer('number_of_participants');
            $table->decimal('total_price', 12, 2);
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->enum('paid_status', ['unpaid', 'partially_paid', 'paid'])->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
        
        \DB::statement('INSERT INTO bookings SELECT * FROM bookings_cascade');
        Schema::dropIfExists('bookings_cascade');
    }
};
