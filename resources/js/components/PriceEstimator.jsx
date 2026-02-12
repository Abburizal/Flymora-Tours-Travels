import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function PriceEstimator({ tour, onEstimateChange }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const [participants, setParticipants] = useState(1);
    const [addOns, setAddOns] = useState({
        insurance: false,
        extraMeal: false,
        privateGuide: false,
        airportTransfer: false,
    });
    
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [animatePrice, setAnimatePrice] = useState(false);

    // Add-on prices (can be dynamic from backend later)
    const addOnPrices = {
        insurance: 150000,
        extraMeal: 300000,
        privateGuide: 500000,
        airportTransfer: 200000,
    };

    const calculateTotal = () => {
        let total = tour.price * participants;
        
        Object.keys(addOns).forEach(key => {
            if (addOns[key]) {
                total += addOnPrices[key] * participants;
            }
        });
        
        return total;
    };

    const calculateSubtotal = () => {
        return tour.price * participants;
    };

    const calculateAddOnsTotal = () => {
        let total = 0;
        Object.keys(addOns).forEach(key => {
            if (addOns[key]) {
                total += addOnPrices[key] * participants;
            }
        });
        return total;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleParticipantsChange = (value) => {
        const newValue = Math.max(1, Math.min(tour.max_participants || 50, value));
        setParticipants(newValue);
        triggerAnimation();
    };

    const handleAddOnToggle = (key) => {
        setAddOns({ ...addOns, [key]: !addOns[key] });
        triggerAnimation();
    };

    const triggerAnimation = () => {
        setAnimatePrice(true);
        setTimeout(() => setAnimatePrice(false), 300);
    };

    const handleBookWithEstimate = () => {
        // Store estimate in localStorage for pre-filling
        localStorage.setItem('priceEstimate', JSON.stringify({
            participants,
            addOns,
            total: calculateTotal(),
            timestamp: Date.now()
        }));
        
        // Track event
        if (window.gtag) {
            window.gtag('event', 'price_estimate_book', {
                tour_id: tour.id,
                tour_name: tour.name,
                participants,
                estimated_price: calculateTotal(),
                add_ons_count: Object.values(addOns).filter(Boolean).length
            });
        }
        
        navigate(`/booking/${tour.id}?estimate=true&participants=${participants}`);
    };

    // Notify parent component of estimate changes
    useEffect(() => {
        if (onEstimateChange) {
            onEstimateChange({
                participants,
                addOns,
                total: calculateTotal(),
                subtotal: calculateSubtotal(),
                addOnsTotal: calculateAddOnsTotal()
            });
        }
    }, [participants, addOns]);

    const availableSeats = tour.max_participants - (tour.booked_participants || 0);
    const isFullyBooked = availableSeats <= 0;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {t('priceEstimator.title') || 'Smart Price Calculator'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t('priceEstimator.subtitle') || 'Customize your package and see real-time pricing'}
                    </p>
                </div>
            </div>

            {/* Participants Selector */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👥 {t('priceEstimator.participants') || 'Number of Participants'}
                </label>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleParticipantsChange(participants - 1)}
                        disabled={participants <= 1}
                        className="w-12 h-12 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xl"
                    >
                        −
                    </button>
                    <div className="flex-1 text-center">
                        <input
                            type="number"
                            value={participants}
                            onChange={(e) => handleParticipantsChange(parseInt(e.target.value) || 1)}
                            className="w-full text-center text-2xl font-bold bg-white border-2 border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                            min="1"
                            max={tour.max_participants || 50}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {t('priceEstimator.maxParticipants') || 'Max'}: {tour.max_participants || 50} | 
                            {' '}{t('priceEstimator.available') || 'Available'}: {availableSeats}
                        </p>
                    </div>
                    <button
                        onClick={() => handleParticipantsChange(participants + 1)}
                        disabled={participants >= (tour.max_participants || 50) || participants >= availableSeats}
                        className="w-12 h-12 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xl"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ✨ {t('priceEstimator.addOns') || 'Optional Add-ons'}
                </label>
                <div className="space-y-2">
                    {Object.keys(addOns).map((key) => (
                        <label
                            key={key}
                            className={`flex items-center justify-between p-3 bg-white rounded-lg border-2 cursor-pointer transition-all ${
                                addOns[key] 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={addOns[key]}
                                    onChange={() => handleAddOnToggle(key)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {t(`priceEstimator.addOn.${key}`) || key.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatCurrency(addOnPrices[key])} / {t('priceEstimator.perPerson') || 'person'}
                                    </p>
                                </div>
                            </div>
                            <span className="font-bold text-blue-600">
                                {formatCurrency(addOnPrices[key] * participants)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-6">
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                    <span>📊 {t('priceEstimator.showBreakdown') || 'Show Price Breakdown'}</span>
                    <svg 
                        className={`w-5 h-5 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {showBreakdown && (
                    <div className="mt-3 bg-white rounded-lg p-4 border border-gray-200 space-y-2 animate-fade-in">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                {t('priceEstimator.basePrice') || 'Base Price'} × {participants}
                            </span>
                            <span className="font-semibold">{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        
                        {Object.keys(addOns).filter(key => addOns[key]).map(key => (
                            <div key={key} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    {t(`priceEstimator.addOn.${key}`)} × {participants}
                                </span>
                                <span className="font-semibold text-blue-600">
                                    +{formatCurrency(addOnPrices[key] * participants)}
                                </span>
                            </div>
                        ))}
                        
                        <div className="border-t pt-2 flex justify-between font-bold">
                            <span>{t('priceEstimator.totalEstimate') || 'Total Estimate'}</span>
                            <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Total Price Display */}
            <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mb-4 text-white transition-transform ${
                animatePrice ? 'scale-105' : 'scale-100'
            }`}>
                <p className="text-sm font-semibold mb-1 opacity-90">
                    {t('priceEstimator.estimatedTotal') || 'Estimated Total Price'}
                </p>
                <p className="text-4xl font-bold">
                    {formatCurrency(calculateTotal())}
                </p>
                <p className="text-xs mt-2 opacity-75">
                    {t('priceEstimator.disclaimer') || 'Final price may vary based on availability and season'}
                </p>
            </div>

            {/* Book Button */}
            <button
                onClick={handleBookWithEstimate}
                disabled={isFullyBooked}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    isFullyBooked
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl transform hover:scale-105'
                }`}
            >
                {isFullyBooked 
                    ? `😔 ${t('priceEstimator.fullyBooked') || 'Fully Booked'}`
                    : `🎯 ${t('priceEstimator.bookNow') || 'Book Now with This Estimate'}`
                }
            </button>
            
            {isFullyBooked && (
                <p className="text-center text-sm text-red-600 mt-2">
                    {t('priceEstimator.fullyBookedMessage') || 'This tour is fully booked. Please check other dates.'}
                </p>
            )}
        </div>
    );
}
