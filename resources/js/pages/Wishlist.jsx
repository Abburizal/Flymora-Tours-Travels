import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WishlistButton from '../components/WishlistButton';

const Wishlist = () => {
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlists(response.data.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        // Refresh wishlist after removal
        fetchWishlist();
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
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
                            >
                                <Link to={`/tours/${wishlist.tour.id}`} className="block">
                                    {/* Tour Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={wishlist.tour.images?.[0] || '/images/placeholder.jpg'}
                                            alt={wishlist.tour.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Wishlist Button */}
                                        <div className="absolute top-2 right-2 bg-white rounded-full shadow-lg">
                                            <WishlistButton 
                                                tourId={wishlist.tour.id}
                                                size="sm"
                                            />
                                        </div>
                                        {/* Category Badge */}
                                        {wishlist.tour.category && (
                                            <div className="absolute bottom-2 left-2">
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                    {wishlist.tour.category.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tour Info */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                                            {wishlist.tour.name}
                                        </h3>
                                        
                                        <div className="space-y-2 text-sm text-gray-600">
                                            {/* Duration */}
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span>{wishlist.tour.duration}</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                                <span className="text-xs text-gray-500">Starting from</span>
                                                <span className="text-xl font-bold text-blue-600">
                                                    IDR {wishlist.tour.price.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Action Buttons */}
                                <div className="px-4 pb-4 flex gap-2">
                                    <Link
                                        to={`/tours/${wishlist.tour.id}`}
                                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/booking/${wishlist.tour.id}`}
                                        className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                    >
                                        Book Now
                                    </Link>
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
