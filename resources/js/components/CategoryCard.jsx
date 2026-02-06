import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
    const { name, slug, description, icon, color, image, tourCount = 0 } = category;

    // Icon mapping for categories
    const getIcon = () => {
        switch (icon || slug) {
            case 'beach':
            case 'Beach':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                );
            case 'mountain':
            case 'Mountain':
            case 'adventure':
            case 'Adventure':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                );
            case 'cultural':
            case 'Cultural':
            case 'heritage':
            case 'Heritage':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            case 'city':
            case 'City':
            case 'urban':
            case 'Urban':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            case 'nature':
            case 'Nature':
            case 'wildlife':
            case 'Wildlife':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'diving':
            case 'Diving':
            case 'water-sports':
            case 'Water Sports':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                );
            case 'family':
            case 'Family':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'honeymoon':
            case 'Honeymoon':
            case 'romantic':
            case 'Romantic':
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    // Color gradients
    const getColorClass = () => {
        switch (color || 'blue') {
            case 'blue':
                return 'from-blue-400 to-blue-600';
            case 'green':
                return 'from-green-400 to-green-600';
            case 'purple':
                return 'from-purple-400 to-purple-600';
            case 'orange':
                return 'from-orange-400 to-orange-600';
            case 'pink':
                return 'from-pink-400 to-pink-600';
            case 'teal':
                return 'from-teal-400 to-teal-600';
            case 'indigo':
                return 'from-indigo-400 to-indigo-600';
            case 'red':
                return 'from-red-400 to-red-600';
            default:
                return 'from-blue-400 to-blue-600';
        }
    };

    return (
        <Link
            to={`/tours?category=${slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
            {/* Background Image or Gradient */}
            {image ? (
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass()} group-hover:scale-110 transition-transform duration-500`}></div>
            )}

            {/* Content */}
            <div className="relative p-6 h-64 flex flex-col justify-between text-white">
                {/* Icon */}
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    {getIcon()}
                </div>

                {/* Title and Description */}
                <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-white/90 text-sm mb-3 line-clamp-2">
                            {description}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {tourCount} {tourCount === 1 ? 'Tour' : 'Tours'}
                        </span>
                        <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300">
                            <span>Explore</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
