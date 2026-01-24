<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tour;

class TourSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => 'Bali Adventure Tour',
                'description' => 'Experience the beauty of Bali with hiking, water sports, and cultural sites',
                'price' => 899.99,
                'duration' => 5,
                'destination' => 'Bali, Indonesia',
                'category_id' => 1,
                'max_participants' => 30,
                'start_date' => now()->addDays(10),
                'end_date' => now()->addDays(15),
            ],
            [
                'name' => 'Maldives Beach Paradise',
                'description' => 'Luxury beach resort and water activities in the Maldives',
                'price' => 1299.99,
                'duration' => 7,
                'destination' => 'Maldives',
                'category_id' => 2,
                'max_participants' => 25,
                'start_date' => now()->addDays(20),
                'end_date' => now()->addDays(27),
            ],
            [
                'name' => 'Tokyo Cultural Experience',
                'description' => 'Explore historic temples, gardens, and traditional Japanese culture',
                'price' => 1199.99,
                'duration' => 6,
                'destination' => 'Tokyo, Japan',
                'category_id' => 3,
                'max_participants' => 20,
                'start_date' => now()->addDays(30),
                'end_date' => now()->addDays(36),
            ],
            [
                'name' => 'Mount Everest Base Camp Trek',
                'description' => 'Challenge yourself with a trek to the base camp of Mount Everest',
                'price' => 1999.99,
                'duration' => 14,
                'destination' => 'Nepal',
                'category_id' => 4,
                'max_participants' => 15,
                'start_date' => now()->addDays(45),
                'end_date' => now()->addDays(59),
            ],
            [
                'name' => 'Paris City Tour',
                'description' => 'Visit iconic landmarks, museums, and enjoy world-class cuisine',
                'price' => 1099.99,
                'duration' => 5,
                'destination' => 'Paris, France',
                'category_id' => 5,
                'max_participants' => 40,
                'start_date' => now()->addDays(50),
                'end_date' => now()->addDays(55),
            ],
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
