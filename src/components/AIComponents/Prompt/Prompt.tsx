import React from 'react';

import { BoxProps } from '../../../types';
import Box from '../../Box';

const Prompt = (props: BoxProps) => {
  const { children, ...others } = props;
  return (
    <Box {...others} variant="prompt.container">
      {children}
    </Box>
  );
};

export default Prompt;
