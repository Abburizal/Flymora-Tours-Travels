<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class BangkokTours3Seeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            // BKK 13
            [
                'name' => 'Bangkok Pattaya Frost Ice Magic 4D3N',
                'description' => 'Nikmati sensasi dingin di tropis! Kunjungi Frost Magical Ice of Siam, taman salju dan es pertama di Thailand. Lengkap dengan Nongnooch Village, Elephant Show, dan city tour Bangkok. Kombinasi sempurna antara petualangan seru dan wisata budaya.',
                'price' => 2550000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'highlights' => [
                    'Frost Magical Ice of Siam (salju & es)',
                    'Nongnooch Village & Elephant Show',
                    'Valley of Dinosaurs (Dinosaur Park)',
                    'Wat Arun & Chaophraya River',
                    'Platinum Fashion Mall',
                    'Asiatique Riverfront Night Market',
                ],
                'included' => [
                    'Makan sesuai itinerary (3 Breakfast, 2 Lunch, 2 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 350.000/pax',
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour (Alcazar Show)',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 11,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 16
            [
                'name' => 'Bangkok Pattaya Coral Island Escape 5D4N',
                'description' => 'Liburan lengkap dengan wisata pantai! Jelajahi Pattaya dan nikmati keindahan Coral Island dengan speed boat. Tersedia berbagai watersport seru (snorkeling, parasailing, jet ski, banana boat). Kunjungi 3D Art in Paradise, Terminal 21, dan nikmati malam di Pattaya Walking Street.',
                'price' => 3375000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'category_id' => 2, // Beach
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'highlights' => [
                    'Coral Island dengan Speed Boat',
                    'Watersport (parasailing, jet ski, banana boat)',
                    'Nongnooch Village & Elephant Show',
                    '3D Art in Paradise Pattaya',
                    'Terminal 21 Pattaya',
                    'Pattaya Walking Street',
                    'Wat Arun & Icon Siam',
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Speed Boat ke Coral Island',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax',
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional watersport (bayar sendiri di lokasi)',
                    'Makan malam di Walking Street',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 12,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 17
            [
                'name' => 'Bangkok Pattaya Khaoyai Tri-City 5D4N',
                'description' => 'Petualangan 3 kota dalam satu paket! Mulai dari Pattaya dengan Nongnooch Village, lanjut city tour Bangkok, lalu eksplorasi Khaoyai dengan Toscana Valley, Hokkaido Flower Park, dan Toy Museum. Paket lengkap untuk liburan maksimal.',
                'price' => 3775000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok, Pattaya & Khaoyai, Thailand',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Toscana Valley (spot foto ala Italia)',
                    'Hokkaido Flower Park',
                    'Toy Museum & Suwan Corn Farm',
                    'Wat Arun & Icon Siam',
                    'Platinum Fashion Mall',
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax',
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 13,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 18
            [
                'name' => 'Bangkok Pattaya Ayutthaya Heritage 5D4N',
                'description' => 'Liburan lengkap dengan sentuhan sejarah! Nikmati Pattaya dengan Nongnooch Village, city tour Bangkok, lalu jelajahi situs warisan dunia Ayutthaya Historical Park. Kunjungi Wat Chai Watthanaram dan Wat Mahathat yang ikonik.',
                'price' => 3775000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok, Pattaya & Ayutthaya, Thailand',
                'category_id' => 3, // Cultural
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Ayutthaya Historical Park (UNESCO)',
                    'Wat Chai Watthanaram',
                    'Wat Mahathat',
                    'Wat Arun & Chaophraya River',
                    'Platinum Fashion Mall',
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax',
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 14,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 19
            [
                'name' => 'Bangkok Pattaya Kanchanaburi Adventure 5D4N',
                'description' => 'Paket super lengkap! Nikmati Pattaya dengan Nongnooch Village, city tour Bangkok, lalu petualangan seru di Kanchanaburi dengan Skywalk, Death Railway, dan Safari Park. Interaksi dengan jerapah jadi pengalaman tak terlupakan.',
                'price' => 4025000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Bangkok, Pattaya & Kanchanaburi, Thailand',
                'category_id' => 6,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Kanchanaburi Skywalk',
                    'Death Railway & Tham Krasae Bridge',
                    'Kanchanaburi Safari Park (interact with Giraffe)',
                    'Wat Arun & Icon Siam',
                    'Platinum Fashion Mall',
                ],
                'included' => [
                    'Makan sesuai itinerary (4 Breakfast, 2 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok + The Season Pattaya)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 425.000/pax',
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Bagasi pesawat tidak terdaftar',
                    'Optional Tour',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 15,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
        ];

        foreach ($tours as $tourData) {
            Tour::create($tourData);
        }

        $this->command->info('✅ 5 paket Bangkok berhasil ditambahkan!');
    }
}
