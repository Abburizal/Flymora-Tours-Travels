<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class BangkokTours4Seeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => 'Bangkok Pattaya Dream World Fun 5D4N',
                'description' => 'Liburan lengkap untuk keluarga! Nikmati Pattaya dengan Nongnooch Village dan Elephant Show, city tour Bangkok, lalu habiskan sehari penuh di Dream World dengan Snow Town. Paket komplit dengan hiburan dan taman bermain dalam satu perjalanan.',
                'price' => 3925000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Dream World (unlimited time) + Snow Town',
                    'Valley of Dinosaurs (Dinosaur Park)',
                    'Wat Arun & Chaophraya River',
                    'Platinum Fashion Mall',
                    'Jodd Fairs Night Market'
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk Dream World + Snow Town',
                    'Tiket masuk objek wisata lainnya',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 16,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Bangkok Pattaya Safari Marine Adventure 5D4N',
                'description' => 'Petualangan seru di dua kota! Jelajahi Pattaya dengan Nongnooch Village, lalu habiskan sehari penuh di Safari World & Marine Park. Saksikan Spy War Show, Cowboy Show, dan berbagai animal show. Paket favorit untuk keluarga dan pecinta satwa.',
                'price' => 4025000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Safari World + Marine Park',
                    'Spy War Show & Cowboy Show',
                    'Animal Shows & Photo Ops',
                    'Wat Arun & Icon Siam',
                    'Jodd Fairs Night Market'
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk Safari World + Marine Park',
                    'Tiket masuk objek wisata lainnya',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 17,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Bangkok Pattaya Colosseum Show 4D3N',
                'description' => 'Nikmati kemewahan pertunjukan Colosseum Cabaret Show GRATIS di Pattaya! Lengkap dengan kunjungan ke Nongnooch Village, Elephant Show, city tour Bangkok, Wat Arun, dan belanja di Platinum Mall. Paket lengkap dengan hiburan malam spektakuler.',
                'price' => 2650000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'FREE Colosseum Cabaret Show',
                    'Nongnooch Village & Elephant Show',
                    'Wat Arun (Temple of Dawn)',
                    'Icon Siam & Sook Siam Floating Market',
                    'Platinum Fashion Mall',
                    'Asiatique Riverfront Night Market'
                ],
                'included' => [
                    'Makan sesuai itinerary (3 Breakfast, 2 Lunch, 2 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'FREE Colosseum Cabaret Show',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 350.000/pax'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour (Valley of Dinosaurs THB200/pax, Dinner Cruise)',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 18,
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
