import { useEffect, useMemo } from 'react';

const useFallbackImage = ({
  src: imageSrc,
  onImageLoad,
  onImageError,
  fallbackTimeout,
  onFallbackTimeout,
}) => {
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
    let timeoutId = 0;
    timeoutId = setTimeout(onFallbackTimeout, fallbackTimeout);
    return () => clearTimeout(timeoutId);
  }, []);

  return displayImage;
};

export default useFallbackImage;
