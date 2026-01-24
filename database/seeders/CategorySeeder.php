<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Adventure', 'description' => 'Thrilling outdoor adventures and expeditions'],
            ['name' => 'Beach', 'description' => 'Relaxing beach and tropical island tours'],
            ['name' => 'Cultural', 'description' => 'Cultural heritage and historical tours'],
            ['name' => 'Mountain', 'description' => 'Mountain climbing and hiking tours'],
            ['name' => 'City', 'description' => 'Urban city tours and sightseeing'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
