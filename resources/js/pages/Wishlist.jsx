import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../hooks/useCurrency';
import api from '../services/api';
import WishlistButton from '../components/WishlistButton';
import CompareButton from '../components/CompareButton';
import RecommendedBadge from '../components/RecommendedBadge';

const Wishlist = () => {
    const { t } = useTranslation();
    const { formatCurrency } = useCurrency();
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            console.log('🔍 Fetching wishlist...');
            console.log('Token in localStorage:', localStorage.getItem('auth_token') ? 'EXISTS' : 'MISSING');
            
            const response = await api.get('/wishlist');
            
            console.log('✅ Wishlist API Response:', response.data);
            console.log('📊 Number of wishlists:', response.data.data?.length || 0);
            
            setWishlists(response.data.data);
        } catch (error) {
            console.error('❌ Error fetching wishlist:', error);
            console.error('Error details:', error.response?.data);
            console.error('Error status:', error.response?.status);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        // Refresh wishlist after removal
        fetchWishlist();
    };

    const formatDuration = (duration) => {
        // If duration already contains "Days", "Nights", "Day", "Night", return as is
        if (/days?|nights?/i.test(duration)) {
            return duration;
        }
        // Otherwise, it's just a number, add "days"
        return `${duration} days`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">{t('wishlist.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t('wishlist.title')}</h1>
                    <p className="mt-2 text-gray-600">
                        {t('wishlist.subtitle')} ({wishlists.length})
                    </p>
                </div>

                {/* Wishlist Content */}
                {wishlists.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <svg
                            className="mx-auto h-24 w-24 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                        <h3 className="mt-4 text-xl font-medium text-gray-900">
                            {t('wishlist.empty')}
                        </h3>
                        <p className="mt-2 text-gray-500">
                            {t('wishlist.emptyDesc')}
                        </p>
                        <Link
                            to="/tours"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            {t('wishlist.exploreTours')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlists.map((wishlist) => {
                            const availableSeats = wishlist.tour.max_participants - wishlist.tour.booked_participants;
                            const isLowStock = availableSeats <= 5 && availableSeats > 0;
                            const isSoldOut = availableSeats <= 0;

                            return (
                                <div
                                    key={wishlist.id}
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                                >
                                     {/* IMAGE SECTION - Fixed Height with Proper Fallback */}
                                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                                        {wishlist.tour.image_url ? (
                                            <img
                                                src={wishlist.tour.image_url}
                                                alt={wishlist.tour.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%234299e1" width="100" height="100"/%3E%3C/svg%3E';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center">
                                                <svg className="w-20 h-20 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                        
                                        {/* Recommended Badge */}
                                        {wishlist.tour.is_recommended && (
                                            <div className="absolute top-3 left-3">
                                                <RecommendedBadge />
                                            </div>
                                        )}
                                        
                                        {/* Category Badge - Top Left with Padding */}
                                        {wishlist.tour.category && (
                                            <div className={`absolute ${wishlist.tour.is_recommended ? 'top-14' : 'top-3'} left-3 z-10`}>
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm">
                                                    🏷️ {wishlist.tour.category.name}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Wishlist Button - Top Right with Padding */}
                                        <div className="absolute top-3 right-3 z-10">
                                            <WishlistButton 
                                                tourId={wishlist.tour.id}
                                                tourName={wishlist.tour.name}
                                                size="sm"
                                                onToggle={handleRemove}
                                            />
                                        </div>

                                        {/* Status Badge - Bottom Right */}
                                        {(isSoldOut || isLowStock) && (
                                            <div className="absolute bottom-3 right-3 z-10">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                                    isSoldOut 
                                                        ? 'bg-red-500 text-white' 
                                                        : 'bg-orange-500 text-white animate-pulse'
                                                }`}>
                                                    {isSoldOut ? t('tours.soldOut') : `⚡ ${availableSeats} ${t('tours.left')}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT SECTION - Flexible with Consistent Structure */}
                                    <div className="flex flex-col flex-1 p-5">
                                        {/* Tour Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug min-h-[3.5rem]">
                                            {wishlist.tour.name}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                            {wishlist.tour.description}
                                        </p>
                                        
                                        {/* 2-Column Layout: Meta Info (Left) | Seats (Right) */}
                                        <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                                            {/* LEFT COLUMN: Meta Information */}
                                            <div className="flex-1 space-y-2">
                                                {/* Duration */}
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">{formatDuration(wishlist.tour.duration)}</span>
                                                </div>
                                                
                                                {/* Departure Location */}
                                                {wishlist.tour.departure_location && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                        </svg>
                                                        <span className="font-medium truncate">{wishlist.tour.departure_location}</span>
                                                    </div>
                                                )}
                                                
                                                {/* Destination */}
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="font-medium truncate">{wishlist.tour.destination}</span>
                                                </div>
                                            </div>
                                            
                                            {/* RIGHT COLUMN: Seats Available Highlight */}
                                            {!isSoldOut && (
                                                <div className="flex-shrink-0">
                                                    <div className={`rounded-lg px-3 py-2 text-center min-w-[90px] border-2 ${
                                                        isLowStock 
                                                            ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' 
                                                            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                                                    }`}>
                                                        <div className={`text-2xl font-bold ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                                                            {availableSeats}
                                                        </div>
                                                        <div className={`text-xs font-semibold uppercase tracking-wide ${isLowStock ? 'text-orange-700' : 'text-green-700'}`}>
                                                            {t('tours.seatsLeft')}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Price Section */}
                                        <div className="mb-4">
                                            <div className="flex items-baseline">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {formatCurrency(wishlist.tour.price)}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1 font-medium">/ {t('tours.person')}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <CompareButton tour={wishlist.tour} size="sm" variant="outline" />
                                            <Link
                                                to={`/tours/${wishlist.tour.id}`}
                                                className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                                    isSoldOut 
                                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                                                }`}
                                                onClick={(e) => isSoldOut && e.preventDefault()}
                                            >
                                                {isSoldOut ? (
                                                    <>
                                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        {t('tours.soldOut')}
                                                    </>
                                                ) : (
                                                    <>
                                                        {t('tours.viewDetails')}
                                                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
