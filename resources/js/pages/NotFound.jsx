import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <SEO 
                title="404 - Page Not Found"
                description="The page you're looking for doesn't exist or has been moved."
                noindex={true}
            />
            
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated 404 */}
                    <div className="mb-8">
                        <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                            404
                        </h1>
                    </div>

                    {/* Error Message */}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('error.pageNotFound', 'Page Not Found')}
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        {t('error.pageNotFoundDesc', "The page you're looking for doesn't exist or has been moved.")}
                    </p>

                    {/* Navigation Suggestions */}
                    <div className="mb-12">
                        <p className="text-gray-700 mb-6 font-medium">
                            {t('error.suggestions', 'Here are some helpful links instead:')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {/* Home */}
                            <Link
                                to="/"
                                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                    🏠
                                </div>
                                <div className="font-semibold text-gray-800">
                                    {t('nav.home', 'Home')}
                                </div>
                            </Link>

                            {/* Tours */}
                            <Link
                                to="/tours"
                                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                    🏝️
                                </div>
                                <div className="font-semibold text-gray-800">
                                    {t('nav.tours', 'Tours')}
                                </div>
                            </Link>

                            {/* About */}
                            <Link
                                to="/about"
                                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                    ℹ️
                                </div>
                                <div className="font-semibold text-gray-800">
                                    {t('nav.about', 'About')}
                                </div>
                            </Link>

                            {/* Contact */}
                            <Link
                                to="/contact"
                                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                    📧
                                </div>
                                <div className="font-semibold text-gray-800">
                                    {t('nav.contact', 'Contact')}
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('error.goBack', 'Go Back')}
                        </button>
                        
                        <Link
                            to="/"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {t('error.backToHome', 'Back to Home')}
                        </Link>
                    </div>

                    {/* Illustration */}
                    <div className="mt-12 opacity-50">
                        <svg 
                            className="w-64 md:w-80 mx-auto" 
                            viewBox="0 0 400 300" 
                            fill="none"
                        >
                            {/* Simple illustration placeholder */}
                            <circle cx="200" cy="150" r="100" fill="#E0E7FF" opacity="0.5"/>
                            <path 
                                d="M200 100 L200 150 M200 170 L200 180" 
                                stroke="#4F46E5" 
                                strokeWidth="8" 
                                strokeLinecap="round"
                            />
                            <circle cx="180" cy="130" r="5" fill="#4F46E5"/>
                            <circle cx="220" cy="130" r="5" fill="#4F46E5"/>
                        </svg>
                    </div>

                    {/* Search Suggestion */}
                    <div className="mt-8 text-sm text-gray-500">
                        <p>
                            {t('error.searchHelp', 'Looking for something specific? Try our search or browse tours.')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
