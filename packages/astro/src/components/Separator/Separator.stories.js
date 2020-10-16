import React from 'react';
import Separator from './Separator';
import Box from '../Box/Box';


export default {
  title: 'Separator',
  component: Separator,
};

export const verticalSeparator = () => (
  <Box height="50px" flexDirection="row" alignItems="center">
    Content left
    <Separator orientation="vertical" color="red" />
    Content right
  </Box>
);

export const horizontalSeparator = () => (
  <Box>
    Content above
    <Separator />
    Content below
  </Box>
);
