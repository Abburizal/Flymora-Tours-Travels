import React, { useState, useEffect } from 'react';

export default function PromoBadge({ tour, position = 'top-left' }) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!tour.promo_end_date) return;

        const calculateTimeLeft = () => {
            const endDate = new Date(tour.promo_end_date);
            const now = new Date();
            const difference = endDate - now;

            if (difference <= 0) {
                return null;
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            if (!newTimeLeft) {
                clearInterval(timer);
            }
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, [tour.promo_end_date]);

    if (!tour.discount_percentage || (tour.promo_end_date && timeLeft === null)) {
        return null;
    }

    const positionClasses = {
        'top-left': 'top-2 left-2',
        'top-right': 'top-2 right-2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2',
    };

    const discountedPrice = tour.price - (tour.price * tour.discount_percentage / 100);

    return (
        <div className={`absolute ${positionClasses[position]} z-20`}>
            {/* Discount Badge */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-sm flex items-center gap-1.5 animate-pulse">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span>{tour.discount_percentage}% OFF</span>
            </div>

            {/* Promo Label (if exists) */}
            {tour.promo_label && (
                <div className="mt-1 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-md shadow-md font-bold text-xs uppercase tracking-wider">
                    {tour.promo_label}
                </div>
            )}

            {/* Countdown Timer */}
            {timeLeft && (
                <div className="mt-1 bg-gray-900 bg-opacity-90 text-white px-2.5 py-1.5 rounded-md shadow-lg text-xs font-mono">
                    <div className="flex items-center gap-1 mb-0.5">
                        <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wide text-gray-300">Ends in</span>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        {timeLeft.days > 0 && (
                            <>
                                <span className="text-white font-bold">{timeLeft.days}</span>
                                <span className="text-gray-400 text-[10px]">d</span>
                            </>
                        )}
                        <span className="text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-white font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                </div>
            )}

            {/* Price Display */}
            <div className="mt-1 bg-green-500 text-white px-2.5 py-1 rounded-md shadow-lg text-xs font-bold">
                <div className="line-through text-green-200 text-[10px]">
                    Rp {tour.price.toLocaleString('id-ID')}
                </div>
                <div className="text-sm">
                    Rp {discountedPrice.toLocaleString('id-ID')}
                </div>
            </div>
        </div>
    );
}
