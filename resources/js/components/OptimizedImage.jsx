import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * Optimized image component with lazy loading
 * Improves page load performance by loading images only when visible
 */
const OptimizedImage = ({ 
    src, 
    alt, 
    className = '',
    width,
    height,
    effect = 'blur', // blur, opacity, black-and-white
    placeholderSrc = null,
    threshold = 100, // pixels before image enters viewport
    ...props 
}) => {
    // Generate a simple placeholder if none provided
    const defaultPlaceholder = placeholderSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E';

    return (
        <LazyLoadImage
            src={src || defaultPlaceholder}
            alt={alt}
            className={className}
            width={width}
            height={height}
            effect={effect}
            placeholderSrc={defaultPlaceholder}
            threshold={threshold}
            {...props}
        />
    );
};

export default OptimizedImage;
