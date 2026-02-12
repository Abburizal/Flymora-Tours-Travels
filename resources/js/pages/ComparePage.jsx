import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCompare } from '../context/CompareContext';

const ComparePageEnhanced = () => {
    const { t } = useTranslation();
    const { compareTours, removeFromCompare, clearCompare } = useCompare();
    const navigate = useNavigate();
    const [showShareDialog, setShowShareDialog] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Track comparison analytics
    useEffect(() => {
        if (compareTours.length >= 2 && window.gtag) {
            window.gtag('event', 'view_comparison', {
                event_category: 'Tour Comparison',
                tours_compared: compareTours.length,
                tour_ids: compareTours.map(t => t.id).join(',')
            });
        }
    }, [compareTours]);

    if (compareTours.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {t('compare.empty.title', 'No tours to compare')}
                        </h3>
                        <p className="mt-2 text-gray-600 text-lg">
                            {t('compare.empty.subtitle', 'Add 2-3 tours to compare their features side-by-side')}
                        </p>
                        <p className="mt-4 text-gray-500">
                            Compare prices, duration, highlights, and make the best choice for your adventure!
                        </p>
                        <Link
                            to="/tours"
                            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {t('compare.empty.browseTours', 'Browse Tours')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDuration = (duration) => {
        if (/days?|nights?/i.test(duration)) {
            return duration;
        }
        return `${duration} days`;
    };

    // Calculate best values
    const lowestPrice = Math.min(...compareTours.map(t => t.price));
    const highestRated = Math.max(...compareTours.map(t => t.average_rating || 0));
    const mostPopular = Math.max(...compareTours.map(t => t.booked_participants || 0));

    // Share comparison
    const handleShare = () => {
        const tourIds = compareTours.map(t => t.id).join(',');
        const shareUrl = `${window.location.origin}/compare?tours=${tourIds}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Tour Comparison - Flymora',
                text: `Compare ${compareTours.length} amazing tours!`,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert(t('compare.linkCopied', 'Comparison link copied to clipboard!'));
        }
    };

    // Print comparison
    const handlePrint = () => {
        if (window.gtag) {
            window.gtag('event', 'print_comparison', {
                event_category: 'Tour Comparison',
                tours_count: compareTours.length
            });
        }
        window.print();
    };

    // Get winner badge
    const getWinnerBadge = (tour) => {
        const badges = [];
        
        if (tour.price === lowestPrice) {
            badges.push({
                text: t('compare.badges.bestPrice', 'Best Price'),
                color: 'bg-green-500',
                icon: '💰'
            });
        }
        
        if ((tour.average_rating || 0) === highestRated && highestRated > 0) {
            badges.push({
                text: t('compare.badges.topRated', 'Top Rated'),
                color: 'bg-yellow-500',
                icon: '⭐'
            });
        }
        
        if ((tour.booked_participants || 0) === mostPopular && mostPopular > 0) {
            badges.push({
                text: t('compare.badges.mostPopular', 'Most Popular'),
                color: 'bg-purple-500',
                icon: '🔥'
            });
        }
        
        return badges;
    };

    // Render star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<span key={i} className="text-yellow-400">½</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        
        return stars;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 print:pt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white print:hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                {t('compare.title', 'Compare Tours')}
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {t('compare.comparing', 'Comparing {{count}} tour', { count: compareTours.length })}
                                {compareTours.length !== 1 ? 's' : ''} side-by-side
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition border border-white/30"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                {t('compare.share', 'Share')}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition border border-white/30"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                {t('compare.print', 'Print')}
                            </button>
                            <button
                                onClick={() => navigate('/tours')}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 hover:bg-gray-50 rounded-lg transition font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                {t('compare.addMore', 'Add More')}
                            </button>
                            <button
                                onClick={clearCompare}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition border border-red-300"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {t('compare.clearAll', 'Clear All')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Comparison Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-20">
                                <tr>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 sticky left-0 bg-gradient-to-r from-gray-50 to-gray-100 z-30 min-w-[220px] border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            {t('compare.table.feature', 'Feature')}
                                        </div>
                                    </th>
                                    {compareTours.map((tour) => (
                                        <th key={tour.id} className="px-6 py-5 text-left min-w-[320px] border-r border-gray-200 last:border-r-0">
                                            <div className="flex flex-col gap-3">
                                                {/* Winner Badges */}
                                                {getWinnerBadge(tour).length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {getWinnerBadge(tour).map((badge, idx) => (
                                                            <span 
                                                                key={idx}
                                                                className={`${badge.color} text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md flex items-center gap-1`}
                                                            >
                                                                <span>{badge.icon}</span>
                                                                <span>{badge.text}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => removeFromCompare(tour.id)}
                                                    className="self-end text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 print:hidden"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    {t('compare.table.remove', 'Remove')}
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* Tour Images */}
                                <tr className="bg-white hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {t('compare.table.image', 'Image')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <div className="relative group">
                                                <img
                                                    src={tour.image_url || '/images/placeholder.jpg'}
                                                    alt={tour.name}
                                                    className="w-full h-48 object-cover rounded-xl shadow-md group-hover:shadow-xl transition"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition"></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Tour Names */}
                                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            {t('compare.table.tourName', 'Tour Name')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <Link
                                                to={`/tours/${tour.id}`}
                                                className="text-xl font-bold text-blue-600 hover:text-blue-700 hover:underline block"
                                            >
                                                {tour.name}
                                            </Link>
                                            {tour.description && (
                                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{tour.description}</p>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr className="bg-white hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            {t('compare.table.category', 'Category')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                {tour.category?.name || 'N/A'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Price with Highlight */}
                                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('compare.table.price', 'Price')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className={`px-6 py-4 border-r border-gray-200 last:border-r-0 ${tour.price === lowestPrice ? 'bg-green-50' : ''}`}>
                                            <div className="text-3xl font-bold text-green-600">
                                                {formatCurrency(tour.price)}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">{t('compare.table.perPerson', 'per person')}</div>
                                            {tour.price === lowestPrice && (
                                                <div className="mt-2 inline-flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Lowest Price
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating */}
                                <tr className="bg-white hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                            {t('compare.table.rating', 'Rating')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => {
                                        const rating = tour.average_rating || 0;
                                        const reviewCount = tour.reviews_count || 0;
                                        
                                        return (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-2xl flex">{renderStars(rating)}</div>
                                                </div>
                                                <div className="mt-1 text-lg font-semibold text-gray-900">{rating.toFixed(1)} / 5.0</div>
                                                <div className="text-sm text-gray-500">
                                                    {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Duration */}
                                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('compare.table.duration', 'Duration')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 p-3 rounded-lg">
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">{formatDuration(tour.duration)}</div>
                                                    <div className="text-sm text-gray-500">Tour duration</div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Destination */}
                                <tr className="bg-white hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {t('compare.table.destination', 'Destination')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-red-100 p-3 rounded-lg">
                                                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">{tour.destination || 'N/A'}</div>
                                                    <div className="text-sm text-gray-500">Main destination</div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Group Size */}
                                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {t('compare.table.maxParticipants', 'Group Size')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-3 rounded-lg">
                                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">{tour.max_participants}</div>
                                                    <div className="text-sm text-gray-500">Max group size</div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Available Seats */}
                                <tr className="bg-white hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('compare.table.availability', 'Availability')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => {
                                        const available = tour.max_participants - (tour.booked_participants || 0);
                                        const percentBooked = Math.round(((tour.booked_participants || 0) / tour.max_participants) * 100);
                                        const isLow = available <= 5 && available > 0;
                                        const isSoldOut = available <= 0;
                                        
                                        return (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                <div className="space-y-3">
                                                    <div className={`
                                                        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold
                                                        ${isSoldOut ? 'bg-red-100 text-red-800' :
                                                          isLow ? 'bg-yellow-100 text-yellow-800' :
                                                          'bg-green-100 text-green-800'}
                                                    `}>
                                                        {isSoldOut ? (
                                                            <>
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                                                </svg>
                                                                {t('compare.table.soldOut', 'Sold Out')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                {available} seats left
                                                            </>
                                                        )}
                                                    </div>
                                                    {!isSoldOut && (
                                                        <div>
                                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                                <span>{percentBooked}% booked</span>
                                                                <span>{tour.booked_participants || 0}/{tour.max_participants}</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div 
                                                                    className={`h-2 rounded-full ${isSoldOut ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                                    style={{ width: `${percentBooked}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Popularity Score */}
                                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            {t('compare.table.popularity', 'Popularity')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => {
                                        const booked = tour.booked_participants || 0;
                                        const isPop = booked === mostPopular && booked > 0;
                                        
                                        return (
                                            <td key={tour.id} className={`px-6 py-4 border-r border-gray-200 last:border-r-0 ${isPop ? 'bg-purple-50' : ''}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-orange-100 p-3 rounded-lg">
                                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-gray-900">{booked} travelers</div>
                                                        <div className="text-sm text-gray-500">Have booked this</div>
                                                        {isPop && (
                                                            <div className="mt-1 inline-flex items-center gap-1 text-xs bg-purple-500 text-white px-3 py-1 rounded-full font-semibold">
                                                                🔥 Most Popular
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Departure Location */}
                                {compareTours.some(t => t.departure_location) && (
                                    <tr className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                </svg>
                                                {t('compare.table.departure', 'Departure Point')}
                                            </div>
                                        </td>
                                        {compareTours.map((tour) => (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                    </svg>
                                                    <span className="font-medium">{tour.departure_location || 'Not specified'}</span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                )}

                                {/* Highlights */}
                                {compareTours.some(t => t.highlights && t.highlights.length > 0) && (
                                    <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                                {t('compare.table.highlights', 'Highlights')}
                                            </div>
                                        </td>
                                        {compareTours.map((tour) => (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                {tour.highlights && tour.highlights.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {tour.highlights.slice(0, 5).map((highlight, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                        {tour.highlights.length > 5 && (
                                                            <li className="text-sm text-blue-600 font-medium ml-6 cursor-pointer hover:underline">
                                                                +{tour.highlights.length - 5} more highlights...
                                                            </li>
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-400 italic">No highlights listed</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )}

                                {/* What's Included */}
                                {compareTours.some(t => t.included && t.included.length > 0) && (
                                    <tr className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {t('compare.table.included', "What's Included")}
                                            </div>
                                        </td>
                                        {compareTours.map((tour) => (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                {tour.included && tour.included.length > 0 ? (
                                                    <ul className="space-y-1.5">
                                                        {tour.included.slice(0, 5).map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                        {tour.included.length > 5 && (
                                                            <li className="text-sm text-blue-600 font-medium ml-7 cursor-pointer hover:underline">
                                                                +{tour.included.length - 5} more included...
                                                            </li>
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-400 italic">Not specified</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )}

                                {/* What's Excluded */}
                                {compareTours.some(t => t.excluded && t.excluded.length > 0) && (
                                    <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {t('compare.table.excluded', "What's Excluded")}
                                            </div>
                                        </td>
                                        {compareTours.map((tour) => (
                                            <td key={tour.id} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                                                {tour.excluded && tour.excluded.length > 0 ? (
                                                    <ul className="space-y-1.5">
                                                        {tour.excluded.slice(0, 5).map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                        {tour.excluded.length > 5 && (
                                                            <li className="text-sm text-blue-600 font-medium ml-7 cursor-pointer hover:underline">
                                                                +{tour.excluded.length - 5} more excluded...
                                                            </li>
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-400 italic">Not specified</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )}

                                {/* Actions */}
                                <tr className="bg-white">
                                    <td className="px-6 py-6 text-sm font-semibold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            {t('compare.table.actions', 'Quick Actions')}
                                        </div>
                                    </td>
                                    {compareTours.map((tour) => (
                                        <td key={tour.id} className="px-6 py-6 border-r border-gray-200 last:border-r-0">
                                            <div className="flex flex-col gap-3">
                                                <Link
                                                    to={`/tours/${tour.id}`}
                                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition text-sm font-semibold shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {t('compare.table.viewDetails', 'View Details')}
                                                </Link>
                                                <Link
                                                    to={`/booking/${tour.id}`}
                                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition text-sm font-semibold shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {t('compare.table.bookNow', 'Book Now')}
                                                </Link>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Smart Recommendations */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
                    {/* Best for Budget */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Best for Budget</h3>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">{compareTours.find(t => t.price === lowestPrice)?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">Lowest price at {formatCurrency(lowestPrice)}</p>
                    </div>

                    {/* Top Rated */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Top Rated</h3>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">{compareTours.find(t => (t.average_rating || 0) === highestRated)?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">Highest rating at {highestRated.toFixed(1)}/5.0</p>
                    </div>

                    {/* Most Popular */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Most Popular</h3>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">{compareTours.find(t => (t.booked_participants || 0) === mostPopular)?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{mostPopular} travelers have booked</p>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
                    <Link
                        to="/tours"
                        className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('compare.backToTours', 'Back to Tours')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComparePageEnhanced;
