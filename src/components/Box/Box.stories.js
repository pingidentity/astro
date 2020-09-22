import React from 'react';
import Box from '.';

export default {
  title: 'Box',
  component: Box,
};

export const Default = () => (
  <Box bg="active" width="100%" p="xl">
    <Box isRow bg="neutral.50">
      <Box width={30} height={15} m="sm" bg="success.bright" />
      <Box width={100} height={50} m="sm" bg="critical.bright" />
      <Box width={190} height={45} m="sm" bg="warning.bright" />
    </Box>
  </Box>
);
