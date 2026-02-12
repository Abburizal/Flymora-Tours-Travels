import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function Booking() {
    const { t } = useTranslation();
    const { tourId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isRebook = searchParams.get('rebook') === 'true';
    const isFromEstimate = searchParams.get('estimate') === 'true';
    const estimatedParticipants = parseInt(searchParams.get('participants')) || 1;
    
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [savedEstimate, setSavedEstimate] = useState(null);
    
    const [formData, setFormData] = useState({
        booking_date: '',
        number_of_participants: isFromEstimate ? estimatedParticipants : 1,
    });

    // Load saved estimate from localStorage
    useEffect(() => {
        if (isFromEstimate) {
            const estimateData = localStorage.getItem('priceEstimate');
            if (estimateData) {
                const estimate = JSON.parse(estimateData);
                // Check if estimate is recent (within 10 minutes)
                const ageMinutes = (Date.now() - estimate.timestamp) / 1000 / 60;
                if (ageMinutes < 10) {
                    setSavedEstimate(estimate);
                }
            }
        }
    }, [isFromEstimate]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        fetchTour();
    }, [tourId]);

    const fetchTour = async () => {
        try {
            const response = await api.get(`/tours/${tourId}`);
            setTour(response.data);
        } catch (err) {
            setError('Failed to load tour');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const bookingResponse = await api.post('/bookings', {
                tour_id: parseInt(tourId),
                ...formData,
            });

            const bookingId = bookingResponse.data.data.id;

            // Request payment token
            const paymentResponse = await api.post(`/payments/${bookingId}`);
            const { snap_token, redirect_url } = paymentResponse.data;

            // Check if test mode (snap_token starts with "test-")
            if (snap_token && snap_token.startsWith('test-')) {
                // Redirect to local payment simulator
                navigate(`/payment/${snap_token}`);
                return;
            }

            // Production mode: Use Midtrans Snap
            if (window.snap) {
                window.snap.pay(snap_token, {
                    onSuccess: function(result) {
                        alert('Payment successful!');
                        navigate('/dashboard');
                    },
                    onPending: function(result) {
                        alert('Payment pending. Please complete your payment.');
                        navigate('/dashboard');
                    },
                    onError: function(result) {
                        alert('Payment failed!');
                        setError('Payment failed. Please try again.');
                    },
                    onClose: function() {
                        alert('You closed the payment popup.');
                    }
                });
            } else {
                // Fallback: Open redirect URL
                window.open(redirect_url, '_blank');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setSubmitting(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateTotal = () => {
        if (!tour) return 0;
        let total = tour.price * formData.number_of_participants;
        
        // Add add-ons if from estimate
        if (savedEstimate && savedEstimate.addOns) {
            const addOnPrices = {
                insurance: 150000,
                extraMeal: 300000,
                privateGuide: 500000,
                airportTransfer: 200000,
            };
            
            Object.keys(savedEstimate.addOns).forEach(key => {
                if (savedEstimate.addOns[key]) {
                    total += addOnPrices[key] * formData.number_of_participants;
                }
            });
        }
        
        return total;
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-16 text-center">{t('common.loading')}</div>;
    }

    if (!tour) {
        return <div className="container mx-auto px-4 py-16 text-center text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            {/* Rebook Success Message */}
            {isRebook && tour && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-green-800 font-semibold">
                            ✅ {t('booking.rebookSuccess')}
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                            {t('booking.rebookMessage')}
                        </p>
                    </div>
                </div>
            )}
            
            {/* Price Estimate Success Message */}
            {isFromEstimate && tour && (
                <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p className="text-blue-800 font-semibold">
                            🎯 {t('booking.estimateLoaded') || 'Price estimate loaded!'}
                        </p>
                        <p className="text-blue-700 text-sm mt-1">
                            {t('booking.estimateMessage') || `Booking for ${estimatedParticipants} participant(s). You can adjust below.`}
                        </p>
                    </div>
                </div>
            )}
            
            <h1 className="text-3xl font-bold mb-8">{t('booking.title')}</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">{tour.name}</h2>
                <p className="text-gray-600 mb-2">📍 {tour.destination}</p>
                <p className="text-gray-600 mb-2">⏱️ {tour.duration} {t('tours.days')}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(tour.price)} / {t('booking.person') || t('tours.person')}</p>
            </div>

            {/* Saved Estimate Details */}
            {savedEstimate && savedEstimate.addOns && Object.values(savedEstimate.addOns).some(Boolean) && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 shadow-md p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        {t('booking.selectedAddOns') || 'Your Selected Add-ons'}
                    </h3>
                    <div className="space-y-2">
                        {savedEstimate.addOns.insurance && (
                            <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-blue-200">
                                <span className="text-gray-700">✈️ {t('priceEstimator.addOn.insurance')}</span>
                                <span className="font-semibold text-blue-600">{formatCurrency(150000 * formData.number_of_participants)}</span>
                            </div>
                        )}
                        {savedEstimate.addOns.extraMeal && (
                            <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-blue-200">
                                <span className="text-gray-700">🍽️ {t('priceEstimator.addOn.extraMeal')}</span>
                                <span className="font-semibold text-blue-600">{formatCurrency(300000 * formData.number_of_participants)}</span>
                            </div>
                        )}
                        {savedEstimate.addOns.privateGuide && (
                            <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-blue-200">
                                <span className="text-gray-700">👤 {t('priceEstimator.addOn.privateGuide')}</span>
                                <span className="font-semibold text-blue-600">{formatCurrency(500000 * formData.number_of_participants)}</span>
                            </div>
                        )}
                        {savedEstimate.addOns.airportTransfer && (
                            <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-blue-200">
                                <span className="text-gray-700">🚗 {t('priceEstimator.addOn.airportTransfer')}</span>
                                <span className="font-semibold text-blue-600">{formatCurrency(200000 * formData.number_of_participants)}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">
                        💡 {t('booking.addOnsNote') || 'These add-ons are included in your total price below'}
                    </p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {t('booking.bookingDate')}
                    </label>
                    <input
                        type="date"
                        value={formData.booking_date}
                        onChange={(e) => setFormData({...formData, booking_date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {t('booking.participants')}
                    </label>
                    <input
                        type="number"
                        value={formData.number_of_participants}
                        onChange={(e) => setFormData({...formData, number_of_participants: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        min="1"
                        max={tour.max_participants - tour.booked_participants}
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {t('booking.available') || 'Available'}: {tour.max_participants - tour.booked_participants} {t('tours.seatsLeft')}
                    </p>
                </div>

                <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">{t('booking.basePrice')}</span>
                        <span className="text-xl font-bold">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        {t('booking.expiresIn') || 'Booking will expire in 30 minutes after creation'}
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                >
                    {submitting ? t('common.loading') : `${t('common.submit')} ${formatCurrency(calculateTotal())}`}
                </button>
            </form>
        </div>
    );
}
