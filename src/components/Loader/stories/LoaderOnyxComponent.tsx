import React from 'react';

import {
  Box,
  Loader,
} from '../../../index';

export const LoaderOnyxComponent = () => {
  return (
    <Box gap="lg">
      <Loader size="sm" isCircle />
      <Loader size="md" isCircle />
      <Loader size="lg" isCircle />
      <Loader
        size={120}
        isCircle
        strokeColor="magenta"
      />
    </Box>
  );
};
