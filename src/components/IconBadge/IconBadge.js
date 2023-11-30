import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../index';

const IconBadge = forwardRef((props, ref) => {
  const {
    children,
    sx,
    circleColor,
    baseSize,
    circleSize,
    ...others
  } = props;

  const [firstIcon, secondIcon] = React.Children.toArray(children);

  return (
    <Box
      ref={ref}
      as="span"
      sx={{
        position: 'relative',
        height: `${baseSize}px`,
        width: `${baseSize}px`,
        display: 'flex',
        alignItems: 'top',
        ...sx,
      }}
      {...others}
    >
      {firstIcon}
      <Box
        as="span"
        sx={{
          position: 'absolute',
          bottom: '-5.5px',
          right: '1px',
          borderRadius: `${circleSize / 2}px`,
          height: `${circleSize}px`,
          width: `${circleSize}px`,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: circleColor,
        }}
      >
        {secondIcon}
      </Box>
    </Box>
  );
});

IconBadge.propTypes = {
  /** JSX styling that is passed into the component. */
  sx: PropTypes.shape({}),
  /** Color that is applied to the circular background.
   * Default is white.
   */
  circleColor: PropTypes.string,
  /**
   * The size of the base Icon. When given a number value, it will be converted to pixels.
   */
  baseSize: PropTypes.number,
  /**
   * The size of the Icon within the circle.
   * When given a number value, it will be converted to pixels.
   */
  circleSize: PropTypes.number,
};

IconBadge.defaultProps = {
  circleColor: 'white',
};

export default IconBadge;
