import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Image as ThemeUIImage } from 'theme-ui';
import { useHover } from '@react-aria/interactions';
import { keyframes } from '@emotion/react';
import {
  usePropWarning,
  useStatusClasses,
  useFallbackImage,
} from '../../hooks';
import { Box } from '../../index';
import { neutral } from '../../styles/colors';

/**
 * Basic image component.
 * Built on top of [Image from Theme-UI](https://theme-ui.com/components/image/).
 * If you are looking to add an icon please use [Icon component](/icon--default).
 */

const Image = forwardRef((props, ref) => {
  const {
    className,
    fallbackImage,
    fallbackTimeout,
    isDisabled,
    src,
    // eslint-disable-next-line react/prop-types
    sx,
    ...others
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
  // we need to use useRef here with useState so it will be updated in setTimeout and onload
  // https://github.com/facebook/react/issues/14010#issuecomment-433788147
  const isLoadingRef = useRef(isLoading);
  const setIsLoadingWithRef = (newState) => {
    setIsLoading(newState);
    isLoadingRef.current = newState;
  };
  const [imgSrc, setImgSrc] = useState(fallbackImage || src);

  const imgRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => imgRef.current);
  usePropWarning(props, 'disabled', 'isDisabled');

  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isHovered,
    isLoading,
  });

  const onImageLoad = () => {
    if (isLoadingRef?.current) {
      setIsLoadingWithRef(false);
      setImgSrc(src);
      setLoadedSuccessfully(true);
    }
  };

  const onImageError = () => {
    setIsLoadingWithRef(false);
    setImgSrc(fallbackImage || null);
  };

  const onFallbackTimeout = () => {
    if (isLoadingRef?.current) {
      setIsLoadingWithRef(false);
      setImgSrc(fallbackImage || null);
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
    backgroundColor: neutral[90],
    // eslint-disable-next-line react/prop-types
    width: sx?.width || '100%',
    // eslint-disable-next-line react/prop-types
    height: sx?.height || '100%',
    animation:
      isLoading && `${skeletonFrames} 1.5s ease-in-out 0.5s infinite alternate`,
  };

  const Skeleton = ({ children }) => (
    <Box sx={skeletonSx} data-testid="skeleton-image">
      {children}
    </Box>
  );

  const themeUiImage = (
    <ThemeUIImage
      className={classNames}
      ref={imgRef}
      alt="Image"
      role="img"
      src={imgSrc}
      sx={sx}
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
};

Image.defaultProps = {
  isDisabled: false,
  as: 'img',
  fallbackTimeout: 5000,
};

Image.displayName = 'Image';
export default Image;
