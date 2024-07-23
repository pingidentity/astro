import React from 'react';

import { AstroProvider, Box, NextGenTheme } from '../..';

export default {
  title: 'Next Gen Recipes/Default Avatar',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
      <Box isRow gap="md" alignItems="center">
        <Box variant="avatar.sm" backgroundColor="green-100" color="green-800">
          AT
        </Box>
        <Box variant="avatar.md" backgroundColor="blue-100" color="blue-800">
          LP
        </Box>
        <Box variant="avatar.lg" backgroundColor="teal-100" color="teal-800">
          WP
        </Box>
        <Box variant="avatar.xl" backgroundColor="red-100" color="red-800">
          JS
        </Box>
      </Box>
    </AstroProvider>
  );
};
