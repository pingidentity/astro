import React, { forwardRef } from 'react';

import { LoaderProps } from '../../types';
import Box from '../Box';

const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { size, dotProps, ...others } = props;
  return (
    <Box
      ref={ref}
      isRow
      fontSize={size}
      variant="loader.container"
      role="alert"
      aria-live="assertive"
      aria-label="Loading in progress"
      {...others}
    >
      <Box variant="loader.dotLeft" {...dotProps} />
      <Box variant="loader.dotCenter" {...dotProps} />
      <Box variant="loader.dotRight" {...dotProps} />
    </Box>
  );
});


export default Loader;
