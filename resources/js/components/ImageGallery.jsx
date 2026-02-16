import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageGallery({ images = [], tourName = '' }) {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    if (!images || images.length === 0) {
        return null; // Don't show gallery if no images
    }

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
        setZoom(1);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        setZoom(1);
        if (isFullscreen) exitFullscreen();
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
        setZoom(1);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
        setZoom(1);
    };

    const zoomIn = () => {
        setZoom(prev => Math.min(prev + 0.5, 3));
    };

    const zoomOut = () => {
        setZoom(prev => Math.max(prev - 0.5, 1));
    };

    const resetZoom = () => {
        setZoom(1);
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen?.();
        }
        setIsFullscreen(false);
    };

    const downloadImage = () => {
        if (!selectedImage) return;
        
        const link = document.createElement('a');
        link.href = selectedImage.url;
        link.download = `${tourName.replace(/\s+/g, '-')}-${currentIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleKeyDown = (e) => {
        if (!selectedImage) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === '+' || e.key === '=') zoomIn();
        if (e.key === '-') zoomOut();
        if (e.key === '0') resetZoom();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };

    // Touch gesture handling
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
    };

    React.useEffect(() => {
        if (selectedImage) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Listen for fullscreen changes
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage, currentIndex]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">{t('gallery.title', 'Photo Gallery')}</h3>
                    <span className="text-sm text-gray-600">{images.length} {t('gallery.photos', 'photos')}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={image.id || index}
                            onClick={() => openLightbox(index)}
                            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-200"
                        >
                            <img
                                src={image.url}
                                alt={`${tourName} - Image ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    console.error('Image failed to load:', image.url);
                                    e.target.src = '/images/default-tour.jpg';
                                    e.target.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <svg 
                                    className="w-8 h-8 text-white"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                            {/* Image number badge */}
                            <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-sm pointer-events-none">
                                {index + 1}/{images.length}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col"
                    onClick={closeLightbox}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Top Control Bar */}
                    <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
                        {/* Image Info */}
                        <div className="text-white">
                            <h4 className="font-semibold">{tourName}</h4>
                            <p className="text-sm text-gray-300">{currentIndex + 1} / {images.length}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            {/* Download Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); downloadImage(); }}
                                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                                title={t('gallery.download', 'Download')}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                                title={isFullscreen ? t('gallery.exitFullscreen', 'Exit Fullscreen') : t('gallery.fullscreen', 'Fullscreen')}
                            >
                                {isFullscreen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                )}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                                title={t('gallery.close', 'Close')}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Main Image Area */}
                    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                        {/* Previous Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition z-10"
                                title={t('gallery.previous', 'Previous')}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Image with Zoom */}
                        <div 
                            className="relative flex-1 flex items-center justify-center max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt={`${tourName} - Image ${currentIndex + 1}`}
                                className="max-w-full max-h-full object-contain transition-transform duration-300"
                                style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? 'zoom-out' : 'zoom-in' }}
                                onClick={() => zoom > 1 ? resetZoom() : zoomIn()}
                            />
                        </div>

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition z-10"
                                title={t('gallery.next', 'Next')}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Bottom Control Bar */}
                    <div className="p-4 bg-black bg-opacity-50">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            {/* Zoom Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                                    disabled={zoom <= 1}
                                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    title={t('gallery.zoomOut', 'Zoom Out')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                    </svg>
                                </button>
                                
                                <span className="text-white text-sm min-w-[60px] text-center">
                                    {Math.round(zoom * 100)}%
                                </span>
                                
                                <button
                                    onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                                    disabled={zoom >= 3}
                                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    title={t('gallery.zoomIn', 'Zoom In')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                                    disabled={zoom === 1}
                                    className="px-3 py-1 text-sm text-white hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {t('gallery.fit', 'Fit')}
                                </button>
                            </div>

                            {/* Thumbnails Navigator */}
                            <div className="hidden md:flex items-center gap-2 max-w-md overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); openLightbox(idx); }}
                                        className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition ${
                                            idx === currentIndex 
                                                ? 'border-purple-500 ring-2 ring-purple-400' 
                                                : 'border-gray-600 hover:border-gray-400'
                                        }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Keyboard Hints */}
                            <div className="hidden lg:block text-white text-xs bg-black bg-opacity-50 px-3 py-2 rounded">
                                <div>ESC {t('gallery.toClose', 'to close')}</div>
                                <div>← → {t('gallery.toNavigate', 'to navigate')}</div>
                                <div>+/- {t('gallery.toZoom', 'to zoom')}</div>
                                <div>F {t('gallery.fullscreenKey', 'fullscreen')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
