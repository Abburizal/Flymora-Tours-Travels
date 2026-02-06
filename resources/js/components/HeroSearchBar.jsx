import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function HeroSearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions when user types
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await api.get('/tours', {
                    params: { search: query }
                });
                setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/tours?search=${encodeURIComponent(query.trim())}`);
            setShowSuggestions(false);
            setQuery('');
        }
    };

    const handleSuggestionClick = (tourId) => {
        navigate(`/tours/${tourId}`);
        setShowSuggestions(false);
        setQuery('');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="w-full max-w-3xl mx-auto" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
                {/* Search Input Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex items-center">
                        {/* Search Icon */}
                        <div className="pl-6 pr-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Input Field */}
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="Search tours by destination, name, or activity..."
                            className="flex-1 py-5 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                        />

                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="px-4">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 font-semibold text-lg transition-colors duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                        <div className="py-2">
                            {suggestions.map((tour) => (
                                <button
                                    key={tour.id}
                                    onClick={() => handleSuggestionClick(tour.id)}
                                    className="w-full px-6 py-3 hover:bg-blue-50 transition-colors text-left flex items-center gap-4 group"
                                >
                                    {/* Tour Image */}
                                    {tour.image_url ? (
                                        <img
                                            src={tour.image_url}
                                            alt={tour.name}
                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Tour Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                                            {tour.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            {tour.destination && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {tour.destination}
                                                </span>
                                            )}
                                            {tour.duration && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {tour.duration}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-xs text-gray-500 mb-1">From</div>
                                        <div className="font-bold text-blue-600">
                                            {formatPrice(tour.price)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* View All Results */}
                        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
                            <button
                                onClick={handleSearch}
                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2"
                            >
                                <span>View all results for "{query}"</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* No Results */}
                {showSuggestions && query.length >= 2 && suggestions.length === 0 && !isLoading && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                        <div className="px-6 py-8 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-600 font-medium mb-2">No tours found</p>
                            <p className="text-gray-400 text-sm">Try searching with different keywords</p>
                        </div>
                    </div>
                )}
            </form>

            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-white text-sm font-medium mr-2">Popular:</span>
                {['Bali', 'Raja Ampat', 'Bromo', 'Yogyakarta', 'Lombok'].map((keyword) => (
                    <button
                        key={keyword}
                        onClick={() => {
                            setQuery(keyword);
                            setShowSuggestions(true);
                        }}
                        className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                    >
                        {keyword}
                    </button>
                ))}
            </div>
        </div>
    );
}
