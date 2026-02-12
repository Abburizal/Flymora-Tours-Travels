import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { OrganizationSchema, WebsiteSearchSchema } from '../components/Schema';
import TestimonialCard from '../components/TestimonialCard';
import CategoryCard from '../components/CategoryCard';
import RecommendedBadge from '../components/RecommendedBadge';
import PromoBadge from '../components/PromoBadge';
import HeroSearchBar from '../components/HeroSearchBar';
import api from '../services/api';
import { useCurrency } from '../hooks/useCurrency';

export default function Home() {
    const { t } = useTranslation();
    const { formatCurrency } = useCurrency();
    const location = useLocation();
    const [bestSellerTours, setBestSellerTours] = useState([]);
    const [promoTours, setPromoTours] = useState([]);
    const [loadingTours, setLoadingTours] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Popular Categories Data (with attractive icons and colors)
    const popularCategories = [
        {
            id: 1,
            name: 'Beach Paradise',
            slug: 'beach',
            description: 'Explore pristine beaches and tropical islands with crystal clear waters',
            icon: 'beach',
            color: 'blue',
            tourCount: 24
        },
        {
            id: 2,
            name: 'Mountain Adventure',
            slug: 'mountain',
            description: 'Conquer peaks and enjoy breathtaking views from the mountains',
            icon: 'mountain',
            color: 'green',
            tourCount: 18
        },
        {
            id: 3,
            name: 'Cultural Heritage',
            slug: 'cultural',
            description: 'Immerse yourself in rich history and local traditions',
            icon: 'cultural',
            color: 'purple',
            tourCount: 32
        },
        {
            id: 4,
            name: 'City Exploration',
            slug: 'city',
            description: 'Discover vibrant cities and modern attractions',
            icon: 'city',
            color: 'orange',
            tourCount: 21
        },
        {
            id: 5,
            name: 'Nature & Wildlife',
            slug: 'nature',
            description: 'Get close to nature and observe amazing wildlife',
            icon: 'nature',
            color: 'teal',
            tourCount: 15
        },
        {
            id: 6,
            name: 'Honeymoon Romance',
            slug: 'honeymoon',
            description: 'Create unforgettable memories with your loved one',
            icon: 'honeymoon',
            color: 'pink',
            tourCount: 12
        }
    ];

    // Testimonial data
    const testimonials = [
        {
            id: 1,
            name: 'Budi Santoso',
            location: 'Jakarta',
            rating: 5,
            comment: 'Pengalaman yang luar biasa! Tour guide sangat ramah dan profesional. Destinasi yang dikunjungi sangat indah dan sesuai dengan ekspektasi. Highly recommended!',
            tourName: 'Bali Paradise 5D4N',
            date: 'January 2026',
            image: null
        },
        {
            id: 2,
            name: 'Siti Nurhaliza',
            location: 'Surabaya',
            rating: 5,
            comment: 'Pelayanan terbaik yang pernah saya dapatkan. Semua diatur dengan rapi dari awal sampai akhir. Hotelnya bagus, makanannya enak, dan itinerary-nya pas banget!',
            tourName: 'Yogyakarta Cultural Tour',
            date: 'December 2025',
            image: null
        },
        {
            id: 3,
            name: 'Andi Wijaya',
            location: 'Bandung',
            rating: 5,
            comment: 'Worth it banget! Harganya sangat terjangkau tapi kualitasnya premium. Tim Flymora sangat responsif dan helpful. Pasti akan booking lagi untuk trip berikutnya.',
            tourName: 'Bromo Sunrise Adventure',
            date: 'January 2026',
            image: null
        },
        {
            id: 4,
            name: 'Maya Putri',
            location: 'Medan',
            rating: 5,
            comment: 'Trip impian saya jadi kenyataan! Terima kasih Flymora sudah mengatur semuanya dengan sempurna. Foto-fotonya bagus semua, memories yang tak terlupakan!',
            tourName: 'Raja Ampat Diving Trip',
            date: 'November 2025',
            image: null
        },
        {
            id: 5,
            name: 'Rudi Hartono',
            location: 'Semarang',
            rating: 5,
            comment: 'Pelayanan customer service sangat baik, fast response dan solutif. Proses booking mudah dan pembayarannya aman. Akan merekomendasikan ke teman dan keluarga!',
            tourName: 'Lombok Beach Escape',
            date: 'December 2025',
            image: null
        },
        {
            id: 6,
            name: 'Dewi Lestari',
            location: 'Bali',
            rating: 5,
            comment: 'Paket tour terlengkap dengan harga bersahabat. Guide lokal sangat menguasai area dan memberikan insight menarik. Transportasi nyaman dan tepat waktu. Sangat puas!',
            tourName: 'Java Heritage Tour',
            date: 'January 2026',
            image: null
        }
    ];

    useEffect(() => {
        // Handle scroll after navigation from footer
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    // Fetch best seller tours
    useEffect(() => {
        fetchBestSellerTours();
    }, []);

    const fetchBestSellerTours = async () => {
        try {
            const response = await api.get('/tours');
            // Get first 10 tours (best sellers)
            const tours = response.data.slice(0, 10);
            setBestSellerTours(tours);
            
            // Filter promo tours (tours with active discount)
            const now = new Date();
            const toursWithPromo = tours.filter(tour => {
                if (!tour.discount_percentage) return false;
                if (!tour.promo_end_date) return true; // No end date = always active
                const endDate = new Date(tour.promo_end_date);
                return endDate > now;
            });
            setPromoTours(toursWithPromo);
        } catch (error) {
            console.error('Error fetching best seller tours:', error);
        } finally {
            setLoadingTours(false);
        }
    };

    // Note: formatCurrency is now imported from useCurrency hook

    const formatDuration = (duration) => {
        if (/days?|nights?/i.test(duration)) {
            return duration;
        }
        const days = parseInt(duration);
        if (isNaN(days)) return duration;
        const nights = Math.max(0, days - 1);
        return `${days}D ${nights}N`;
    };

    return (
        <div>
            <SEO 
                title="Home - Tripin Travel | Your Adventure Starts Here"
                description="Explore the world's most amazing destinations with Tripin Travel. Find and book your perfect tour package from our curated selection of adventures across Asia, Europe, and beyond."
                keywords="travel tours, vacation packages, adventure travel, tour booking, holiday packages, international tours, Asia tours, Europe tours, travel agency"
                url="/"
            />
            <OrganizationSchema />
            <WebsiteSearchSchema />
            
            {/* Hero Section */}
            <section 
                className="relative bg-cover bg-center text-white py-24 min-h-[600px] flex items-center"
                style={{
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
                
                {/* Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-lg">
                        {t('home.hero.subtitle')}
                    </p>
                    
                    {/* Search Bar */}
                    <HeroSearchBar />
                    
                    {/* Browse Tours Link - Secondary CTA */}
                    <div className="mt-6">
                        <Link
                            to="/tours"
                            className="text-white hover:text-blue-200 font-semibold text-sm inline-flex items-center gap-2 transition-colors"
                        >
                            <span>{t('home.hero.browseAll')}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promo/Deals Section */}
            {promoTours.length > 0 && (
                <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
                    <div className="container mx-auto px-4">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
                                <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-bold text-sm uppercase tracking-wider">Flash Deals</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                {t('home.promoDeals')}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {t('home.promoDesc')}
                            </p>
                        </div>

                        {/* Promo Tours Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {promoTours.slice(0, 6).map((tour) => {
                                const discountedPrice = tour.price - (tour.price * tour.discount_percentage / 100);
                                const imageUrl = tour.image 
                                    ? `/storage/${tour.image}`
                                    : tour.images?.[0]
                                    ? `/storage/${tour.images[0]}`
                                    : '/images/default-tour.jpg';

                                return (
                                    <div key={tour.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                                        {/* Tour Image with Badges */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={tour.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = '/images/default-tour.jpg';
                                                }}
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            
                                            {/* Promo Badge */}
                                            <PromoBadge tour={tour} position="top-left" />
                                            
                                            {/* Recommended Badge (if applicable) */}
                                            {tour.is_recommended && (
                                                <div className="absolute top-2 right-2 z-20">
                                                    <RecommendedBadge />
                                                </div>
                                            )}
                                        </div>

                                        {/* Tour Details */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                                                    {tour.name}
                                                </h3>
                                            </div>

                                            <div className="flex items-center text-gray-600 mb-4 text-sm">
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-medium">{tour.destination}</span>
                                                <span className="mx-3 text-gray-400">•</span>
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{tour.duration}</span>
                                            </div>

                                            {/* Price Section */}
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                                <div>
                                                    <div className="text-sm text-gray-500 line-through mb-1">
                                                        Rp {tour.price.toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="text-2xl font-bold text-green-600">
                                                        Rp {discountedPrice.toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{t('home.perPerson')}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                                                        {t('home.save')} Rp {(tour.price - discountedPrice).toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <Link
                                                to={`/tours/${tour.id}`}
                                                className="block w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                                            >
                                                {t('home.grabDeal')}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Promos Button */}
                        {promoTours.length > 6 && (
                            <div className="text-center mt-12">
                                <Link
                                    to="/tours?promo=true"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <span>{t('home.seeAll')} ({promoTours.length})</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Best Seller Tours Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {t('home.bestSellers')}
                            </h2>
                            <p className="text-gray-600">
                                {t('home.bestSellersDesc')}
                            </p>
                        </div>
                        <Link
                            to="/tours"
                            className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 group"
                        >
                            <span>{t('home.seeAll')}</span>
                            <svg 
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {loadingTours ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                                    <div className="w-full h-40 bg-gray-300"></div>
                                    <div className="p-3">
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {bestSellerTours.map((tour) => {
                                const imageUrl = tour.image 
                                    ? `/storage/${tour.image}`
                                    : tour.images?.[0]
                                    ? `/storage/${tour.images[0]}`
                                    : '/images/default-tour.jpg';

                                // Calculate discounted price if promo exists
                                const hasActivePromo = tour.discount_percentage && 
                                    (!tour.promo_end_date || new Date(tour.promo_end_date) > new Date());
                                const discountedPrice = hasActivePromo
                                    ? tour.price - (tour.price * tour.discount_percentage / 100)
                                    : tour.price;

                                return (
                                <Link
                                    key={tour.id}
                                    to={`/tours/${tour.id}`}
                                    className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden h-40">
                                        <img
                                            src={imageUrl}
                                            alt={tour.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/images/default-tour.jpg';
                                            }}
                                        />
                                        
                                        {/* Promo Badge (if has active promo) */}
                                        {hasActivePromo && (
                                            <div className="absolute top-2 left-2 z-20">
                                                <div className="bg-red-600 text-white px-2 py-1 rounded-md shadow-lg font-bold text-xs animate-pulse">
                                                    -{tour.discount_percentage}%
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Recommended Badge */}
                                        {tour.is_recommended && (
                                            <div className={`absolute ${hasActivePromo ? 'top-10' : 'top-2'} left-2 z-10`}>
                                                <RecommendedBadge />
                                            </div>
                                        )}
                                        
                                        {/* Category Badge */}
                                        <div className={`absolute ${tour.is_recommended ? 'top-12' : 'top-2'} left-2`}>
                                            <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-gray-800">
                                                {tour.category?.name}
                                            </span>
                                        </div>
                                        
                                        {/* Duration Badge */}
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                {formatDuration(tour.duration)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3">
                                        {/* Tour Name */}
                                        <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[40px]">
                                            {tour.name}
                                        </h3>

                                        {/* Location */}
                                        {tour.departure_location && (
                                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="truncate">{tour.departure_location}</span>
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">{t('home.startingFrom')}</p>
                                                <p className="text-orange-600 font-bold text-base">
                                                    {formatCurrency(tour.price)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating (if available) */}
                                        {tour.average_rating > 0 && (
                                            <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
                                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xs font-semibold text-gray-700">
                                                    {tour.average_rating.toFixed(1)}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-1">
                                                    ({tour.review_count})
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Action on Hover */}
                                    <div className="px-3 pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700 transition-colors">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* View All Mobile */}
                    <div className="text-center mt-8 md:hidden">
                        <Link
                            to="/tours"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {t('home.seeAll')} Paket Tour
                        </Link>
                    </div>
                </div>
            </section>

            {/* Popular Categories Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            {t('home.categories.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('home.categories.subtitle')}
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {popularCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-6">
                            Can't find what you're looking for? 
                            <Link to="/tours" className="text-blue-600 font-semibold hover:text-blue-700 ml-2">
                                Browse all tours →
                            </Link>
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-1">120+</div>
                                <div className="text-sm text-gray-600">Total Tours</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">50+</div>
                                <div className="text-sm text-gray-600">Destinations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-1">6</div>
                                <div className="text-sm text-gray-600">Categories</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-1">1,200+</div>
                                <div className="text-sm text-gray-600">Happy Travelers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">About Flymora</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Your trusted partner in creating extraordinary travel experiences since 2024
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        {/* Company Story */}
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h3>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded with a passion for exploration and a commitment to exceptional service, 
                                    Flymora Tours & Travels has been transforming dreams into reality for travelers 
                                    from around the world.
                                </p>
                                <p>
                                    We believe that travel is more than just visiting new places—it's about immersing 
                                    yourself in different cultures, creating lasting memories, and discovering the 
                                    extraordinary in every journey.
                                </p>
                                <p>
                                    With carefully curated tours, expert local guides, and a dedication to sustainability, 
                                    we ensure every adventure is unforgettable, comfortable, and enriching.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                                <div className="text-gray-700 font-semibold">Happy Travelers</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                                <div className="text-gray-700 font-semibold">Destinations</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
                                <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
                                <div className="text-gray-700 font-semibold">Average Rating</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl text-center">
                                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                                <div className="text-gray-700 font-semibold">Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Vision & Mission */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <h3 className="text-2xl font-bold">Our Vision</h3>
                            </div>
                            <p className="text-blue-100 leading-relaxed">
                                To be the world's most trusted travel partner, inspiring millions to explore, 
                                discover, and connect with the beauty and diversity of our planet while promoting 
                                sustainable and responsible tourism.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <h3 className="text-2xl font-bold">Our Mission</h3>
                            </div>
                            <p className="text-green-100 leading-relaxed">
                                To deliver exceptional travel experiences through personalized service, expert guidance, 
                                and innovative solutions, while supporting local communities and preserving the natural 
                                and cultural heritage of the destinations we serve.
                            </p>
                        </div>
                    </div>

                    {/* Our Values */}
                    <div className="mb-20">
                        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-gray-800">Customer First</h4>
                                <p className="text-gray-600 text-sm">Your satisfaction is our top priority</p>
                            </div>

                            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-gray-800">Integrity</h4>
                                <p className="text-gray-600 text-sm">Honest and transparent in all we do</p>
                            </div>

                            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-gray-800">Sustainability</h4>
                                <p className="text-gray-600 text-sm">Committed to eco-friendly practices</p>
                            </div>

                            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-gray-800">Innovation</h4>
                                <p className="text-gray-600 text-sm">Continuously improving our services</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Team */}
                    <div>
                        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="relative mb-4 overflow-hidden rounded-xl">
                                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl mb-1 text-gray-800">Sarah Johnson</h4>
                                <p className="text-blue-600 font-semibold mb-2">CEO & Founder</p>
                                <p className="text-gray-600 text-sm">
                                    Passionate traveler with 15+ years in the tourism industry
                                </p>
                            </div>

                            <div className="text-center group">
                                <div className="relative mb-4 overflow-hidden rounded-xl">
                                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl mb-1 text-gray-800">Michael Chen</h4>
                                <p className="text-green-700 font-semibold mb-2">Operations Manager</p>
                                <p className="text-gray-600 text-sm">
                                    Expert in logistics and ensuring seamless travel experiences
                                </p>
                            </div>

                            <div className="text-center group">
                                <div className="relative mb-4 overflow-hidden rounded-xl">
                                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl mb-1 text-gray-800">Emily Rodriguez</h4>
                                <p className="text-purple-600 font-semibold mb-2">Customer Relations</p>
                                <p className="text-gray-600 text-sm">
                                    Dedicated to providing exceptional customer support
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Best Destinations</h3>
                            <p className="text-gray-600">
                                Carefully curated tours to the world's most beautiful places
                            </p>
                        </div>

                        <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
                            <p className="text-gray-600">
                                Competitive pricing with no hidden fees
                            </p>
                        </div>

                        <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
                            <p className="text-gray-600">
                                Safe and secure payment with Midtrans
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            {t('home.testimonials.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('home.testimonials.subtitle')}
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>

                    {/* Overall Stats */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
                                <div className="text-gray-700 font-semibold">Average Rating</div>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
                                <div className="text-gray-700 font-semibold">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">850+</div>
                                <div className="text-gray-700 font-semibold">Reviews</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                                <div className="text-gray-700 font-semibold">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-8">
                        <Link
                            to="/tours"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Mulai Petualangan Anda</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section 
                id="contact" 
                className="relative py-20 text-white overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/contact-img.png)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60"></div>
                </div>
                
                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Get In Touch</h2>
                        <p className="text-xl text-blue-100 drop-shadow">
                            Have questions? We're here to help you plan your perfect adventure
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Email */}
                        <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl hover:bg-opacity-20 transition">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                            <a href="mailto:info@flymora.com" className="text-blue-200 hover:text-white transition" aria-label="Email us at info@flymora.com">
                                info@flymora.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl hover:bg-opacity-20 transition">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                            <a href="tel:+6282189905173" className="text-blue-200 hover:text-white transition" aria-label="Call us at +62 821 8990 5173">
                                +62 821 8990 5173
                            </a>
                        </div>

                        {/* Office */}
                        <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl hover:bg-opacity-20 transition">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                            <p className="text-blue-200">
                                Jl. Sudirman No. 123<br />
                                Jakarta, Indonesia 12190
                            </p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="text-center mt-12">
                        <p className="text-white mb-6 text-lg drop-shadow">Follow us on social media</p>
                        <div className="flex justify-center gap-4">
                            <a href="#" className="bg-white hover:bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" aria-label="Follow us on Facebook">
                                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="bg-white hover:bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" aria-label="Follow us on Instagram">
                                <svg className="w-7 h-7 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="bg-white hover:bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" aria-label="Follow us on Twitter">
                                <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of satisfied travelers and book your dream tour today
                    </p>
                    <Link
                        to="/tours"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 inline-block"
                    >
                        View All Tours
                    </Link>
                </div>
            </section>
        </div>
    );
}
