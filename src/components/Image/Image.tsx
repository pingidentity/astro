/* istanbul ignore file */
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { keyframes } from '@emotion/react';
import { useHover } from '@react-aria/interactions';
import { Image as ThemeUIImage } from 'theme-ui';

import {
  useAriaLabelWarning,
  useDevelopmentWarning,
  useFallbackImage,
  useLocalOrForwardRef,
  usePropWarning,
  useStatusClasses,
} from '../../hooks';
import { Box } from '../../index';
import { neutral } from '../../styles/colors';
import { ImageProps } from '../../types/image';

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    className,
    fallbackImage,
    fallbackTimeout = 5000,
    isDisabled,
    src,
    alt,
    // eslint-disable-next-line react/prop-types
    sx,
    fallbackAlt,
    ...others
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
  const [shouldShowFallback, setShouldShowFallback] = useState(false);
  // we need to use useRef here with useState so it will be updated in setTimeout and onload
  // https://github.com/facebook/react/issues/14010#issuecomment-433788147
  const isLoadingRef = useRef(isLoading);
  const setIsLoadingWithRef = newState => {
    setIsLoading(newState);
    isLoadingRef.current = newState;
  };

  const shouldUseFallbackProps = (!loadedSuccessfully && !isLoadingRef?.current)
    || shouldShowFallback;

  const setImgAttribute = (attribute, fallbackAttribute) => {
    return shouldUseFallbackProps ? fallbackAttribute : attribute;
  };

  const imgSrc = useMemo(() => setImgAttribute(src, fallbackImage),
    [src, isLoading, shouldShowFallback]);
  const imgAlt = useMemo(() => setImgAttribute(alt, fallbackAlt),
    [alt, isLoading, shouldShowFallback]);
  const imgRef = useLocalOrForwardRef(ref);

  useImperativeHandle(ref, () => imgRef.current);
  usePropWarning(props, 'disabled', 'isDisabled');

  const ariaLabel = props['aria-label'] || alt;
  useAriaLabelWarning('Image', ariaLabel);
  useDevelopmentWarning({
    message: 'Use fallbackAlt to proivide alt attribute for fallback image',
    shouldTrigger: shouldUseFallbackProps && !fallbackAlt,
  });

  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isHovered,
    isLoading,
  });

  const onImageLoad = () => {
    if (isLoadingRef?.current) {
      setIsLoadingWithRef(false);
      setLoadedSuccessfully(true);
    }
  };

  const onImageError = () => {
    setIsLoadingWithRef(false);
    setShouldShowFallback(true);
  };

  const onFallbackTimeout = () => {
    if (isLoadingRef?.current) {
      setIsLoadingWithRef(false);
      setShouldShowFallback(true);
    }
  };

  useFallbackImage({
    onImageLoad,
    onImageError,
    onFallbackTimeout,
    fallbackTimeout,
    src: src || '',
  });

  const skeletonFrames = keyframes`
  0% {
    background-color: ${neutral[90]};
  }
  100% {
    background-color: ${neutral[70]};
  }
`;

  const skeletonSx = {
    backgroundImage: !isLoading && 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\'%3E%3Crect x=\'0\' y=\'0\' width=\'150\' height=\'150\' fill=\'%23e4e6e9\' /%3E%3C/svg%3E")',
    width: sx?.width || '100%',
    height: sx?.height || '100%',
    animation:
      isLoading && `${skeletonFrames} 1.5s ease-in-out 0.5s infinite alternate`,
  };

  const Skeleton = () => (
    <Box
      role="img"
      sx={skeletonSx}
      data-testid="skeleton-image"
      aria-busy={isLoading}
      aria-label={isLoading ? 'Image is loading' : 'Loading of image timed out'}
    />
  );

  const themeUiImage = (
    <ThemeUIImage
      alt={imgAlt}
      className={classNames}
      ref={imgRef}
      role="img"
      src={imgSrc}
      sx={sx}
      aria-live="polite"
      {...others}
      {...hoverProps}
    />
  );

  if (isLoading || (!loadedSuccessfully && !fallbackImage)) {
    return <Skeleton />;
  }

  return themeUiImage;
});

Image.defaultProps = {
  isDisabled: false,
  as: 'img',
};

Image.displayName = 'Image';
export default Image;
