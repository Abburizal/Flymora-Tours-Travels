<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Carbon\Carbon;

class ChinaToursSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'name' => '8D Chongqing Wulong Pengshui',
                'description' => 'Perjalanan 8 hari mengunjungi Chongqing, Wulong, dan Pengshui. Menikmati keindahan Tiankeng Three Bridges, Fairy Mountain, Budaya Suku Miao di Chiyou Jiuli, dan keunikan arsitektur Chongqing seperti Kuixing Building, Hongya Cave, serta sensasi kereta yang menembus gedung di Liziba.',
                'price' => 12900000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Chongqing, Wulong, Pengshui, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-02 16:40'),
                'end_date' => Carbon::parse('2026-02-09 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-15'),
                'highlights' => [
                    'Tiankeng Three Bridges (3 natural stone arch bridges)',
                    'Fairy Mountain "Oriental Switzerland"',
                    'Chiyou Jiuli - Budaya Suku Miao',
                    'Long Table Banquet khas Suku Miao',
                    'Wujiang River Gallery',
                    'Hongya Cave & arsitektur Diaojiaolou',
                    'Liziba Light Rail Through The Building',
                    'Pipa Yuan Hot Pot - restoran hot pot terbesar di dunia'
                ],
                'included' => [
                    'Tiket internasional Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel bintang 4 (twin share)',
                    'Transportasi bus AC',
                    'Admission fee objek wisata',
                    'Airport tax',
                    'Air mineral',
                    'Asuransi perjalanan group (max 84 thn)',
                    'Tour Leader dari Jakarta',
                    'Guide berbahasa Inggris'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Optional tour',
                    'Tipping TL, guide, driver Rp 816.000',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 32,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '8D Chongqing Xian Terracotta Warriors',
                'description' => 'Perjalanan 8 hari mengunjungi dua kota bersejarah China: Chongqing dan Xian. Menjelajahi kemegahan Terracotta Warriors, tembok kota Xian, serta keunikan Chongqing dengan kereta yang menembus gedung dan arsitektur khas Bayu.',
                'price' => 14900000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Chongqing, Xian, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-02 16:40'),
                'end_date' => Carbon::parse('2026-02-09 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-15'),
                'highlights' => [
                    'Museum of Qin Terracotta Warriors (8.000 patung prajurit)',
                    'Xi\'an City Wall - benteng pertahanan kuno',
                    'Giant Wild Goose Pagoda',
                    'Grand Tang Dynasty Ever Bright City',
                    'Muslim Street & kuliner khas Xian',
                    'Kuixing Building - gedung unik 22 lantai',
                    'Liziba Light Rail Through The Building',
                    'Hongya Cave & arsitektur Diaojiaolou',
                    'Bullet Train Xian-Chongqing'
                ],
                'included' => [
                    'Tiket internasional Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel bintang 4 (twin share)',
                    'Transportasi bus AC',
                    'Bullet train Xian-Chongqing',
                    'Admission fee objek wisata',
                    'Airport tax',
                    'Air mineral',
                    'Asuransi perjalanan group (max 84 thn)',
                    'Tour Leader dari Jakarta',
                    'Guide berbahasa Inggris'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Optional tour (Camel Bell Legend, Two Rivers Night Tour, Chongqing.1949 Show)',
                    'Tipping TL, guide, driver Rp 816.000',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 33,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '8D Chongqing Zhangjiajie Furong Zhen',
                'description' => 'Perjalanan 8 hari menjelajahi keindahan alam Zhangjiajie yang menginspirasi film Avatar, kota kuno Fenghuang dan Furong yang berusia 2000 tahun, serta keunikan kota Chongqing.',
                'price' => 12900000,
                'duration' => '8 Days 7 Nights',
                'destination' => 'Chongqing, Zhangjiajie, Fenghuang, Pengshui, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 24,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-02-02 16:40'),
                'end_date' => Carbon::parse('2026-02-09 15:40'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-06-15'),
                'highlights' => [
                    'Fenghuang Ancient Town - kota Phoenix berusia 1300 tahun',
                    'Furong Ancient Town - kota di atas tebing & air terjun (2000 thn)',
                    '72 Tujia Stilted Buildings - arsitektur suku Tujia',
                    'Zhangjiajie National Forest Park (inspirasi Avatar)',
                    'Bailong Elevator - lift di dalam gunung',
                    'Tianzishan Mountain - "Gunung Avatar"',
                    'Golden Whip Brook',
                    'Grand Canyon Glass Bridge - jembatan kaca terkenal',
                    'Kuixing Building & Liziba Light Rail',
                    'Hongya Cave & Pipa Yuan Hot Pot'
                ],
                'included' => [
                    'Tiket internasional Xiamen Airlines CGK-CKG-CGK',
                    'Bagasi 23kg + 5kg handcarry',
                    'Hotel (twin share)',
                    'Transportasi bus AC',
                    'Admission fee objek wisata (termasuk VR+Glass Bridge+Boat di Grand Canyon)',
                    'Airport tax',
                    'Air mineral',
                    'Asuransi perjalanan group (max 84 thn)',
                    'Tour Leader dari Jakarta',
                    'Guide berbahasa Inggris'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Optional tour (Tianmen Mountain, Tianmen Fox Fairy Show)',
                    'Tipping TL, guide, driver Rp 816.000',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 34,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '9D Majestic Yunnan Shangrila + Yulong Snow Mountain',
                'description' => 'Perjalanan 9 hari menjelajahi keindahan Yunnan: Stone Forest, Dali Ancient Town, Jade Dragon Snow Mountain, hingga Shangrila. Nikmati pengalaman Royal Banquet dan pemandangan spektakuler Tiger Leaping Gorge.',
                'price' => 21990000,
                'duration' => '9 Days 8 Nights',
                'destination' => 'Kunming, Chuxiong, Dali, Lijiang, Shangrila, Aning, Yunnan, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 25,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-22 18:05'),
                'end_date' => Carbon::parse('2026-03-31 06:30'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-22'),
                'highlights' => [
                    'Stone Forest - batuan kapur unik',
                    'Dali Ideal Land "Santorini China"',
                    'Danau Erhai + Flower Sea Jeep Tour',
                    'Dali Ancient Town & Foreigner Street',
                    'Xizhou Ancient Town - arsitektur Bai',
                    'Jade Dragon Snow Mountain (Glacier cable car)',
                    'Blue Moon Valley',
                    'Lijiang Ancient Town',
                    'Royal Banquet dinner dengan pertunjukan',
                    'First Bend of Yangtze River',
                    'Tiger Leaping Gorge',
                    'Ganden Songzanlin Monastery',
                    'Dukezong Ancient Town',
                    'Hot Spring di Aning'
                ],
                'included' => [
                    'Tiket Citilink CGK-KMG-CGK charter',
                    'Bagasi 15kg + 5kg handcarry',
                    'Hotel (twin share)',
                    'Transportasi bus AC',
                    'Makan sesuai itinerary (MP,MS,MM)',
                    'Airport tax & fuel surcharge',
                    'Air mineral',
                    'Kunjungan 3 toko wajib',
                    'Tour Leader dari Jakarta'
                ],
                'excluded' => [
                    'Visa group China Rp 980.000 ++',
                    'Tipping TL, guide, driver Rp 850.000',
                    'Asuransi perjalanan group',
                    'Optional tour (Impression of Lijiang, Eternal Love, dll)',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 35,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => null
            ],
            [
                'name' => '9D8N Explore Chongqing Chengdu Jiuzhaigou Flower Season',
                'description' => 'Perjalanan 9 hari menjelajahi keindahan Jiuzhaigou di musim bunga, Huanglong Scenic Area, Panda Base di Chengdu, serta keunikan kota Chongqing. Termasuk bullet train dan kunjungan ke Manhua Manor dengan hamparan bunga warna-warni.',
                'price' => 24590000,
                'duration' => '9 Days 8 Nights',
                'destination' => 'Chengdu, Jiuzhaigou, Huanglong, Dujiangyan, Chongqing, China',
                'departure_location' => 'Jakarta (CGK Airport)',
                'category_id' => 9,
                'max_participants' => 20,
                'booked_participants' => 0,
                'start_date' => Carbon::parse('2026-03-20 09:05'),
                'end_date' => Carbon::parse('2026-03-29 12:10'),
                'available_from' => Carbon::parse('2026-01-01'),
                'available_until' => Carbon::parse('2026-03-20'),
                'highlights' => [
                    'Jiuzhaigou Scenic Area (Panda Lake, Five Flowers Lake, Pearl Shoals)',
                    'Huanglong Scenic Area - UNESCO World Heritage',
                    'Diexi Lake - danau terbentuk akibat gempa',
                    'Songpan Ancient Town (Dinasti Ming)',
                    'Panda Base Chengdu',
                    'Manhua Manor - hamparan bunga warna-warni',
                    'South Bridge Dujiangyan - cahaya biru di malam hari',
                    'Liziba Light Railway & Ciqikou Ancient Town',
                    'Kuixing Tower 22nd floor & Raffles City',
                    'Eighteen-Ladder Old Street',
                    'GRATIS VISA CHINA GROUP'
                ],
                'included' => [
                    'Tiket China Southern CGK-CAN-CTU / CKG-CAN-CGK',
                    'Bagasi 20kg',
                    'Hotel bintang 4 (twin/triple share)',
                    'Transportasi bus AC',
                    'Bullet train Huanglong-Chengdu',
                    'Admission fee objek wisata',
                    'Makan sesuai itinerary (MP,MS,MM)',
                    'Airport tax',
                    'Asuransi perjalanan group (max 69 thn)',
                    'Tour Leader'
                ],
                'excluded' => [
                    'Visa group China Rp 1.000.000',
                    'Tipping TL, guide, driver Rp 850.000',
                    'Pengeluaran pribadi',
                    'Excess baggage',
                    'Optional tour',
                    'PPN 1,1%'
                ],
                'is_recommended' => true,
                'recommendation_order' => 36,
                'discount_percentage' => 0,
                'promo_end_date' => null,
                'promo_label' => 'GRATIS VISA GROUP'
            ]
        ];

        foreach ($tours as $tour) {
            Tour::create($tour);
        }
    }
}
