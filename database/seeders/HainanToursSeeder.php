<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class HainanToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '6D4N Delightful Hainan',
                'description' => 'Nikmati keindahan Pulau Hainan dengan kunjungan ke Da Xiao Dongtian, Nanshan Buddhist Cultural Park, Phoenix Ridge, Yalong Bay, dan museum-museum bersejarah. Tour ini menggabungkan wisata alam, budaya, dan belanja di Sanya, Wuzhishan, dan Haikou.',
                'price' => 6890000,
                'duration' => '6 Days 4 Nights',
                'destination' => 'Sanya, Wuzhishan, Haikou, Hainan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-01 16:50'),
                'end_date' => Carbon::parse('2026-01-06 02:20'),
                'available_from' => Carbon::parse('2025-11-01'),
                'available_until' => Carbon::parse('2026-06-30'),
                'highlights' => [
                    'Da Xiao Dongtian',
                    'Nanshan Buddhist Cultural Park (Patung Guan Yin 108m)',
                    'Phoenix Ridge (cable car)',
                    'Yalong Bay Beach (Oriental Hawaii)',
                    'Yalong Bay International Rose Valley',
                    'Museum Etnis Wuzhishan',
                    'Distrik Budaya Dongpo',
                    'Jalan Tua Qilou (700 tahun)',
                    'Taman Budaya Hai Rui'
                ],
                'included' => [
                    'Tiket pesawat Jakarta-Sanya PP (Lion Air Charter)',
                    'Airport tax & fuel surcharge',
                    'Hotel 4* (3 malam Sanya + 1 malam Haikou)',
                    'Makan: MP, MS, MM sesuai itinerary',
                    'Bagasi 20 kg + handbag 5 kg',
                    'Air mineral 1 botol/hari',
                    'Asuransi perjalanan group (max 69 thn)',
                    'Kunjungan 4 toko wajib (Fish Oil, Chinese Herb, Silk, Latex)',
                    'Tour Leader dari Indonesia'
                ],
                'excluded' => [
                    'Paspor & dokumen perjalanan',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Single supplement',
                    'Travelling bag',
                    'Optional tour',
                    'Tips TL, Guide, Driver IDR 580.000/pax',
                    'Biaya asuransi tambahan (>70th)',
                    'PCR/Antigen test',
                    'Hotel karantina',
                    'PPN 1.1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 50,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '6D4N Joyful Hainan Haihua Island',
                'description' => 'Tour eksklusif dengan pengalaman menginap di Haihua Island, menikmati keindahan Sea Flower Island, helikopter tour, dan kunjungan ke Phoenix Bridge, Nanshan Buddhist Cultural Park, Stone Flower Water Cave, serta Dongpo Academy.',
                'price' => 7990000,
                'duration' => '6 Days 4 Nights',
                'destination' => 'Sanya, Haihua Island, Hainan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-01-01 16:50'),
                'end_date' => Carbon::parse('2026-01-06 02:20'),
                'available_from' => Carbon::parse('2025-11-01'),
                'available_until' => Carbon::parse('2026-06-30'),
                'highlights' => [
                    'Phoenix Bridge (cable car)',
                    'Helikopter tour Pulau Phoenix',
                    'Yalong Bay International Rose Valley',
                    'Da Xiao Dongtian (incl battery car)',
                    'Nanshan Buddhist Cultural Park (incl battery car)',
                    'Sea Flower Island (Ming & Qing Food Street, Ole Shopping Street)',
                    'Wedding Manor light show',
                    'Stone Flower Water Cave National Geopark',
                    'Dongpo Academy',
                    'Tianya Haijiao / The End of The Earth'
                ],
                'included' => [
                    'Tiket pesawat Jakarta-Sanya PP (Lion Air Charter)',
                    'Airport tax & fuel surcharge',
                    'Hotel 5* (2 malam Sanya + 2 malam Haihua Island)',
                    'Makan: MP, MS, MM sesuai itinerary',
                    'Bagasi 20 kg + handbag 5 kg',
                    'Air mineral 1 botol/hari',
                    'Asuransi perjalanan group (max 69 thn)',
                    'Kunjungan 4 toko wajib (Fish Oil, Chinese Herb, Silk, Latex)',
                    'Tour Leader dari Indonesia'
                ],
                'excluded' => [
                    'Paspor & dokumen perjalanan',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Single supplement',
                    'Travelling bag',
                    'Optional tour',
                    'Tips TL, Guide, Driver IDR 680.000/pax',
                    'Biaya asuransi tambahan (>70th)',
                    'PCR/Antigen test',
                    'Hotel karantina',
                    'PPN 1.1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 51,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '6D4N Super Offer Hainan',
                'description' => 'Paket hemat wisata Hainan dengan kunjungan ke Daxiao Dongtian, Houhai Fishing Village, Luhuitou Park, Yalong Bay, Rose Valley, Dadong Sea Tourism Zone, dan The End of The Earth. Cocok untuk budget traveler.',
                'price' => 3990000,
                'duration' => '6 Days 4 Nights',
                'destination' => 'Sanya, Hainan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-05 16:50'),
                'end_date' => Carbon::parse('2026-03-10 02:20'),
                'available_from' => Carbon::parse('2025-12-01'),
                'available_until' => Carbon::parse('2026-06-30'),
                'highlights' => [
                    'Daxiao Dongtian',
                    'Houhai Fishing Village (desa nelayan)',
                    'Luhuitou Park',
                    'Yalong Bay Beach (Oriental Hawaii)',
                    'Yalong Bay International Rose Valley',
                    'Dadong Sea Tourism Zone',
                    'The End of The Earth / Tianya Haijiao'
                ],
                'included' => [
                    'Tiket pesawat Jakarta-Sanya PP (Lion Air Charter)',
                    'Airport tax & fuel surcharge',
                    'Hotel (Sanya Yabulun Health Convalescent Center)',
                    'Makan: B (breakfast) sesuai itinerary',
                    'Bagasi 20 kg + handbag 5 kg',
                    'Air mineral 1 botol/hari',
                    'Asuransi perjalanan group (max 69 thn)',
                    'Kunjungan 4 toko wajib (Lateks, Bamboo Charcoal, Chinese Herbs, Fish Oil)',
                    'Tour Leader dari Indonesia'
                ],
                'excluded' => [
                    'Paspor & dokumen perjalanan',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Single supplement',
                    'Travelling bag',
                    'Optional tour',
                    'Tips TL, Guide, Driver IDR 730.000/pax',
                    'Biaya asuransi tambahan (>70th)',
                    'PCR/Antigen test',
                    'Hotel karantina',
                    'PPN 1.1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 52,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'SUPER OFFER'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
