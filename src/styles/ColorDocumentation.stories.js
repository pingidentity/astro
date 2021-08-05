import React from 'react';
import { ColorSchema } from './ColorDocumentation';
import Box from '../components/Box';

export default {
  title: 'Color Schema',
  component: ColorSchema,
};

export const Colors = () => (
  <Box bg="neutral.95">
    <ColorSchema />
  </Box>
);
