import React from 'react';
import Box from '../components/Box';
import { line } from '../styles/colors';

export default {
  title: 'Recipes/Arrow',
};

const ArrowIcon = '\u25BA';

export const Default = () => {
  return (
    <Box isRow height={8} width={80} sx={{ 'align-items': 'center' }}>
      <Box
        width="100%"
        // Use this instead of border property, to avoid cropping of strokes in Safari and FF
        sx={{
          backgroundImage: `linear-gradient(to right, ${line.light} 50%, white 50%)`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '10px 2px',
          height: 2,
        }}
      />
      <Box color="line.regular">{ArrowIcon}</Box>
    </Box>
  );
};
