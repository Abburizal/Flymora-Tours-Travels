import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import WishlistButton from '../components/WishlistButton';

const Wishlist = () => {
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
                        <p className="mt-4 text-gray-600">Loading wishlist...</p>
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
                    <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                    <p className="mt-2 text-gray-600">
                        Tours you've saved for later ({wishlists.length})
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
                            Your wishlist is empty
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Start adding tours to your wishlist by clicking the heart icon
                        </p>
                        <Link
                            to="/tours"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Browse Tours
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlists.map((wishlist) => (
                            <div
                                key={wishlist.id}
                                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Tour Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={wishlist.tour.images?.[0] || wishlist.tour.image_url || '/images/placeholder.jpg'}
                                        alt={wishlist.tour.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    
                                    {/* Category Badge */}
                                    {wishlist.tour.category && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm">
                                                🏷️ {wishlist.tour.category.name}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {/* Wishlist Button */}
                                    <div className="absolute top-3 right-3">
                                        <WishlistButton 
                                            tourId={wishlist.tour.id}
                                            size="sm"
                                        />
                                    </div>
                                </div>

                                {/* Tour Info */}
                                <div className="p-5">
                                    <Link to={`/tours/${wishlist.tour.id}`}>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {wishlist.tour.name}
                                        </h3>
                                    </Link>
                                    
                                    {/* Info Grid */}
                                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                                        {/* Duration */}
                                        <div className="flex items-center text-sm text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{formatDuration(wishlist.tour.duration)}</span>
                                        </div>
                                        
                                        {/* Destination */}
                                        <div className="flex items-center text-sm text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium truncate">{wishlist.tour.destination}</span>
                                        </div>
                                        
                                        {/* Seats Available */}
                                        <div className="flex items-center text-sm text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span className="font-medium text-green-600">
                                                {wishlist.tour.max_participants - wishlist.tour.booked_participants} seats available
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Price Section */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline">
                                            <span className="text-2xl font-bold text-blue-600">
                                                IDR {wishlist.tour.price.toLocaleString('id-ID')}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1 font-medium">/ person</span>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/tours/${wishlist.tour.id}`}
                                            className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            View Details
                                            <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                        <Link
                                            to={`/booking/${wishlist.tour.id}`}
                                            className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
