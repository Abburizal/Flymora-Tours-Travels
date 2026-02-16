<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class MultiCountryToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => 'Malaysia Singapore Express 4D3N',
                'description' => 'Paket tour 4 hari 3 malam mengunjungi 2 negara: Malaysia (Kuala Lumpur, Genting Highland, Batu Cave, Putrajaya, Johor Bahru, Melaka) dan Singapore (Jewel Changi Airport, Merlion Park, Sentosa Island, Universal Studio, Chinatown, Orchard Road). Sudah termasuk tiket pesawat dan hotel bintang 3.',
                'price' => 5999000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Malaysia & Singapore',
                'departure_location' => 'Jakarta (CGK) / Surabaya (SUB)',
                'category_id' => 15,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-01 08:00'),
                'end_date' => Carbon::parse('2026-03-04 18:00'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-07-31'),
                'highlights' => [
                    'Genting Highland + Cable Car',
                    'Batu Cave & Istana Negara',
                    'KLCC & Chocolate Factory',
                    'Putrajaya',
                    'Singapore City Tour (Jewel Changi, Merlion Park)',
                    'Sentosa Island & Universal Studio',
                    'Chinatown & Orchard Road',
                    'Melaka Heritage (Gedung Merah, Benteng Portugis, Jonker Street)',
                    'SUDAH TERMASUK TIKET PESAWAT'
                ],
                'included' => [
                    'Tiket pesawat Jakarta/Surabaya - Kuala Lumpur PP',
                    'Bagasi kabin 7kg',
                    'Hotel bintang 3 (Areena Star/Millesime/Balik Pulau)',
                    'Transportasi Bus AC',
                    'Makan sesuai itinerary (6x Breakfast, 3x Lunch, 2x Dinner)',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Pemandu wisata berbahasa Indonesia',
                    'Tipping guide & driver'
                ],
                'excluded' => [
                    'Bagasi pesawat check-in',
                    'Optional Tour',
                    'Single supplement Rp 1.500.000',
                    'Asuransi COVID-19 (opsional)',
                    'Makan/minum diluar program',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 29,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'NON-REFUNDABLE'
            ],
            [
                'name' => 'Malaysia Singapore Leisure 5D4N',
                'description' => 'Paket tour 5 hari 4 malam mengunjungi 2 negara: Malaysia (Kuala Lumpur, Genting Highland, Batu Cave, Putrajaya, Johor Bahru, Melaka) dan Singapore (Jewel Changi Airport, Merlion Park, Sentosa Island, Universal Studio, Chinatown, Orchard Road) dengan free time di Kuala Lumpur. Sudah termasuk tiket pesawat dan hotel bintang 3.',
                'price' => 6199000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Malaysia & Singapore',
                'departure_location' => 'Jakarta (CGK) / Surabaya (SUB)',
                'category_id' => 15,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-01 08:00'),
                'end_date' => Carbon::parse('2026-03-05 18:00'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-07-31'),
                'highlights' => [
                    'Genting Highland + Cable Car',
                    'Batu Cave & Istana Negara',
                    'KLCC & Chocolate Factory',
                    'Putrajaya',
                    'Singapore City Tour (Jewel Changi, Merlion Park)',
                    'Sentosa Island & Universal Studio',
                    'Chinatown & Orchard Road',
                    'Melaka Heritage (Gedung Merah, Benteng Portugis, Jonker Street)',
                    'FREE TIME di Kuala Lumpur',
                    'SUDAH TERMASUK TIKET PESAWAT'
                ],
                'included' => [
                    'Tiket pesawat Jakarta/Surabaya - Kuala Lumpur PP',
                    'Bagasi kabin 7kg',
                    'Hotel bintang 3 (Areena Star/Millesime/Balik Pulau/Alamis)',
                    'Transportasi Bus AC',
                    'Makan sesuai itinerary (8x Breakfast, 3x Lunch, 2x Dinner)',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Pemandu wisata berbahasa Indonesia',
                    'Tipping guide & driver'
                ],
                'excluded' => [
                    'Bagasi pesawat check-in',
                    'Optional Tour',
                    'Single supplement Rp 1.500.000',
                    'Asuransi COVID-19 (opsional)',
                    'Makan/minum diluar program',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 30,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'NON-REFUNDABLE'
            ],
            [
                'name' => 'Malaysia Singapore Thailand Ultimate 7D6N',
                'description' => 'Paket tour 7 hari 6 malam mengunjungi 3 negara: Malaysia (Kuala Lumpur, Genting Highland, Batu Cave, Putrajaya, Johor Bahru, Melaka), Singapore (Jewel Changi Airport, Merlion Park, Sentosa Island, Universal Studio, Chinatown, Orchard Road), dan Thailand (Dannok, Hatyai, Sleeping Buddha, Samila Beach, Floating Market). Sudah termasuk tiket pesawat dan hotel bintang 3-4.',
                'price' => 6299000,
                'duration' => '7 Days 6 Nights',
                'destination' => 'Malaysia, Singapore & Thailand',
                'departure_location' => 'Jakarta (CGK) / Surabaya (SUB)',
                'category_id' => 15,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-01 08:00'),
                'end_date' => Carbon::parse('2026-03-07 18:00'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-07-31'),
                'highlights' => [
                    'Genting Highland + Cable Car',
                    'Batu Cave & Istana Negara',
                    'KLCC & Chocolate Factory',
                    'Putrajaya',
                    'Singapore City Tour (Jewel Changi, Merlion Park)',
                    'Sentosa Island & Universal Studio',
                    'Chinatown & Orchard Road',
                    'Melaka Heritage (Gedung Merah, Benteng Portugis, Jonker Street)',
                    'Hatyai City Tour (Toko Kaos Kaysorn, Nora Plaza)',
                    'Sleeping Buddha (Wat Phranon Laem Pho)',
                    'Samila Beach (Patung Mermaid)',
                    'Hatyai Floating Market (weekend only)',
                    'SUDAH TERMASUK TIKET PESAWAT'
                ],
                'included' => [
                    'Tiket pesawat Jakarta/Surabaya - Kuala Lumpur PP',
                    'Bagasi kabin 7kg',
                    'Hotel bintang 3-4 (Avenue J/Millesime/Balik Pulau/M Hotel/Yannaty)',
                    'Transportasi Bus AC',
                    'Makan sesuai itinerary (12x Breakfast, 6x Lunch, 4x Dinner)',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Pemandu wisata berbahasa Indonesia',
                    'Tipping guide & driver'
                ],
                'excluded' => [
                    'Bagasi pesawat check-in',
                    'Optional Tour',
                    'Single supplement Rp 1.750.000',
                    'Asuransi COVID-19 (opsional)',
                    'Makan/minum diluar program',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 31,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'NON-REFUNDABLE'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
