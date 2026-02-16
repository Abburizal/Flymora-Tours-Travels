import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../hooks/useCurrency';
import api from '../services/api';

export default function ViralToursSection() {
    const { t } = useTranslation();
    const { formatCurrency } = useCurrency();
    const [viralTours, setViralTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchViralTours();
    }, []);

    const fetchViralTours = async () => {
        try {
            const response = await api.get('/tours/viral/list');
            if (response.data.success) {
                setViralTours(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching viral tours:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">{t('viral.loading', 'Loading viral tours...')}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (viralTours.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header dengan FOMO messaging */}
                <div className="text-center mb-12">
                    {/* Trending badge */}
                    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full font-bold mb-4 animate-bounce">
                        <span className="text-2xl">🔥</span>
                        <span>{t('viral.trending', 'TRENDING NOW')}</span>
                        <span className="text-2xl">🔥</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
                            {t('viral.title', 'Paket Tour VIRAL!')}
                        </span>
                    </h2>
                    
                    <p className="text-xl text-gray-700 font-semibold mb-2">
                        {t('viral.subtitle', 'Jangan Sampai Kehabisan! ⚡')}
                    </p>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t('viral.description', 'Ribuan orang sedang melihat paket ini sekarang. Booking cepat sebelum sold out!')}
                    </p>
                </div>

                {/* Viral Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {viralTours.map((tour, index) => (
                        <ViralTourCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <div className="inline-block bg-white px-6 py-4 rounded-lg shadow-lg">
                        <p className="text-gray-700 font-semibold mb-2">
                            ⚠️ {t('viral.warning', 'Harga bisa naik sewaktu-waktu!')}
                        </p>
                        <p className="text-sm text-gray-600">
                            {t('viral.cta', 'Booking sekarang dan kunci harga terbaik!')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ViralTourCard({ tour, index }) {
    const { t } = useTranslation();
    const { formatCurrency } = useCurrency();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        if (!tour.promo_end_date) {
            // Default 24 hours if no promo
            return {
                hours: 24,
                minutes: 0,
                seconds: 0
            };
        }

        const difference = new Date(tour.promo_end_date) - new Date();
        
        if (difference > 0) {
            return {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [tour.promo_end_date]);

    // Urgency level based on slots left
    const urgencyLevel = tour.slots_left ? (
        tour.slots_left <= 5 ? 'critical' :
        tour.slots_left <= 10 ? 'high' : 'medium'
    ) : 'medium';

    const urgencyColors = {
        critical: 'bg-red-600 text-white animate-pulse',
        high: 'bg-orange-500 text-white',
        medium: 'bg-yellow-500 text-gray-900'
    };

    // Rank badges
    const rankBadges = ['👑', '🥈', '🥉', '⭐', '💎'];

    return (
        <Link 
            to={`/tours/${tour.id}`}
            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
        >
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                {rankBadges[index]} #{index + 1}
            </div>

            {/* VIRAL Badge */}
            <div className="absolute top-3 right-3 z-20">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs uppercase animate-pulse shadow-lg">
                    🔥 VIRAL
                </div>
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={tour.image_url || '/images/placeholder-tour.jpg'} 
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* People viewing indicator */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                        </div>
                        <span className="text-white text-xs font-semibold ml-2">
                            👀 {tour.people_viewing} {t('viral.viewing', 'orang sedang melihat')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {tour.name}
                </h3>

                {/* Destination */}
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <span>📍</span>
                    {tour.destination}
                </p>

                {/* Urgency indicator - Slots left */}
                {tour.slots_left !== null && (
                    <div className={`${urgencyColors[urgencyLevel]} px-3 py-2 rounded-lg mb-3 text-center font-bold text-sm`}>
                        {urgencyLevel === 'critical' && '🚨 '}
                        {tour.slots_left} {t('viral.slotsLeft', 'SLOT TERSISA!')}
                        {urgencyLevel === 'critical' && ' 🚨'}
                    </div>
                )}

                {/* Progress bar */}
                {tour.booked_percentage > 0 && (
                    <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{t('viral.booked', 'Sudah dipesan')}</span>
                            <span className="font-bold text-red-600">{tour.booked_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500 animate-pulse"
                                style={{ width: `${tour.booked_percentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Countdown Timer */}
                <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-700 font-semibold mb-1 text-center">
                        ⏰ {t('viral.priceEnds', 'Harga Spesial Berakhir')}
                    </p>
                    <div className="flex justify-center gap-2">
                        <div className="text-center">
                            <div className="bg-red-600 text-white font-bold rounded px-2 py-1 min-w-[32px]">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{t('viral.hours', 'Jam')}</div>
                        </div>
                        <div className="text-red-600 font-bold text-xl">:</div>
                        <div className="text-center">
                            <div className="bg-red-600 text-white font-bold rounded px-2 py-1 min-w-[32px]">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{t('viral.minutes', 'Menit')}</div>
                        </div>
                        <div className="text-red-600 font-bold text-xl">:</div>
                        <div className="text-center">
                            <div className="bg-red-600 text-white font-bold rounded px-2 py-1 min-w-[32px]">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{t('viral.seconds', 'Detik')}</div>
                        </div>
                    </div>
                </div>

                {/* Price with discount */}
                <div className="mb-3">
                    {tour.discount_percentage > 0 ? (
                        <>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-400 line-through">
                                    {formatCurrency(tour.price)}
                                </span>
                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                                    -{tour.discount_percentage}%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency(tour.price * (1 - tour.discount_percentage / 100))}
                            </div>
                        </>
                    ) : (
                        <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(tour.price)}
                        </div>
                    )}
                    <p className="text-xs text-gray-600">{t('viral.perPerson', 'per orang')}</p>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    ⚡ {t('viral.bookNow', 'BOOK SEKARANG!')}
                </button>

                {/* Social proof */}
                {tour.bookings_count > 0 && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                        ✓ {tour.bookings_count} {t('viral.peopleBooked', 'orang sudah booking')}
                    </p>
                )}
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
            </div>
        </Link>
    );
}
