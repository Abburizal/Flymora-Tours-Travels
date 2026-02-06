<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->integer('discount_percentage')->nullable()->after('price');
            $table->timestamp('promo_end_date')->nullable()->after('discount_percentage');
            $table->string('promo_label')->nullable()->after('promo_end_date'); // e.g., "FLASH SALE", "EARLY BIRD", "HOT DEAL"
        });
    }

    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn(['discount_percentage', 'promo_end_date', 'promo_label']);
        });
    }
};
