import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import SubmitReview from '../components/SubmitReview';
import CountdownTimer from '../components/CountdownTimer';

export default function Dashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const paymentSuccess = searchParams.get('payment') === 'success';
    
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState({});
    const [showSuccessBanner, setShowSuccessBanner] = useState(paymentSuccess);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        fetchBookings();
        
        // Auto-hide success banner after 8 seconds
        if (paymentSuccess) {
            const timer = setTimeout(() => {
                setShowSuccessBanner(false);
                setSearchParams({}); // Remove ?payment=success from URL
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [paymentSuccess]);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            setBookings(response.data.data);
        } catch (err) {
            console.error('Failed to load bookings', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handlePayment = async (bookingId) => {
        try {
            const response = await api.post(`/payments/${bookingId}`);
            const { snap_token, redirect_url } = response.data;

            // Check if test mode (snap_token starts with "test-")
            if (snap_token && snap_token.startsWith('test-')) {
                // Redirect to local payment simulator
                navigate(`/payment/${snap_token}`);
                return;
            }

            // Production mode: Use Midtrans Snap
            if (window.snap) {
                window.snap.pay(snap_token, {
                    onSuccess: function() {
                        alert('Payment successful!');
                        fetchBookings();
                    },
                    onPending: function() {
                        alert('Payment pending.');
                        fetchBookings();
                    },
                    onError: function() {
                        alert('Payment failed!');
                    },
                });
            } else {
                // Fallback: Open redirect URL in new tab
                window.open(redirect_url, '_blank');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to process payment');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="text-xl">{t('common.loading')}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Payment Success Banner */}
            {showSuccessBanner && (
                <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-2xl p-6 animate-fade-in border-4 border-green-300">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-bounce">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                🎉 {t('dashboard.paymentSuccess') || 'Payment Successful!'}
                            </h3>
                            <p className="text-green-50 text-lg mb-3">
                                {t('dashboard.paymentSuccessMessage') || 'Your booking is confirmed! E-ticket has been sent to your email.'}
                            </p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                <span className="bg-white/20 px-3 py-1 rounded-full">✅ {t('dashboard.bookingConfirmed') || 'Booking Confirmed'}</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full">📧 {t('dashboard.emailSent') || 'E-ticket Sent'}</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full">🎫 {t('dashboard.readyToGo') || 'Ready to Go!'}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSuccessBanner(false)}
                            className="text-white hover:text-green-100 transition-colors flex-shrink-0"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            
            <div className="mb-8">
                <h1 className="text-3xl font-bold">{t('dashboard.myBookings')}</h1>
                <p className="text-gray-600">{t('dashboard.welcome')}, {user?.name}!</p>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-600 mb-4">{t('dashboard.noBookings')}</p>
                    <a href="/tours" className="text-blue-600 hover:underline">
                        {t('dashboard.startExploring')}
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                            {/* Countdown Timer for paid/upcoming bookings */}
                            {(booking.status === 'paid' && booking.tour?.start_date) && (
                                <div className="mb-4">
                                    <CountdownTimer 
                                        startDate={booking.tour.start_date}
                                        tourName={booking.tour.name}
                                        status={booking.status}
                                        size="md"
                                    />
                                </div>
                            )}
                            
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl font-bold mb-2">{booking.tour?.name}</h3>
                                    <p className="text-gray-600">📍 {booking.tour?.destination}</p>
                                    <p className="text-gray-600">📅 {formatDate(booking.booking_date)}</p>
                                    <p className="text-gray-600">👥 {booking.number_of_participants} {t('booking.participants')}</p>
                                </div>
                                <div className="text-right">
                                    {getStatusBadge(booking.status)}
                                    <p className="text-2xl font-bold text-blue-600 mt-2">
                                        {formatCurrency(booking.total_price)}
                                    </p>
                                </div>
                            </div>

                            {booking.status === 'pending' && (
                                <div className="border-t pt-4">
                                    <p className="text-sm text-gray-600 mb-3">
                                        ⏰ {t('dashboard.expires')}: {booking.expired_at ? formatDate(booking.expired_at) : 'N/A'}
                                    </p>
                                    <button
                                        onClick={() => handlePayment(booking.id)}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {t('booking.confirmBooking')}
                                    </button>
                                </div>
                            )}

                            {(booking.status === 'paid' || booking.status === 'completed') && (
                                <div className="border-t pt-4">
                                    <div className="flex flex-wrap gap-3">
                                        {/* Rebook Button - Only for completed */}
                                        {booking.status === 'completed' && booking.tour && (
                                            <button
                                                onClick={() => handleRebook(booking.tour.id, booking.tour.name)}
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                {t('dashboard.bookAgain')}
                                            </button>
                                        )}
                                        
                                        {/* Review Button */}
                                        {!showReviewForm[booking.id] ? (
                                            <button
                                                onClick={() => setShowReviewForm({...showReviewForm, [booking.id]: true})}
                                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all"
                                            >
                                                ⭐ {t('dashboard.writeReview')}
                                            </button>
                                        ) : (
                                            <div className="w-full">
                                                <button
                                                    onClick={() => setShowReviewForm({...showReviewForm, [booking.id]: false})}
                                                    className="mb-4 text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                                                >
                                                    ← {t('dashboard.hideReviewForm')}
                                                </button>
                                                <SubmitReview
                                                    booking={booking}
                                                    onSubmitted={(review) => {
                                                        setShowReviewForm({...showReviewForm, [booking.id]: false});
                                                        alert(t('dashboard.reviewThanks') || '✅ Thank you for your review!');
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
