import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useProgressBar } from '@react-aria/progress';

import Box from '../Box';

/**
 * Indeterminite progress component. Used to show general loading.
 * Uses [useProgressBar](https://react-spectrum.adobe.com/react-aria/useProgressBar.html) from React Aria
 */

const Loader = forwardRef((props, ref) => {
  const { size, ...others } = props;
  const { progressBarProps } = useProgressBar({
    isIndeterminate: true,
    'aria-label': 'Loading...',
    ...props,
  });
  return (
    <Box
      ref={ref}
      isRow
      fontSize={size}
      variant="loader.container"
      {...progressBarProps}
      {...others}
    >
      <Box variant="loader.dotLeft" />
      <Box variant="loader.dotCenter" />
      <Box variant="loader.dotRight" />
    </Box>
  );
});


Loader.propTypes = {
  /**
   * Color key from theme or string value.
   * Default color inherits the font color.
  */
  color: PropTypes.string,
  /**
   * Size as number or pixel / em / rem value.
   * Default size inherits the font size.
  */
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Loader;
