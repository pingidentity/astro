import React from 'react';

import { Box } from '../..';
import { ColorSchema } from '../../styles/ColorDocumentation';


export default {
  title: 'Docs/Design/Color Schema',
  component: ColorSchema,
};

export const Colors = () => (
  <Box bg="neutral.95">
    <ColorSchema />
  </Box>
);
