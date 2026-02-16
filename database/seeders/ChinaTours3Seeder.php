<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChinaTours3Seeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '8D Best Chongqing Zhangjiajie by Hainan Airlines',
                'description' => 'Tour 8 hari mengunjungi Haikou, Chongqing, Qianjiang, Fenghuang, Zhangjiajie, dan Changsha dengan Hainan Airlines. Mengunjungi Ciqikou Ancient Town, Hongyadong, Kui Xing Tower, Liziba LRT Through the Building, Chongqing People\'s Grand Hall, Jiefangbei, Qianjiang Zhuoshui Ancient Town, Fenghuang Ancient Town (night tour), Tianmen Mountain National Forest Park (cable car, glass walkway, 99 bends road), Zhangjiajie National Forest Park (Bailong Elevator, Avatar Mountain), Tianzi Mountain, Jinbianxi, Zhangjiajie Grand Canyon Glass Bridge, dan VR experience.',
                'price' => 11990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Haikou, Chongqing, Qianjiang, Fenghuang, Zhangjiajie, Changsha, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-05 19:15'),
                'end_date' => Carbon::parse('2026-03-12 18:10'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-03-29'),
                'highlights' => [
                    'Ciqikou Ancient Town',
                    'Hongyadong (night view)',
                    'Kui Xing Tower',
                    'Liziba LRT Through the Building',
                    'Chongqing People\'s Grand Hall',
                    'Jiefangbei Pedestrian Street',
                    'Qianjiang Zhuoshui Ancient Town',
                    'Fenghuang Ancient Town (night tour, free costume experience)',
                    'Tianmen Mountain National Forest Park (cableway, glass walkway, 99 bends road)',
                    'Zhangjiajie National Forest Park (Bailong Elevator, Avatar Mountain)',
                    'Tianzi Mountain',
                    'Jinbianxi Scenic Area',
                    'Zhangjiajie Grand Canyon Glass Bridge',
                    'VR experience'
                ],
                'included' => [
                    'Tiket Internasional Hainan Airlines (economy, tax included)',
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
                    'Visa Group China Rp 800.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan',
                    'Optional: Yangtze & Jialing River Night Cruise'
                ],
                'is_recommended' => true,
                'recommendation_order' => 45,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'BEST PROMO 2026'
            ],
            [
                'name' => '8D China Chongqing Jiuzhaigou by Hainan Airlines',
                'description' => 'Tour 8 hari mengunjungi Haikou, Chongqing, Chengdu, Jiuzhaigou, Dujiangyan dengan Hainan Airlines. Mengunjungi Ciqikou Ancient Town, Jiefangbei, Hongyadong, Liziba LRT, Chongqing People\'s Grand Hall, Chunxi Road, Taikoo Li, IFS, Dujiangyan Panda Park, Danau Diexi, Jiuzhaigou Scenic Area (Lautan Lima Bunga, Kolam Lima Warna, Pantai Mutiara, Air Terjun Nourilang), Songpan Ancient Town, Yangtianwo Square, Jinli Ancient Street, dan optional Sichuan Face Changing Show.',
                'price' => 11990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Haikou, Chongqing, Chengdu, Jiuzhaigou, Dujiangyan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-13 19:15'),
                'end_date' => Carbon::parse('2026-03-20 18:10'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-03-31'),
                'highlights' => [
                    'Ciqikou Ancient Town',
                    'Jiefangbei',
                    'Hongyadong',
                    'Liziba LRT Through the Building',
                    'Chongqing People\'s Grand Hall',
                    'Chunxi Road, Taikoo Li, IFS',
                    'Dujiangyan Panda Park',
                    'Danau Diexi',
                    'Jiuzhaigou Scenic Area (Lautan Lima Bunga, Kolam Lima Warna, Pantai Mutiara, Air Terjun Nourilang)',
                    'Songpan Ancient Town',
                    'Yangtianwo Square',
                    'Jinli Ancient Street',
                    'Optional: Sichuan Face Changing Show, Jiuzhaigou Minority Show, Night Tour of Nanqiao Bridge'
                ],
                'included' => [
                    'Tiket Internasional Hainan Airlines (economy, tax included)',
                    'Bagasi sesuai ketentuan airlines',
                    'Akomodasi hotel **** lokal/setaraf (Twin/Triple)',
                    'Transportasi bus pariwisata',
                    'Tiket masuk objek wisata (termasuk transport umum di Jiuzhaigou)',
                    'Makan sesuai program (sesuai itinerary)',
                    'Mineral water 1 botol/hari',
                    'Tour Leader',
                    'Travel kits (Luggage Tag)',
                    'Travel insurance'
                ],
                'excluded' => [
                    'Visa Group China Rp 800.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan',
                    'Optional shows dan tours'
                ],
                'is_recommended' => true,
                'recommendation_order' => 46,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'CHONGQING JIUZHAI PROMO 2026'
            ],
            [
                'name' => '8D New Super Sale Beijing Shanghai by Malaysia Airlines',
                'description' => 'Tour 8 hari mengunjungi Beijing, Suzhou, Hangzhou, Wuzhen, dan Shanghai dengan Malaysia Airlines. Tersedia keberangkatan dari Jakarta, Surabaya, Denpasar, dan Medan. Mengunjungi Temple of Heaven, Tian An Men Square, Juyongguan Great Wall, Bird\'s Nest, Water Cube, Shantang Street, Jinji Lake, West Lake (kapal), Yue Fei Temple, Hefang Street, Wuzhen Watertown (kapal), TV Tower, The Bund, Xintiandi, The Thousand Tree Mall, Panlong Tiandi Town, Nanjing Road. Termasuk makan bebek Peking dan Ayam Beggar.',
                'price' => 12990000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Beijing, Suzhou, Hangzhou, Wuzhen, Shanghai, China',
                'departure_location' => 'Jakarta (CGK) / Surabaya (SUB) / Denpasar (DPS) / Medan (KNO)',
                'category_id' => 9,
                'max_participants' => 30,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-01 19:55'),
                'end_date' => Carbon::parse('2026-03-08 15:05'),
                'available_from' => Carbon::parse('2026-03-01'),
                'available_until' => Carbon::parse('2026-10-29'),
                'highlights' => [
                    'Temple of Heaven',
                    'Tian An Men Square',
                    'Juyongguan Great Wall',
                    'Bird\'s Nest (PhotoStop)',
                    'Water Cube (Outlook)',
                    'Shantang Street',
                    'Jinji Lake',
                    'West Lake (kapal)',
                    'Yue Fei Temple',
                    'Hefang Street',
                    'Wuzhen Watertown (kapal)',
                    'TV Tower (PhotoStop)',
                    'The Bund',
                    'Xintiandi',
                    'The Thousand Tree Mall',
                    'Panlong Tiandi Town',
                    'Nanjing Road',
                    'Bebek Peking',
                    'Ayam Beggar'
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
                    'Visa Group China Rp 1.000.000',
                    'Visa Single China Rp 1.000.000 (Konsulat Jakarta)',
                    'Visa Single China Rp 1.200.000 (Konsulat Surabaya/Bali)',
                    'Tipping Tour Leader, Local Guide, Driver Rp 800.000/pax',
                    'Tips porter hotel, mini bar, laundry, telepon, kelebihan bagasi',
                    'PCR Test/Rapid Test Antigen jika dibutuhkan'
                ],
                'is_recommended' => true,
                'recommendation_order' => 47,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'NEW SUPER SALE 2026'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
