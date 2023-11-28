import { useEffect, useMemo } from 'react';

export interface UseFallbackImageProps {
  src: string;
  onImageLoad: () => void;
  onImageError: () => void;
  fallbackTimeout: number;
  onFallbackTimeout: () => void;
  fallbackImage?: string | object | null;
}

const useFallbackImage = ({
  src: imageSrc,
  onImageLoad,
  onImageError,
  fallbackTimeout,
  onFallbackTimeout,
}: UseFallbackImageProps): HTMLImageElement => {
  const displayImage = useMemo(() => document.createElement('img'), []);

  useEffect(() => {
    displayImage.src = imageSrc;
    displayImage.onload = onImageLoad;
    displayImage.onerror = onImageError;
    return () => {
      displayImage.onload = null;
      displayImage.onerror = null;
    };
  }, []);

  useEffect(() => {
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(onFallbackTimeout, fallbackTimeout);
    return () => clearTimeout(timeoutId);
  }, []);

  return displayImage;
};

export default useFallbackImage;
