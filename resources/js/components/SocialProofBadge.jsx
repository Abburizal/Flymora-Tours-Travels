import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SocialProofBadge Component
 * Shows booking statistics to build trust and urgency
 * 
 * @param {number} bookedCount - Number of booked participants
 * @param {number} maxParticipants - Maximum participants allowed
 * @param {string} variant - Display variant: 'card' | 'detail' | 'compact'
 * @param {string} className - Additional CSS classes
 */
export default function SocialProofBadge({ 
    bookedCount = 0, 
    maxParticipants = 0, 
    variant = 'card',
    className = '' 
}) {
    const { t } = useTranslation();
    
    const availableSeats = maxParticipants - bookedCount;
    const bookingPercentage = maxParticipants > 0 ? (bookedCount / maxParticipants) * 100 : 0;
    
    // Determine popularity level
    const isPopular = bookingPercentage >= 70; // 70%+ booked = popular
    const isHot = bookingPercentage >= 90; // 90%+ booked = hot
    const hasBookings = bookedCount > 0;
    
    // Don't show if no bookings
    if (!hasBookings) return null;
    
    // Variant: Compact (for small spaces)
    if (variant === 'compact') {
        return (
            <div className={`inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 ${className}`}>
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{bookedCount} {t('socialProof.booked')}</span>
            </div>
        );
    }
    
    // Variant: Card (for tour cards)
    if (variant === 'card') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {/* Icon + Text */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="font-medium">
                        {bookedCount} {t('socialProof.travelers')}
                    </span>
                </div>
                
                {/* Popular Badge */}
                {isPopular && (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        isHot 
                            ? 'bg-red-100 text-red-700 animate-pulse' 
                            : 'bg-orange-100 text-orange-700'
                    }`}>
                        🔥 {t('socialProof.popular')}
                    </span>
                )}
            </div>
        );
    }
    
    // Variant: Detail (for tour detail page)
    if (variant === 'detail') {
        return (
            <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 ${className}`}>
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                                {bookedCount} {t('socialProof.travelersBooked')}
                            </h3>
                            {isPopular && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                                    isHot 
                                        ? 'bg-red-500 text-white animate-pulse' 
                                        : 'bg-orange-500 text-white'
                                }`}>
                                    🔥 {t('socialProof.hotTour')}
                                </span>
                            )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                            {t('socialProof.joinOthers')}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                                    isHot 
                                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                                        : isPopular 
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                }`}
                                style={{ width: `${Math.min(bookingPercentage, 100)}%` }}
                            />
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                            {Math.round(bookingPercentage)}% {t('socialProof.booked')} • {availableSeats} {t('socialProof.seatsLeft')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    return null;
}
