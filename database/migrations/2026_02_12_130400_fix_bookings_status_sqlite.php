<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For SQLite, we need to recreate the table to add 'paid' to the check constraint
        if (DB::getDriverName() === 'sqlite') {
            // Step 1: Create new table with correct constraint
            Schema::create('bookings_new', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users');
                $table->foreignId('tour_id')->constrained('tours');
                $table->dateTime('booking_date');
                $table->integer('number_of_participants');
                $table->decimal('total_price', 10, 2);
                $table->enum('status', ['pending', 'confirmed', 'paid', 'cancelled', 'completed'])->default('pending');
                $table->text('notes')->nullable();
                $table->timestamps();
                $table->timestamp('expired_at')->nullable();
            });

            // Step 2: Copy data from old table
            DB::statement('INSERT INTO bookings_new SELECT * FROM bookings');

            // Step 3: Drop old table
            Schema::drop('bookings');

            // Step 4: Rename new table
            Schema::rename('bookings_new', 'bookings');
        } else {
            // For MySQL, the previous migration should handle this
            // But let's ensure it's correct
            DB::statement("ALTER TABLE bookings MODIFY COLUMN status ENUM('pending', 'confirmed', 'paid', 'cancelled', 'completed') NOT NULL DEFAULT 'pending'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            // Recreate without 'paid' status
            Schema::create('bookings_old', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users');
                $table->foreignId('tour_id')->constrained('tours');
                $table->dateTime('booking_date');
                $table->integer('number_of_participants');
                $table->decimal('total_price', 10, 2);
                $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
                $table->text('notes')->nullable();
                $table->timestamps();
                $table->timestamp('expired_at')->nullable();
            });

            DB::statement('INSERT INTO bookings_old SELECT * FROM bookings WHERE status != "paid"');
            Schema::drop('bookings');
            Schema::rename('bookings_old', 'bookings');
        }
    }
};
