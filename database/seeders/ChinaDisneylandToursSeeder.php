<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChinaDisneylandToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '8D Special Lebaran China Shanghai with Disneyland & Iconic Ruyi Bridge',
                'description' => 'Tour 8 hari mengunjungi Shanghai, Zhujiajiao, Suzhou, Hangzhou, dan Xianju dengan Garuda Indonesia. Mengunjungi Zhujiajiao Water Town, Jinji Lake, The Gate of The Orient, Silk Factory, Couple\'s Garden, West Lake (kapal), Hefang Street, Shenxianju (cable car), Ruyi Bridge (jembatan kaca), DisneyLand, Starbucks Reserve Workshop, LV Cruise, Nanjing Road, City God Temple, dan Xintiandi.',
                'price' => 18990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Shanghai, Zhujiajiao, Suzhou, Hangzhou, Xianju, China',
                'departure_location' => 'Jakarta (CGK Airport) Terminal 3 Ultimate',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-16 23:50'),
                'end_date' => Carbon::parse('2026-03-23 15:25'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-03-18'),
                'highlights' => [
                    'Zhujiajiao Water Town',
                    'Jinji Lake',
                    'The Gate of The Orient (photo stop)',
                    'Silk Factory',
                    'Couple\'s Garden',
                    'West Lake (kapal)',
                    'Hefang Street',
                    'Shenxianju (cable car)',
                    'Ruyi Bridge (jembatan kaca)',
                    'Shanghai DisneyLand',
                    'Starbucks Reserve Workshop',
                    'LV Cruise',
                    'Nanjing Road',
                    'City God Temple',
                    'Xintiandi'
                ],
                'included' => [
                    'Tiket Internasional Garuda Indonesia (economy, tax included)',
                    'Bagasi sesuai ketentuan airlines',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata',
                    'Makan sesuai program (sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Travel insurance'
                ],
                'excluded' => [
                    'Visa group China Rp 1.000.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 43,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'LEBARAN SPECIAL PROMO 2026'
            ],
            [
                'name' => '8D Splendid Lebaran China Beijing Shanghai Disneyland',
                'description' => 'Tour 8 hari mengunjungi Beijing, Suzhou, Hangzhou, Wuzhen, dan Shanghai dengan Malaysia Airlines. Mengunjungi Temple of Heaven, Tian An Men Square, Juyongguan Great Wall, Bird\'s Nest, Water Cube, Shantang Street, Jinji Lake, West Lake (kapal), Yue Fei Temple, Tea Garden, Wuzhen Watertown (kapal), TV Tower, The Bund, dan Shanghai Disneyland (One Day Pass). Termasuk makan bebek Peking.',
                'price' => 18888000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Beijing, Suzhou, Hangzhou, Wuzhen, Shanghai, China',
                'departure_location' => 'Jakarta (CGK Airport) Terminal 3 Ultimate',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-14 19:55'),
                'end_date' => Carbon::parse('2026-03-21 15:05'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-03-22'),
                'highlights' => [
                    'Temple of Heaven',
                    'Tian An Men Square',
                    'Juyongguan Great Wall',
                    'Bird\'s Nest (PhotoStop)',
                    'Water Cube (Outlook PhotoStop)',
                    'Shantang Street',
                    'Jinji Lake',
                    'West Lake (kapal)',
                    'Yue Fei Temple',
                    'Tea Garden',
                    'Wuzhen Watertown (kapal)',
                    'TV Tower (PhotoStop)',
                    'The Bund',
                    'Shanghai Disneyland (One Day Pass)',
                    'Bebek Peking'
                ],
                'included' => [
                    'Tiket Internasional Malaysia Airlines (economy, tax included)',
                    'Bagasi 30 kg',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata',
                    'Makan sesuai program (sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Travel insurance'
                ],
                'excluded' => [
                    'Visa group China Rp 1.000.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 44,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'SPLENDID LEBARAN PROMO 2026'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
