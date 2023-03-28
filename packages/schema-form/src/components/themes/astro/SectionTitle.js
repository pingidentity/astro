import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@pingux/astro';

export default function SectionTitle({ children }) {
  return (
    <Box isRow justifyContent="space-between" role="heading" aria-level="1">
      <Text variant="title" mb="md">
        {children}
      </Text>
    </Box>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
