import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * CountdownTimer Component
 * Shows countdown to trip departure date with different visual states
 * 
 * @param {Date|string} startDate - Trip departure/start date
 * @param {string} tourName - Name of the tour
 * @param {string} status - Booking status (paid, completed, etc)
 * @param {string} size - Display size: 'sm' | 'md' | 'lg'
 */
export default function CountdownTimer({ startDate, tourName, status, size = 'md' }) {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState(null);
    const [tripStatus, setTripStatus] = useState('future'); // future, departing_soon, today, ongoing, past

    useEffect(() => {
        if (!startDate) return;

        const calculateTimeLeft = () => {
            const now = new Date();
            const start = new Date(startDate);
            const difference = start - now;

            // Determine trip status
            const daysUntil = Math.floor(difference / (1000 * 60 * 60 * 24));
            
            if (difference < 0) {
                setTripStatus('past');
                return null;
            } else if (daysUntil === 0) {
                setTripStatus('today');
            } else if (daysUntil <= 3) {
                setTripStatus('departing_soon');
            } else {
                setTripStatus('future');
            }

            // Calculate time components
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            return { days, hours, minutes, total: difference };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every minute
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, [startDate]);

    if (!startDate || !timeLeft) {
        // Past trip or no date
        if (status === 'completed') {
            return (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-purple-900">{t('countdown.tripCompleted')}</p>
                            <p className="text-sm text-purple-700">{t('countdown.shareExperience')}</p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    // Size variants
    const sizeClasses = {
        sm: {
            container: 'p-3',
            icon: 'w-8 h-8',
            iconText: 'w-4 h-4',
            title: 'text-sm',
            subtitle: 'text-xs',
            time: 'text-lg',
            timeLabel: 'text-xs'
        },
        md: {
            container: 'p-4',
            icon: 'w-10 h-10',
            iconText: 'w-5 h-5',
            title: 'text-base',
            subtitle: 'text-sm',
            time: 'text-2xl',
            timeLabel: 'text-xs'
        },
        lg: {
            container: 'p-6',
            icon: 'w-12 h-12',
            iconText: 'w-6 h-6',
            title: 'text-lg',
            subtitle: 'text-base',
            time: 'text-3xl',
            timeLabel: 'text-sm'
        }
    };

    const classes = sizeClasses[size];

    // Status-based styling
    const statusConfig = {
        today: {
            gradient: 'from-red-50 to-orange-50',
            border: 'border-red-200',
            iconBg: 'bg-red-500',
            textColor: 'text-red-900',
            subtextColor: 'text-red-700',
            emoji: '🎉',
            message: t('countdown.departingToday')
        },
        departing_soon: {
            gradient: 'from-orange-50 to-yellow-50',
            border: 'border-orange-200',
            iconBg: 'bg-orange-500',
            textColor: 'text-orange-900',
            subtextColor: 'text-orange-700',
            emoji: '🚀',
            message: t('countdown.departingSoon')
        },
        future: {
            gradient: 'from-blue-50 to-indigo-50',
            border: 'border-blue-200',
            iconBg: 'bg-blue-500',
            textColor: 'text-blue-900',
            subtextColor: 'text-blue-700',
            emoji: '✈️',
            message: t('countdown.upcomingTrip')
        }
    };

    const config = statusConfig[tripStatus] || statusConfig.future;

    return (
        <div className={`bg-gradient-to-r ${config.gradient} rounded-lg ${classes.container} border ${config.border}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className={`${classes.icon} ${config.iconBg} rounded-full flex items-center justify-center flex-shrink-0 ${tripStatus === 'today' ? 'animate-pulse' : ''}`}>
                    <svg className={`${classes.iconText} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className={`${classes.title} font-bold ${config.textColor}`}>
                        {config.emoji} {config.message}
                    </p>
                    <p className={`${classes.subtitle} ${config.subtextColor} line-clamp-1`}>
                        {tourName}
                    </p>
                </div>
            </div>

            {/* Countdown Display */}
            <div className="flex gap-3 justify-center">
                {/* Days */}
                {timeLeft.days > 0 && (
                    <div className="text-center">
                        <div className={`${classes.time} font-bold ${config.textColor}`}>
                            {timeLeft.days}
                        </div>
                        <div className={`${classes.timeLabel} ${config.subtextColor} font-semibold uppercase`}>
                            {timeLeft.days === 1 ? t('countdown.day') : t('countdown.days')}
                        </div>
                    </div>
                )}

                {/* Hours */}
                {timeLeft.days < 2 && (
                    <>
                        {timeLeft.days > 0 && (
                            <div className={`${classes.time} font-bold ${config.textColor} flex items-center`}>:</div>
                        )}
                        <div className="text-center">
                            <div className={`${classes.time} font-bold ${config.textColor}`}>
                                {timeLeft.hours.toString().padStart(2, '0')}
                            </div>
                            <div className={`${classes.timeLabel} ${config.subtextColor} font-semibold uppercase`}>
                                {t('countdown.hours')}
                            </div>
                        </div>
                    </>
                )}

                {/* Minutes (only for today) */}
                {tripStatus === 'today' && (
                    <>
                        <div className={`${classes.time} font-bold ${config.textColor} flex items-center`}>:</div>
                        <div className="text-center">
                            <div className={`${classes.time} font-bold ${config.textColor}`}>
                                {timeLeft.minutes.toString().padStart(2, '0')}
                            </div>
                            <div className={`${classes.timeLabel} ${config.subtextColor} font-semibold uppercase`}>
                                {t('countdown.minutes')}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Additional message for departing soon */}
            {tripStatus === 'departing_soon' && (
                <p className={`text-center mt-2 ${classes.subtitle} ${config.subtextColor} font-medium`}>
                    🎒 {t('countdown.packYourBags')}
                </p>
            )}
        </div>
    );
}
