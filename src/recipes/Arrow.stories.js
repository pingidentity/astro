import React from 'react';

import { Box } from '../index';
import { line } from '../styles/colors';

export default {
  title: 'Recipes/Arrow',
};

const ArrowIcon = '\u25BA';

const sx = {
  wrapper: {
    height: '8px',
    width: '80px',
    alignItems: 'center',
  },
  arrowLine: {
    width: '100%',
    // Use this instead of border property, to avoid cropping of strokes in Safari and FF
    backgroundImage: `linear-gradient(to right, ${line.light} 50%, white 50%)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '10px 2px',
    height: '2px',
  },
};

export const Default = () => {
  return (
    <Box isRow sx={sx.wrapper}>
      <Box sx={sx.arrowLine} />
      <Box color="line.regular">{ArrowIcon}</Box>
    </Box>
  );
};
