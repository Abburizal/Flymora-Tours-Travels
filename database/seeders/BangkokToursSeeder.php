<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class BangkokToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            // BKK 01
            [
                'name' => 'Bangkok & Pattaya Discovery 4D3N',
                'description' => 'Nikmati keindahan Bangkok dan Pattaya dalam satu paket lengkap! Kunjungi Nongnooch Village dengan pertunjukan gajah, Laser Buddha Hill, Gems Gallery, Wat Arun, dan belanja di Platinum Mall. Malam hari nikmati suasana Asiatique Riverfront. Opsional tambahan Alcazar Cabaret Show atau Dinner Cruise.',
                'price' => 2400000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Bangkok & Pattaya, Thailand',
                'category_id' => 6, // Thailand
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'highlights' => [
                    'Nongnooch Village & Elephant Show',
                    'Pattaya Beach at Hard Rock Cafe',
                    'Wat Arun (Temple of Dawn)',
                    'Chaophraya River Cruise',
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
                    'Optional Tour (Alcazar Show Rp350K, Dinner Cruise Rp500K)',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 1,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 02
            [
                'name' => 'Bangkok Floating Market & Dinner Cruise 4D3N',
                'description' => 'Eksplorasi pasar terapung tradisional Thailand! Kunjungi Damnoen Saduak Floating Market dengan perahu, Meaklong Railway Market yang unik, dilanjut city tour ke Wat Arun dan belanja di Platinum Mall. Malam spesial dengan Chaophraya Dinner Cruise dan gratis Calypso Cabaret Show.',
                'price' => 2700000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Bangkok & Damnoen, Thailand',
                'category_id' => 6, // Thailand
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'highlights' => [
                    'Damnoen Saduak Floating Market (Boat Canal Tour)',
                    'Meaklong Railway Market',
                    'Chaophraya Dinner Cruise',
                    'Calypso Cabaret Show GRATIS',
                    'Wat Arun & Icon Siam',
                    'Platinum Fashion Mall',
                ],
                'included' => [
                    'Makan sesuai itinerary (3 Breakfast, 2 Lunch, 1 Dinner, 1 Cruise Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok)',
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
                    'Optional Tour',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => true,
                'recommendation_order' => 2,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 03
            [
                'name' => 'Bangkok Hidden Gem E-Scooter Adventure 4D3N',
                'description' => 'Jelajahi Bangkok dengan cara berbeda! Nikmati city tour klasik ke Wat Arun dan Platinum Mall, lalu lanjut petualangan seru dengan E-Scooter menjelajahi hidden gems Bangkok: Talat Noi Street Art, Chinatown, Song Wat Walking Street, dan Chatuchak Market. Cocok untuk traveler muda yang suka eksplorasi unik.',
                'price' => 2050000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Bangkok, Thailand',
                'category_id' => 6, // Thailand
                'max_participants' => 20,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'highlights' => [
                    'E-Scooter Tour Hidden Gems Bangkok',
                    'Talat Noi Street Art',
                    'Chinatown & Song Wat Walking Street',
                    'Chatuchak Market (pasar terbesar Thailand)',
                    'Wat Arun & Icon Siam',
                    'Mother Roaster & Hong Sieng Kong Cafe',
                ],
                'included' => [
                    'Makan sesuai itinerary (3 Breakfast)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'E-Scooter Tour (termasuk peralatan)',
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
                    'Makan siang dan malam (kecuali sarapan)',
                    'Entrance fee ke cafe-cafe',
                    'Keperluan pribadi',
                ],
                'departure_location' => 'Jakarta (CGK Airport) - bertemu Tim Handling',
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'is_recommended' => false,
                'recommendation_order' => null,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
            
            // BKK 05
            [
                'name' => 'Bangkok City Tour Express 3D2N',
                'description' => 'Paket singkat 3 hari untuk Anda yang ingin menikmati pesona Bangkok dalam waktu terbatas. Kunjungi Wat Arun, naik Tourist Boat di Chaophraya River, belanja di Platinum Fashion Mall, dan nikmati malam di Asiatique Riverfront Night Market. Cocok untuk long weekend atau bisnis trip.',
                'price' => 1850000,
                'duration' => '3 Days 2 Nights',
                'destination' => 'Bangkok, Thailand',
                'category_id' => 6, // Thailand
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-17 18:00'),
                'highlights' => [
                    'Wat Arun (Temple of Dawn)',
                    'Chaophraya River Tourist Boat',
                    'Platinum Fashion Mall',
                    'Asiatique Riverfront Night Market',
                    'Gems Gallery Museum',
                    'Honey Bee Farm & Dried Food Center',
                ],
                'included' => [
                    'Makan sesuai itinerary (2 Breakfast, 1 Lunch, 1 Dinner)',
                    'Hotel bintang 3 (Thomson/Princeton Bangkok)',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'Guide lokal berbahasa Indonesia',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour',
                    'Tipping guide IDR 250.000/pax',
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
                'recommendation_order' => 4,
                'discount_percentage' => null,
                'promo_end_date' => null,
                'promo_label' => null,
            ],
        ];

        foreach ($tours as $tourData) {
            Tour::create($tourData);
        }

        $this->command->info('✅ Successfully created 4 Bangkok tour packages!');
    }
}
