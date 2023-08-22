import React, { forwardRef } from 'react';

import { LoaderProps, ReactRef } from '../../types';
import Box from '../Box';

const Loader = forwardRef((props: LoaderProps, ref: ReactRef) => {
  const { size, ...others } = props;
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
      <Box variant="loader.dotLeft" />
      <Box variant="loader.dotCenter" />
      <Box variant="loader.dotRight" />
    </Box>
  );
});


export default Loader;
