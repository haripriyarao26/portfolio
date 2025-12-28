'use client';

import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'> {
  src: string;
  alt: string;
  placeholder?: string;
  priority?: boolean;
  className?: string;
}

export default function LazyImage({
  src,
  alt,
  placeholder,
  priority = false,
  className = '',
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      // Load immediately if priority
      setImageSrc(src);
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  useEffect(() => {
    if (isInView && !isLoaded) {
      // Preload image
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Fallback to placeholder or src on error
        setImageSrc(src);
      };
    }
  }, [isInView, src, isLoaded]);

  return (
    <img
      ref={imgRef}
      src={imageSrc || src}
      alt={alt}
      className={`${className} ${!isLoaded && placeholder ? 'blur-sm' : ''} transition-opacity duration-300`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={{
        opacity: isLoaded ? 1 : 0.7,
        ...props.style,
      }}
      {...props}
    />
  );
}
