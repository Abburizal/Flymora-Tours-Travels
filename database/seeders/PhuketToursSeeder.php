<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class PhuketToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => 'Phuket Phi Phi Island Adventure 3D2N',
                'description' => 'Paket tour 3 hari 2 malam di Phuket mengunjungi Phi Phi Islands dengan Maya Bay yang terkenal, Pileh Lagoon, Viking Cave, Loh Samah Bay, dan Phi Phi Don Island. Gratis perlengkapan swimming & snorkeling untuk eksplorasi bawah laut yang menakjubkan.',
                'price' => 2850000,
                'duration' => '3 Days 2 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-17 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Phi Phi Islands (Maya Bay - The Beach movie location)',
                    'Pileh Lagoon (crystal clear emerald water)',
                    'Viking Cave',
                    'Loh Samah Bay',
                    'Phi Phi Don Island',
                    'FREE Swimming & Snorkeling Equipment'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Speed boat ke Phi Phi Islands',
                    'Swimming & snorkeling equipment',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 23,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Phuket James Bond Island Explorer 3D2N',
                'description' => 'Paket tour 3 hari 2 malam di Phuket mengunjungi Phang Nga Bay dengan James Bond Island yang ikonik, Panak Island, Hong Island, dan Khao Ping Kan. Gratis canoeing untuk menjelajahi gua-gua tersembunyi dan laguna indah.',
                'price' => 2750000,
                'duration' => '3 Days 2 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-17 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Phang Nga Bay (limestone karsts)',
                    'James Bond Island (Khao Phing Kan)',
                    'Panak Island',
                    'Hong Island',
                    'Khao Ping Kan',
                    'FREE Canoeing Experience'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Long tail boat ke James Bond Island',
                    'Canoeing equipment & guide',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 24,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Phuket Phi Phi Island & City Tour 4D3N',
                'description' => 'Paket tour 4 hari 3 malam di Phuket mengunjungi Phi Phi Islands dengan Maya Bay, Pileh Lagoon, Viking Cave, ditambah City Tour lengkap ke Sino-Portuguese Old Town, Wat Chalong Temple, Promthep Cape, dan Patong Beach. Perpaduan sempurna pantai dan budaya.',
                'price' => 4300000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Phi Phi Islands + Maya Bay',
                    'Pileh Lagoon & Viking Cave',
                    'Loh Samah Bay & Phi Phi Don',
                    'Sino-Portuguese Old Town',
                    'Wat Chalong Temple',
                    'Promthep Cape Sunset',
                    'Patong Beach'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Speed boat ke Phi Phi Islands',
                    'Swimming & snorkeling equipment',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 25,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Phuket James Bond Island & City Tour 4D3N',
                'description' => 'Paket tour 4 hari 3 malam di Phuket mengunjungi Phang Nga Bay dengan James Bond Island, Panak Island, Hong Island, ditambah City Tour lengkap ke Sino-Portuguese Old Town, Wat Chalong Temple, Promthep Cape, dan Patong Beach. Paket lengkap untuk liburan sempurna.',
                'price' => 4200000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'James Bond Island (Khao Phing Kan)',
                    'Phang Nga Bay & Panak Island',
                    'Hong Island & Khao Ping Kan',
                    'FREE Canoeing Experience',
                    'Sino-Portuguese Old Town',
                    'Wat Chalong Temple',
                    'Promthep Cape Sunset',
                    'Patong Beach'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Long tail boat ke James Bond Island',
                    'Canoeing equipment & guide',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 26,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Phuket Phi Phi & James Bond Combo 4D3N',
                'description' => 'Paket tour 4 hari 3 malam di Phuket mengunjungi Phi Phi Islands (Pileh Lagoon, Viking Cave, Maya Bay, Loh Samah Bay) dan James Bond Island (Phang Nga Bay, Panak Island, Hong Island). Kombinasi terbaik 2 island tour terpopuler di Phuket!',
                'price' => 3850000,
                'duration' => '4 Days 3 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-18 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Phi Phi Islands + Maya Bay',
                    'Pileh Lagoon & Viking Cave',
                    'Loh Samah Bay & Phi Phi Don',
                    'James Bond Island',
                    'Phang Nga Bay & Panak Island',
                    'Hong Island',
                    'FREE Snorkeling & Canoeing'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Speed boat & long tail boat',
                    'Swimming, snorkeling & canoeing equipment',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 27,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => 'Phuket All in One Ultimate 5D4N',
                'description' => 'Paket tour 5 hari 4 malam di Phuket paling lengkap! Mengunjungi Phi Phi Islands, James Bond Island, dan City Tour lengkap ke Sino-Portuguese Old Town, Wat Chalong Temple, Promthep Cape, dan Patong Beach. Paket ultimate untuk pengalaman Phuket maksimal.',
                'price' => 5350000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Phuket, Thailand',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-15 08:00'),
                'end_date' => Carbon::parse('2026-01-19 18:00'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-12-20'),
                'highlights' => [
                    'Phi Phi Islands + Maya Bay',
                    'Pileh Lagoon & Viking Cave',
                    'James Bond Island',
                    'Phang Nga Bay & Hong Island',
                    'Sino-Portuguese Old Town',
                    'Wat Chalong Temple',
                    'Promthep Cape Sunset',
                    'Patong Beach'
                ],
                'included' => [
                    'Makan sesuai itinerary',
                    'Hotel bintang 3',
                    'Transportasi Bus AC + Wi-Fi + Karaoke',
                    'Speed boat & long tail boat',
                    'Swimming, snorkeling & canoeing equipment',
                    'Tiket masuk objek wisata sesuai itinerary',
                    'English speaking guide',
                    'Handling bandara Soekarno-Hatta',
                    'Asuransi wisata',
                    'Air mineral selama tour'
                ],
                'excluded' => [
                    'Tiket pesawat PP',
                    'Optional Tour',
                    'Keperluan pribadi'
                ],
                'is_recommended' => true,
                'recommendation_order' => 28,
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
