import React from 'react';
import { ColorSchema } from '../../styles/ColorDocumentation';
import Box from '../../components/Box';

export default {
  title: 'Docs/Design/Color Schema',
  component: ColorSchema,
};

export const Colors = () => (
  <Box bg="neutral.95">
    <ColorSchema />
  </Box>
);
