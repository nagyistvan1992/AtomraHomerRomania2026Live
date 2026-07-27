import React, { useState, useRef, useEffect } from 'react';
import { getPlaceholderImage, normalizeImageSource } from '../utils/imageSources';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  onLoad,
  onError,
  aspectRatio = 'square',
  objectFit = 'cover',
  priority = false
}) => {
  const fallbackSrc = getPlaceholderImage();
  const resolvedSrc = normalizeImageSource(src) || fallbackSrc;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || window.innerWidth < 768); // Load immediately on mobile
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  // Extract keywords from alt text for SEO
  const enhancedAlt = alt.includes('ceară naturală') ? alt : `${alt} - Lumânare din ceară naturală`;

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
    setIsLoaded(false);
    setHasError(false);
  }, [resolvedSrc]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '200px' } // Increased rootMargin for earlier loading
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setHasError(true);
    onError?.();
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case '4/3': return 'aspect-[4/3]';
      case '16/9': return 'aspect-video';
      default: return '';
    }
  };

  const containerClasses = `
    relative overflow-hidden bg-slate-50 
    ${getAspectRatioClass()} 
    ${className}
  `.trim();

  return (
    <div 
      ref={imgRef}
      className={containerClasses}
      style={{ width, height }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && !hasError && !priority && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20"></div>
        </div>
      )}
      
      {/* Main Image */}
      {isInView && !hasError && (
        <img
          src={currentSrc}
          alt={enhancedAlt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`
            w-full h-full transition-all duration-700 ease-out
            ${objectFit === 'cover' ? 'object-cover' : ''}
            ${objectFit === 'contain' ? 'object-contain' : ''}
            ${objectFit === 'fill' ? 'object-fill' : ''}
            ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
            ${isLoaded || priority ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}
          `}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
          <span className="text-sm font-light">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
