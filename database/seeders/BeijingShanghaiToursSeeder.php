<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class BeijingShanghaiToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '8D Spring Sale China Beijing Shanghai by Cathay Pacific',
                'description' => 'Tour 8 hari mengunjungi Beijing, Suzhou, Hangzhou, dan Shanghai dengan maskapai Cathay Pacific. Mengunjungi Temple of Heaven, Tian An Men Square, Great Wall (Juyongguan), Bird\'s Nest, Water Cube, West Lake, Wuzhen Watertown, The Bund, dan Xintiandi. Termasuk makan bebek Peking dan Ayam Beggar.',
                'price' => 13990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Beijing, Suzhou, Hangzhou, Shanghai, China',
                'departure_location' => 'Jakarta (CGK Airport) Terminal 3 Ultimate',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-04-15 08:10'),
                'end_date' => Carbon::parse('2026-04-22 22:55'),
                'available_from' => Carbon::parse('2026-04-01'),
                'available_until' => Carbon::parse('2026-04-15'),
                'highlights' => [
                    'Temple of Heaven',
                    'Tian An Men Square',
                    'Juyongguan Great Wall',
                    'Bird\'s Nest (PhotoStop)',
                    'Water Cube (Outlook)',
                    'West Lake (kapal)',
                    'Wuzhen Watertown (kapal)',
                    'The Bund',
                    'Xintiandi',
                    'Bebek Peking',
                    'Ayam Beggar'
                ],
                'included' => [
                    'Tiket Internasional Cathay Pacific (economy, tax included)',
                    'Bagasi 23 kg',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata',
                    'Makan sesuai program (5x makan sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Travel insurance'
                ],
                'excluded' => [
                    'Visa Group China Rp 1.100.000',
                    'Tipping Tour Leader, Local Guide, Driver Rp 850.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 41,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'SPRING SALE PROMO 2026'
            ],
            [
                'name' => '8D6N Lebaran China Popular Beijing Shanghai by Singapore Airlines',
                'description' => 'Tour 8 hari mengunjungi Shanghai, Wuzhen, Hangzhou, Suzhou, dan Beijing dengan Singapore Airlines (maskapai bintang 5). Mengunjungi The Bund, Xintiandi, TianZiFang, TV Tower, Wuzhen Watertown, West Lake, Yuefei Temple, Couples Retreat Garden, Jinji Lake, Temple of Heaven, Tian An Men Square, Juyongguan Great Wall, Bird\'s Nest, dan Water Cube. Termasuk makan bebek Peking.',
                'price' => 21990000,
                'duration' => '8 Days 6 Nights',
                'destination' => 'Shanghai, Wuzhen, Hangzhou, Suzhou, Beijing, China',
                'departure_location' => 'Jakarta (CGK Airport) Terminal 3 Ultimate',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-15 05:25'),
                'end_date' => Carbon::parse('2026-03-22 10:10'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-03-15'),
                'highlights' => [
                    'The Bund',
                    'Xintiandi',
                    'TianZiFang',
                    'TV Tower (PhotoStop)',
                    'Wuzhen Watertown (kapal)',
                    'West Lake (kapal)',
                    'Yuefei Temple',
                    'Couples Retreat Garden (Ou Yuan Garden)',
                    'Jinji Lake',
                    'Temple of Heaven',
                    'Tian An Men Square',
                    'Juyongguan Great Wall',
                    'Bird\'s Nest (PhotoStop)',
                    'Water Cube (PhotoStop)',
                    'Bebek Peking'
                ],
                'included' => [
                    'Tiket Internasional Singapore Airlines (economy, tax included)',
                    'Bagasi 25 kg',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata',
                    'Makan sesuai program (sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Travel Insurance Group Tokio Marine (s/d 69 tahun)'
                ],
                'excluded' => [
                    'Group Visa China Rp 1.000.000',
                    'Tipping Tour Leader, Local Guide, Driver Rp 100.000/hari (8 hari) = Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 42,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'LEBARAN PROMO 2026'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
