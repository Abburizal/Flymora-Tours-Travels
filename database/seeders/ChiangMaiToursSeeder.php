<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChiangMaiToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => 'Chiang Mai Chiang Rai Explorer 3D2N',
                'description' => 'Paket tour 3 hari 2 malam mengunjungi Chiang Mai dan Chiang Rai dengan fasilitas hotel bintang 3, mengunjungi Long Neck Village, White Temple, Blue Temple, Black House Museum, dan Hot Spring. Perpaduan sempurna antara budaya unik, arsitektur megah, dan relaksasi alam.',
                'price' => 2350000,
                'duration' => '3 Days 2 Nights',
                'destination' => 'Chiang Mai & Chiang Rai, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-17 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-31'),
                'highlights' => [
                    'Long Neck Village (Karen Tribe)',
                    'White Temple (Wat Rong Khun)',
                    'Blue Temple (Wat Rong Suea Ten)',
                    'Black House Museum (Baan Dam)',
                    'Hot Spring Relaxation',
                    'English Speaking Guide'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3 (Ibis Style Chiang Mai)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 19,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Chiang Mai Chiang Rai Intanon Mountain 4D3N',
                'description' => 'Paket tour 4 hari 3 malam mengunjungi Chiang Mai dan Chiang Rai dengan fasilitas hotel bintang 3, mengunjungi Long Neck Village, Intanon Mountain (gunung tertinggi Thailand), White Temple, Hot Spring, dan Waterfall. Petualangan alam dan budaya yang sempurna.',
                'price' => 3300000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Chiang Mai & Chiang Rai, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-31'),
                'highlights' => [
                    'Long Neck Village (Karen Tribe)',
                    'Doi Intanon Mountain (highest peak in Thailand)',
                    'White Temple (Wat Rong Khun)',
                    'Natural Hot Spring',
                    'Stunning Waterfall',
                    'English Speaking Guide'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3 (Ibis Style Chiang Mai)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 300.000/pax'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 20,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Chiang Mai Chiang Rai Doi Suthep 4D3N',
                'description' => 'Paket tour 4 hari 3 malam mengunjungi Chiang Mai dan Chiang Rai dengan fasilitas hotel bintang 3, mengunjungi Long Neck Village, Doi Suthep (kuil paling suci di Chiang Mai), White Temple, Hot Spring, dan Doi Pui Village. Kombinasi spiritual dan budaya pegunungan.',
                'price' => 3150000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Chiang Mai & Chiang Rai, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-31'),
                'highlights' => [
                    'Long Neck Village (Karen Tribe)',
                    'Doi Suthep Temple (sacred temple)',
                    'White Temple (Wat Rong Khun)',
                    'Natural Hot Spring',
                    'Doi Pui Hmong Village',
                    'English Speaking Guide'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3 (Ibis Style Chiang Mai)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 300.000/pax'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 21,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Chiang Mai Chiang Rai Ultimate 5D4N',
                'description' => 'Paket tour 5 hari 4 malam mengunjungi Chiang Mai dan Chiang Rai dengan fasilitas hotel bintang 3, mengunjungi Long Neck Village, Doi Suthep, White Temple, Hot Spring, dan Doi Intanon Mountain. Paket paling lengkap untuk eksplorasi maksimal pegunungan utara Thailand.',
                'price' => 4200000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Chiang Mai & Chiang Rai, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-31'),
                'highlights' => [
                    'Long Neck Village (Karen Tribe)',
                    'Doi Suthep Temple (sacred temple)',
                    'White Temple (Wat Rong Khun)',
                    'Natural Hot Spring',
                    'Doi Intanon Mountain (highest peak)',
                    'English Speaking Guide'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3 (Ibis Style Chiang Mai)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 22,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
