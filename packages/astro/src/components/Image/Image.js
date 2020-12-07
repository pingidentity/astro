import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Image as RImage } from 'rebass';
import { useHover } from '@react-aria/interactions';
import useStatusClasses from '../../hooks/useStatusClasses';

/**
 * Basic image component.
 * Built on top of [Image from Rebass.js](https://rebassjs.org/image).
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
    <RImage
      className={classNames}
      ref={imgRef}
      role="img"
      {...others}
      {...hoverProps}
    />
  );
});

Image.propTypes = {
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
