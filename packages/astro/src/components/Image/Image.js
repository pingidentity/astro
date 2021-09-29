import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Image as ThemeUIImage } from 'theme-ui';
import { useHover } from '@react-aria/interactions';
import { useStatusClasses } from '../../hooks';

/**
 * Basic image component.
 * Built on top of [Image from Theme-UI](https://theme-ui.com/components/image/).
 * If you are looking to add an icon please use [Icon component](/icon--default).
 */

const Image = forwardRef((props, ref) => {
  const { className, isDisabled, ...others } = props;

  const imgRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => imgRef.current);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isHovered,
  });

  return (
    <ThemeUIImage
      className={classNames}
      ref={imgRef}
      alt="Image"
      role="img"
      {...others}
      {...hoverProps}
    />
  );
});

Image.propTypes = {
  /** The styling variation of the image. */
  variant: PropTypes.string,
  /** Whether the image is disabled; applies disabled styling. */
  isDisabled: PropTypes.bool,
  /**  The HTML element used to render the image. */
  as: PropTypes.string,
  /**  Source of image. */
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Image.defaultProps = {
  isDisabled: false,
  as: 'img',
};

Image.displayName = 'Image';
export default Image;
