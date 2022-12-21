import React from 'react';
import Separator from './Separator';
import Box from '../Box/Box';

export default {
  title: 'Components/Separator',
  component: Separator,
};

export const Default = ({ ...args }) => (
  <Box height="60px" alignItems="center">
    Content above
    <Separator {...args} />
    Content below
  </Box>
);

export const verticalSeparator = () => (
  <Box height="50px" flexDirection="row" alignItems="center">
    Content left
    <Separator orientation="vertical" />
    Content right
  </Box>
);
