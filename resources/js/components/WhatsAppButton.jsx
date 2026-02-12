import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';

export default function WhatsAppButton({ 
    tour = null, 
    variant = 'floating',
    phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6282189905173', 
    message = null,
    className = '',
    source = 'general'
}) {
    const { t, i18n } = useTranslation();
    const { trackEvent } = useAnalytics();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Show button after scrolling down a bit (only for floating variant)
    useEffect(() => {
        if (variant === 'floating') {
            const toggleVisibility = () => {
                if (window.pageYOffset > 300) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            };

            window.addEventListener('scroll', toggleVisibility);
            toggleVisibility();

            return () => window.removeEventListener('scroll', toggleVisibility);
        } else {
            setIsVisible(true);
        }
    }, [variant]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };
    
    const generateMessage = () => {
        if (message) return message;
        
        const currentLang = i18n.language || 'id';
        
        if (tour) {
            const tourUrl = `${window.location.origin}/tours/${tour.id}`;
            
            if (currentLang === 'en') {
                return `Hello Flymora! 👋

I'm interested in the *${tour.name}* tour package.

📍 Destination: ${tour.category?.name || 'N/A'}
💰 Price: ${formatPrice(tour.price)}
⏱️ Duration: ${tour.duration}

Could you provide more information about this tour?

Link: ${tourUrl}

Thank you! 🌍✈️`;
            } else {
                return `Halo Flymora! 👋

Saya tertarik dengan paket tour *${tour.name}*.

📍 Destinasi: ${tour.category?.name || 'N/A'}
💰 Harga: ${formatPrice(tour.price)}
⏱️ Durasi: ${tour.duration}

Bisakah memberikan informasi lebih lanjut tentang paket tour ini?

Link: ${tourUrl}

Terima kasih! 🌍✈️`;
            }
        } else {
            if (currentLang === 'en') {
                return 'Hello Flymora! 👋 I would like to inquire about your tour packages. Thank you!';
            } else {
                return 'Halo Flymora! 👋 Saya ingin menanyakan tentang paket tour Anda. Terima kasih!';
            }
        }
    };

    const handleClick = () => {
        const finalMessage = generateMessage();
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Track analytics
        trackEvent('whatsapp_inquiry', {
            tour_id: tour?.id || null,
            tour_name: tour?.name || 'general_inquiry',
            source: source,
            price: tour?.price || null,
            category: tour?.category?.name || null
        });
        
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    // Inline button variant (for use inside pages)
    if (variant === 'inline') {
        return (
            <button
                onClick={handleClick}
                className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
                aria-label={t('whatsapp.inquire', 'Inquire via WhatsApp')}
            >
                <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{t('whatsapp.inquire', 'Tanya via WhatsApp')}</span>
            </button>
        );
    }
    
    // Floating button variant (default)
    return (
        <>
            {/* WhatsApp Floating Button */}
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${className} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label={t('whatsapp.chat', 'Chat on WhatsApp')}
            >
                {/* Pulse animation ring */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                
                {/* Main button */}
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300">
                    {/* WhatsApp Icon */}
                    <svg 
                        className="w-8 h-8" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>

                {/* Tooltip */}
                <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                }`}>
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium">
                        {t('whatsapp.chat', 'Chat with us on WhatsApp')}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                    </div>
                </div>
            </button>

            {/* Mobile alternative text - shows on small screens */}
            <div className={`fixed bottom-20 right-6 z-40 transition-all duration-300 md:hidden ${
                isVisible && !isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold">
                    {t('whatsapp.needHelp', 'Need help?')} 💬
                </div>
            </div>
        </>
    );
}
