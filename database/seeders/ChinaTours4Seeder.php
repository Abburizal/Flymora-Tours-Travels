<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChinaTours4Seeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '8D Super Sale Chongqing Chengdu by Malaysia Airlines',
                'description' => 'Tour 8 hari mengunjungi Chengdu, Chongqing, Leshan, Emeishan, dan Dujiangyan dengan Malaysia Airlines. Tersedia keberangkatan dari Jakarta, Surabaya, Denpasar, dan Medan. Mengunjungi Ciqikou Ancient Town, Liziba LRT, Hongyadong, Danzishi, Jiefangbei, Yangtze River Cableway, The Ring Mall, Longmenhao, Leshan Giant Buddha (boat cruise), Baoguo Temple, Huanglongxi Ancient Town, Taikoo Li, Chunxi Road, Panda Base (termasuk buggy), Dongjiao Memory, Kuanzhai Alley, SKP, Zhongshuge, Panda Yangtian Square, Guanxian Ancient City, Jinli Ancient Street.',
                'price' => 11990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Chengdu, Chongqing, Leshan, Emeishan, Dujiangyan, China',
                'departure_location' => 'Jakarta (CGK) / Surabaya (SUB) / Denpasar (DPS) / Medan (KNO)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-05 19:55'),
                'end_date' => Carbon::parse('2026-02-12 15:05'),
                'available_from' => Carbon::parse('2026-02-05'),
                'available_until' => Carbon::parse('2026-07-24'),
                'highlights' => [
                    'Ciqikou Ancient Town',
                    'Liziba LRT Through the Building',
                    'Hongyadong',
                    'Danzishi',
                    'Jiefangbei',
                    'Yangtze River Cableway (cable car)',
                    'The Ring Mall',
                    'Longmenhao',
                    'Leshan Giant Buddha (boat cruise)',
                    'Baoguo Temple',
                    'Huanglongxi Ancient Town',
                    'Taikoo Li',
                    'Chunxi Road',
                    'Panda Base (termasuk buggy)',
                    'Dongjiao Memory',
                    'Kuanzhai Alley',
                    'SKP Mall',
                    'Zhongshuge (toko buku ikonik)',
                    'Panda Yangtian Square',
                    'Guanxian Ancient City',
                    'Jinli Ancient Street'
                ],
                'included' => [
                    'Tiket Internasional Malaysia Airlines (economy, tax included)',
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
                    'Visa Group China Rp 1.000.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 48,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'SUPER SALE 2026'
            ],
            [
                'name' => '5D Crazy Sale Hainan by Loong Air',
                'description' => 'Tour 5 hari mengunjungi Haikou, Xinglong, dan Sanya (Pulau Hainan) dengan Loong Air. Mengunjungi Qilou Old Street, Bali Village, Haitang Bay, Pantai Yalong Bay, Museum Sains dan Teknologi Makhluk Laut, Dadonghai Tourist Resort, Pusat Hidup Sehat, Tianya Haijiao Scenic Area, Dadong Xiaodongtian Scenic Area, Museum Budaya Obat Tradisional China, Pusat Pameran Tidur, dan Mission Hills Resort.',
                'price' => 4100000,
                'duration' => '5 Days 4 Nights',
                'destination' => 'Haikou, Xinglong, Sanya, Hainan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 2,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-04 00:01'),
                'end_date' => Carbon::parse('2026-02-08 23:59'),
                'available_from' => Carbon::parse('2026-02-04'),
                'available_until' => Carbon::parse('2026-06-24'),
                'highlights' => [
                    'Qilou Old Street',
                    'Bali Village (budaya Indonesia di Hainan)',
                    'Haitang Bay',
                    'Pantai Yalong Bay',
                    'Museum Sains dan Teknologi Makhluk Laut',
                    'Dadonghai Tourist Resort',
                    'Pusat Hidup Sehat',
                    'Tianya Haijiao Scenic Area',
                    'Dadong Xiaodongtian Scenic Area',
                    'Museum Budaya Obat Tradisional China',
                    'Pusat Pameran Tidur',
                    'Mission Hills Resort'
                ],
                'included' => [
                    'Tiket Internasional Jakarta - Haikou PP by Loong Air (economy, tax included)',
                    'Bagasi 23kg/pax (1 pcs)',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata',
                    'Makan sesuai program (sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Asuransi Perjalanan selama di Hainan (Land Travel Insurance)'
                ],
                'excluded' => [
                    'Tipping Tour Leader, Local Guide, Driver Rp 605.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan',
                    'Optional Tours: Sanya Songcheng Love Song and Dance (RMB 350)',
                    'Optional: Sanya Night Cruise (RMB 250)',
                    'Optional: Yalong Bay Tropical Paradise Forest (RMB 350)',
                    'Optional: Sanya Walking Street (RMB 150)',
                    'Optional: Helicopter Experience (RMB 250)'
                ],
                'is_recommended' => true,
                'recommendation_order' => 49,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'CRAZY SALE 2026'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
