import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import Swal from 'sweetalert2';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const currentLang = localStorage.getItem('i18nextLng') || 'en';
        
        const messages = {
            en: {
                title: '👋 Leaving Already?',
                question: 'Are you sure you want to log out from Flymora?',
                miss: "We'll miss you! Come back soon! ✈️",
                confirmBtn: 'Yes, Log Me Out',
                cancelBtn: 'No, Stay Here',
                successTitle: 'See You Soon! 👋',
                successMsg: "You've been successfully logged out",
                thanks: '✨ Thank you for visiting Flymora! ✨',
                goodbye: 'Safe travels! 🌍✈️'
            },
            id: {
                title: '👋 Sudah Mau Pergi?',
                question: 'Apakah Anda yakin ingin keluar dari Flymora?',
                miss: 'Kami akan merindukanmu! Sampai jumpa lagi! ✈️',
                confirmBtn: 'Ya, Log Out',
                cancelBtn: 'Tidak, Tetap Disini',
                successTitle: 'Sampai Bertemu Lagi! 👋',
                successMsg: 'Anda telah berhasil keluar',
                thanks: '✨ Terima kasih sudah berkunjung ke Flymora! ✨',
                goodbye: 'Selamat jalan! 🌍✈️'
            }
        };

        const msg = messages[currentLang] || messages.en;
        
        const result = await Swal.fire({
            title: msg.title,
            html: `
                <div class="text-center">
                    <p class="text-gray-600 mb-2">${msg.question}</p>
                    <p class="text-sm text-gray-500">${msg.miss}</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: msg.confirmBtn,
            cancelButtonText: msg.cancelBtn,
            customClass: {
                popup: 'rounded-lg',
                confirmButton: 'px-6 py-2 rounded-lg font-semibold',
                cancelButton: 'px-6 py-2 rounded-lg font-semibold'
            }
        });

        if (result.isConfirmed) {
            await logout();
            
            Swal.fire({
                title: msg.successTitle,
                html: `
                    <div class="text-center">
                        <p class="text-gray-600 mb-2">${msg.successMsg}</p>
                        <p class="text-lg">${msg.thanks}</p>
                        <p class="text-sm text-gray-500 mt-2">${msg.goodbye}</p>
                    </div>
                `,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    popup: 'rounded-lg'
                }
            });

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3">
                        <img 
                            src="/images/flymora-logo.png" 
                            alt="Flymora Tours and Travels" 
                            className="h-16 md:h-20 w-auto"
                        />
                    </Link>
                    
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">{t('nav.home')}</Link>
                        <Link to="/tours" className="text-gray-700 hover:text-blue-600">{t('nav.tours')}</Link>
                        
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                                    {t('nav.dashboard')}
                                </Link>
                                <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-5 h-5"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
                                        />
                                    </svg>
                                    {t('nav.wishlist')}
                                </Link>
                                
                                {/* Language Switcher */}
                                <LanguageSwitcher />
                                
                                <span className="text-gray-600">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    {t('nav.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Language Switcher */}
                                <LanguageSwitcher />
                                
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {t('nav.register')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fade-in">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                to="/" 
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
                            >
                                {t('nav.home')}
                            </Link>
                            <Link 
                                to="/tours" 
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
                            >
                                {t('nav.tours')}
                            </Link>
                            
                            {user ? (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {t('nav.dashboard')}
                                    </Link>
                                    <Link 
                                        to="/wishlist" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className="w-5 h-5"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
                                            />
                                        </svg>
                                        {t('nav.wishlist')}
                                    </Link>
                                    
                                    <div className="px-4">
                                        <LanguageSwitcher />
                                    </div>
                                    
                                    <div className="text-gray-600 py-2 px-4 bg-gray-50 rounded">
                                        👋 Hi, {user.name}
                                    </div>
                                    
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-center"
                                    >
                                        {t('nav.logout')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="px-4">
                                        <LanguageSwitcher />
                                    </div>
                                    
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors text-center"
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
