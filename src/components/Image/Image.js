import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { keyframes } from '@emotion/react';
import { useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { Image as ThemeUIImage } from 'theme-ui';

import {
  useAriaLabelWarning,
  useDevelopmentWarning,
  useFallbackImage,
  usePropWarning,
  useStatusClasses,
} from '../../hooks';
import { Box } from '../../index';
import { neutral } from '../../styles/colors';

const Image = forwardRef((props, ref) => {
  const {
    className,
    fallbackImage,
    fallbackTimeout,
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
  const imgRef = useRef();

  /* istanbul ignore next */
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

  useFallbackImage({ onImageLoad, onImageError, onFallbackTimeout, ...props });

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
    // eslint-disable-next-line react/prop-types
    width: sx?.width || '100%',
    // eslint-disable-next-line react/prop-types
    height: sx?.height || '100%',
    animation:
      isLoading && `${skeletonFrames} 1.5s ease-in-out 0.5s infinite alternate`,
  };

  const Skeleton = ({ children }) => (
    <Box
      role="img"
      sx={skeletonSx}
      data-testid="skeleton-image"
      aria-busy={isLoading}
      aria-label={isLoading ? 'Image is loading' : 'Loading of image timed out'}
    >
      {children}
    </Box>
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

Image.propTypes = {
  /** The styling variation of the image. */
  variant: PropTypes.string,
  /** Whether the image is disabled; applies disabled styling. */
  isDisabled: PropTypes.bool,
  /**  The HTML element used to render the image. */
  as: PropTypes.string,
  /**  Source of image(Image path). */
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**  Load failure fault-tolerant src
   * We do recommend using JS File or Blob object as an src for the "fallbackImage".
   * Here is some documentation on how to create a blob image [https://developer.mozilla.org/en-US/docs/Web/API/Blob].
   * Also please note that URLs are accepted, but if the URL cannot be loaded,
   * the fallback image will not be rendered so it's not recommended.
   * */
  fallbackImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**  Time in milliseconds that component should wait for a response from src address. */
  fallbackTimeout: PropTypes.number,
  /** Descriptive text for an image. This is *highly* recommended in most cases.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt).
   * */
  alt: PropTypes.string,
  /**  Load failure fault-tolerant alt */
  fallbackAlt: PropTypes.string,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
};

Image.defaultProps = {
  isDisabled: false,
  as: 'img',
  fallbackTimeout: 5000,
};

Image.displayName = 'Image';
export default Image;
