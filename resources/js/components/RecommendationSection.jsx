import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';
import { useCurrency } from '../hooks/useCurrency';
import api from '../services/api';

/**
 * RecommendationSection Component
 * Displays a section of recommended tours with title
 */
export default function RecommendationSection({ 
    type = 'trending', 
    tourId = null, 
    title, 
    description,
    limit = 6,
    className = '' 
}) {
    const { t } = useTranslation();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const { trackRecommendationClick } = useAnalytics();

    useEffect(() => {
        fetchRecommendations();
    }, [type, tourId, limit]);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            let endpoint = '';

            switch (type) {
                case 'for-you':
                    endpoint = '/recommendations/for-you';
                    break;
                case 'also-viewed':
                    endpoint = `/recommendations/also-viewed/${tourId}`;
                    break;
                case 'similar':
                    endpoint = `/recommendations/similar/${tourId}`;
                    break;
                case 'complete-trip':
                    endpoint = `/recommendations/complete-trip/${tourId}`;
                    break;
                case 'trending':
                default:
                    endpoint = '/recommendations/trending';
            }

            const response = await api.get(`${endpoint}?limit=${limit}`);
            setTours(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            setTours([]);
        } finally {
            setLoading(false);
        }
    };

    const handleTourClick = async (tour) => {
        // Track recommendation click
        trackRecommendationClick(tour, type, tourId);

        // Track in backend for analytics
        try {
            await api.post('/recommendations/track', {
                tour_id: tour.id,
                recommendation_type: type,
                source_id: tourId
            });
        } catch (error) {
            console.error('Failed to track recommendation:', error);
        }
    };

    if (loading) {
        return (
            <div className={`py-8 ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!tours || tours.length === 0) {
        return null;
    }

    return (
        <div className={`py-8 ${className}`}>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {title || getDefaultTitle(type, t)}
                </h2>
                {description && (
                    <p className="text-gray-600">{description}</p>
                )}
            </div>

            {/* Tour Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map(tour => (
                    <RecommendationCard 
                        key={tour.id} 
                        tour={tour} 
                        onClick={() => handleTourClick(tour)}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * RecommendationCard Component
 * Individual tour card for recommendations
 */
function RecommendationCard({ tour, onClick }) {
    const { t } = useTranslation();
    const { formatCurrency } = useCurrency();
    const imageUrl = tour.media && tour.media.length > 0
        ? tour.media[0].original_url
        : '/images/placeholder-tour.jpg';

    const rating = tour.reviews_avg_rating 
        ? parseFloat(tour.reviews_avg_rating).toFixed(1) 
        : null;

    return (
        <Link 
            to={`/tours/${tour.id}`}
            onClick={onClick}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                />
                
                {/* Category Badge */}
                {tour.category && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800 backdrop-blur-sm">
                            {tour.category.name}
                        </span>
                    </div>
                )}

                {/* Rating Badge */}
                {rating && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                            ⭐ {rating}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Tour Name */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {tour.name}
                </h3>

                {/* Destination */}
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {tour.destination}
                </p>

                {/* Duration & Price */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        {tour.duration} {t('recommendations.days')}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(parseFloat(tour.price))}
                    </span>
                </div>

                {/* Reviews Count */}
                {tour.reviews_count > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                        {tour.reviews_count} {t('recommendations.reviews')}
                    </p>
                )}
            </div>
        </Link>
    );
}

/**
 * Get default title based on recommendation type
 */
function getDefaultTitle(type, t) {
    const titles = {
        'for-you': `🎯 ${t('recommendations.forYou')}`,
        'also-viewed': `👥 ${t('recommendations.alsoViewed')}`,
        'similar': `🔍 ${t('recommendations.similar')}`,
        'complete-trip': `✨ ${t('recommendations.completeTrip')}`,
        'trending': `🔥 ${t('recommendations.trending')}`
    };
    return titles[type] || t('recommendations.forYou');
}
