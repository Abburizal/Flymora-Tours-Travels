import React, { useState } from 'react';

export default function ImageGallery({ images = [], tourName = '' }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return null; // Don't show gallery if no images
    }

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    };

    const handleKeyDown = (e) => {
        if (!selectedImage) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    React.useEffect(() => {
        if (selectedImage) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage, currentIndex]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Photo Gallery</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={image.id || index}
                            onClick={() => openLightbox(index)}
                            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={image.url}
                                alt={`${tourName} - Image ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <svg 
                                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition"
                        aria-label="Close gallery"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 z-10 text-white hover:text-gray-300 transition bg-black bg-opacity-50 rounded-full p-2"
                            aria-label="Previous image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Image */}
                    <div 
                        className="relative max-w-5xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.url}
                            alt={`${tourName} - Image ${currentIndex + 1}`}
                            className="w-full h-full object-contain rounded-lg"
                        />
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 z-10 text-white hover:text-gray-300 transition bg-black bg-opacity-50 rounded-full p-2"
                            aria-label="Next image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Keyboard Hints */}
                    <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
                        ESC to close • ← → to navigate
                    </div>
                </div>
            )}
        </>
    );
}
