import React from 'react';

export default function TestimonialCard({ testimonial }) {
    const { name, location, rating, comment, image, tourName, date } = testimonial;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            {/* Rating Stars */}
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${
                            index < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{rating}.0</span>
            </div>

            {/* Comment */}
            <blockquote className="text-gray-700 mb-6 flex-grow leading-relaxed">
                <p className="italic">"{comment}"</p>
            </blockquote>

            {/* Tour Name (if provided) */}
            {tourName && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center text-sm text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{tourName}</span>
                    </div>
                </div>
            )}

            {/* Customer Info */}
            <div className="flex items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-blue-200">
                            <span className="text-white font-bold text-lg">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Name and Location */}
                <div className="ml-3">
                    <p className="font-semibold text-gray-800">{name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        {location && (
                            <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{location}</span>
                            </>
                        )}
                        {date && location && <span className="mx-1">•</span>}
                        {date && <span>{date}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
