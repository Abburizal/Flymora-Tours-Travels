<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChinaTours2Seeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '5D Best Saver Chongqing Tour',
                'description' => 'Perjalanan 5 hari hemat menjelajahi kota Chongqing dengan landmark ikonik: Liziba Light Rail Through The Building, Kuixing Building unik 22 lantai, Hongya Cave dengan arsitektur Diaojiaolou, serta kunjungan ke museum dan jalan kuno. Cocok untuk liburan singkat.',
                'price' => 7900000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Chongqing, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-04 16:40'),
                'end_date' => Carbon::parse('2026-02-08 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-17'),
                'highlights' => [
                    'Liziba Light Rail Through The Building - kereta tembus gedung',
                    'Kuixing Building - gedung unik 22 lantai',
                    'Hongya Cave & arsitektur Diaojiaolou',
                    'Liberation Monument & Walking Street',
                    'Chongqing Art Museum',
                    'Ciqikou Ancient Town (Baiyanchang)',
                    'Great Hall of The People',
                    'Three Gorges Museum',
                    'Chongqing Republic Street (lokasi syuting film 1942)',
                    'Danzishi Old Street & The Ring Shopping Park'
                ],
                'included' => [
                    'Tiket Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel (twin share)',
                    'Transportasi bus AC',
                    'Makan sesuai itinerary (MP, MS)',
                    'Asuransi perjalanan (max 83 thn)',
                    'Airport tax & fuel surcharge',
                    'Tour Leader dari Indonesia',
                    'Guide berbahasa Inggris',
                    'Air mineral'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Tipping TL, guide, driver Rp 510.000',
                    'Optional tour (Two Rivers Night Tour, Chongqing 1949 Show, Zoo + Pipayuan Hot Pot)',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 37,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'BEST SAVER SERIES'
            ],
            [
                'name' => '6D Best Saver Chongqing Chengdu',
                'description' => 'Perjalanan 6 hari hemat mengunjungi dua kota besar China: Chongqing dan Chengdu. Nikmati keunikan Liziba Light Rail, kunjungi Panda Base di Chengdu, serta jelajahi jalan kuno dan pusat perbelanjaan modern.',
                'price' => 8900000,
                'duration' => '6 Days 5 Nights',
                'destination' => 'Chongqing, Chengdu, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-01 16:40'),
                'end_date' => Carbon::parse('2026-02-06 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-17'),
                'highlights' => [
                    'Chengdu Research Base of Giant Panda (+ battery car)',
                    'Liziba Light Rail Through The Building',
                    'Great Hall of The People Chongqing',
                    'Chunxi Road Pedestrian Street & Taikoo Li',
                    'IFS Panda Climbing The Wall landmark',
                    'Eastern District Music Park (bekas pabrik era Soviet)',
                    'Jinli Ancient Street - "First Street of Shu Kingdom"',
                    'Tianfu Twin Tower - skyline indah Chengdu',
                    'SKP Night View',
                    'Liberation Monument & Hongya Cave'
                ],
                'included' => [
                    'Tiket Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel (twin share)',
                    'Transportasi bus AC',
                    'Makan sesuai itinerary (MP, MS)',
                    'Asuransi perjalanan (max 83 thn)',
                    'Airport tax & fuel surcharge',
                    'Tour Leader dari Indonesia',
                    'Guide berbahasa Inggris',
                    'Air mineral'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Tipping TL, guide, driver Rp 612.000',
                    'Optional tour (Sichuan Opera, Two Rivers Night Tour, Pipayuan Hot Pot + Night View)',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 38,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'BEST SAVER SERIES'
            ],
            [
                'name' => '6D Best Saver Chongqing Wulong',
                'description' => 'Perjalanan 6 hari hemat menjelajahi keindahan alam Wulong: Tiankeng Three Bridges, Fairy Mountain "Oriental Switzerland", serta city tour Chongqing dengan landmark ikoniknya.',
                'price' => 8900000,
                'duration' => '6 Days 5 Nights',
                'destination' => 'Chongqing, Wulong, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-01 16:40'),
                'end_date' => Carbon::parse('2026-02-06 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-17'),
                'highlights' => [
                    'Wulong Tiankeng Three Bridges (3 natural stone arch bridges)',
                    'Fairy Mountain - "Oriental Switzerland" (+ kereta)',
                    'Wave Road - jalan ombak viral di sosial media',
                    'Kuixing Building - gedung unik 22 lantai',
                    'Liberation Monument & Walking Street',
                    'Hongya Cave & arsitektur Diaojiaolou',
                    'Chongqing Republic Street (lokasi syuting film 1942)',
                    'Great Hall of The People',
                    'Three Gorges Museum',
                    'Danzishi Old Street',
                    'Liziba Light Rail Through The Building',
                    'Ciqikou Ancient Town'
                ],
                'included' => [
                    'Tiket Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel bintang 4 (twin share)',
                    'Transportasi bus AC',
                    'Makan sesuai itinerary (MP, MS, MM)',
                    'Asuransi perjalanan (max 83 thn)',
                    'Airport tax & fuel surcharge',
                    'Tour Leader dari Indonesia',
                    'Guide berbahasa Inggris',
                    'Air mineral'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Tipping TL, guide, driver Rp 612.000',
                    'Optional tour (Two Rivers Night Tour, Chongqing 1949 Show, Pipayuan Hotpot + Observation Deck)',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 39,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'BEST SAVER SERIES'
            ],
            [
                'name' => '8D Chongqing Chengdu Jiuzhaigou',
                'description' => 'Perjalanan 8 hari menjelajahi keindahan Jiuzhaigou "Surga Dunia", kota Chengdu dengan Panda Base-nya, serta city tour Chongqing. Termasuk bullet train dan kunjungan ke Dujiangyan Panda Park.',
                'price' => 13900000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Chongqing, Chengdu, Jiuzhaigou, Dujiangyan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-02 16:40'),
                'end_date' => Carbon::parse('2026-02-09 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-15'),
                'highlights' => [
                    'Jiuzhaigou National Park (Mirror Lake, Pearl Waterfall, Five Color Pond)',
                    'Bullet train Chengdu-Jiuzhaigou',
                    'Source of Minjiang River - Gonggangling "Dragon Head"',
                    'Dujiangyan Panda Park (+ battery car)',
                    'Guanxian Ancient Town (arsitektur Ming & Qing)',
                    'Chunxi Road Pedestrian Street & Taikoo Li',
                    'IFS Panda Climbing The Wall',
                    'Liziba Light Rail Through The Building',
                    'Ciqikou Ancient Town',
                    'Hongya Cave & Liberation Monument',
                    'Pipa Yuan Hot Pot - restoran hot pot terbesar'
                ],
                'included' => [
                    'Tiket Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel bintang 4 (twin share)',
                    'Transportasi bus AC',
                    'Bullet train',
                    'Admission fee objek wisata',
                    'Makan sesuai itinerary (MP, MS, MM)',
                    'Airport tax',
                    'Asuransi perjalanan group (max 84 thn)',
                    'Tour Leader dari Jakarta',
                    'Guide berbahasa Inggris',
                    'Air mineral'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Tipping TL, guide, driver Rp 816.000',
                    'Optional tour (Chongqing 1949 Show, Jiuzhai Ethnic Party, Two Rivers Night Tour, Private Bus Jiuzhaigou)',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 40,
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
