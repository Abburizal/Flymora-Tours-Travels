import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState(''); // '', 'loading', 'success', 'error'
    const [subscribeMessage, setSubscribeMessage] = useState('');

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleLinkClick = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setSubscribeStatus('error');
            setSubscribeMessage('Please enter a valid email address');
            setTimeout(() => setSubscribeStatus(''), 3000);
            return;
        }

        setSubscribeStatus('loading');

        try {
            // TODO: Implement API call to save newsletter subscription
            // await api.post('/newsletter/subscribe', { email });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubscribeStatus('success');
            setSubscribeMessage('Thank you for subscribing!');
            setEmail('');
            setTimeout(() => setSubscribeStatus(''), 5000);
        } catch (error) {
            setSubscribeStatus('error');
            setSubscribeMessage('Something went wrong. Please try again.');
            setTimeout(() => setSubscribeStatus(''), 3000);
        }
    };

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                        <p className="text-blue-100 mb-6">
                            Get exclusive deals, travel tips, and destination inspiration delivered to your inbox
                        </p>
                        
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                                disabled={subscribeStatus === 'loading'}
                            />
                            <button
                                type="submit"
                                disabled={subscribeStatus === 'loading'}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>

                        {/* Status Messages */}
                        {subscribeStatus === 'success' && (
                            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                                ✓ {subscribeMessage}
                            </div>
                        )}
                        {subscribeStatus === 'error' && (
                            <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg inline-block">
                                ✗ {subscribeMessage}
                            </div>
                        )}

                        <p className="text-blue-100 text-sm mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img 
                                src="/images/logo.svg" 
                                alt="Flymora Tours and Travels" 
                                className="h-10"
                            />
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner for unforgettable travel experiences around the world.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="bg-gray-700 hover:bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center transition" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-pink-600 w-9 h-9 rounded-full flex items-center justify-center transition" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-blue-400 w-9 h-9 rounded-full flex items-center justify-center transition" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/tours')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Tours
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('about')} 
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/faq')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    FAQ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/contact')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/terms-of-service')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Terms of Service
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/privacy-policy')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/faq')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Refund Policy
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@flymoratours.com" className="hover:text-white transition">
                                    info@flymoratours.com
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+6282189905173" className="hover:text-white transition">
                                    +62 821 8990 5173
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Jl. Sudirman No. 123<br />Jakarta, Indonesia 12190</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods & Trust Badges */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="mb-6">
                        <h5 className="text-sm font-semibold text-gray-400 mb-3 text-center">We Accept</h5>
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {/* Midtrans */}
                            <div className="bg-white px-4 py-2 rounded flex items-center justify-center h-12 min-w-[80px]">
                                <span className="text-blue-600 font-bold text-sm">Midtrans</span>
                            </div>
                            {/* Visa */}
                            <div className="bg-white px-4 py-2 rounded flex items-center justify-center h-12 min-w-[60px]">
                                <span className="text-blue-800 font-bold text-lg">VISA</span>
                            </div>
                            {/* Mastercard */}
                            <div className="bg-white px-4 py-2 rounded flex items-center justify-center h-12 min-w-[60px]">
                                <div className="flex items-center gap-1">
                                    <div className="w-6 h-6 rounded-full bg-red-600 opacity-80"></div>
                                    <div className="w-6 h-6 rounded-full bg-orange-400 opacity-80 -ml-3"></div>
                                </div>
                            </div>
                            {/* GoPay */}
                            <div className="bg-blue-600 px-4 py-2 rounded flex items-center justify-center h-12 min-w-[70px]">
                                <span className="text-white font-bold text-sm">GoPay</span>
                            </div>
                            {/* OVO */}
                            <div className="bg-purple-600 px-4 py-2 rounded flex items-center justify-center h-12 min-w-[60px]">
                                <span className="text-white font-bold text-sm">OVO</span>
                            </div>
                            {/* Dana */}
                            <div className="bg-blue-500 px-4 py-2 rounded flex items-center justify-center h-12 min-w-[60px]">
                                <span className="text-white font-bold text-sm">DANA</span>
                            </div>
                            {/* Bank Transfer */}
                            <div className="bg-white px-4 py-2 rounded flex items-center justify-center h-12 min-w-[80px]">
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="text-gray-700 font-semibold text-xs">Bank</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Trusted by 1,200+ Customers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>24/7 Customer Support</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 Flymora Tours and Travels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
