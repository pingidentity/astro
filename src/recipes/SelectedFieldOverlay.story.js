import React from 'react';
import VisibilityOffOutlineIcon from 'mdi-react/VisibilityOffOutlineIcon';

import Box from '../components/Box';
import Icon from '../components/Icon';
import TextField from '../components/TextField';

export default {
  title: 'Recipes/Selected Field Overlay',
};

const sx = {
  container: {
    padding: 'md',
    position: 'relative',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'active',
    borderRadius: 4,
    cursor: 'pointer',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus': {
      outline: 'none',
    },
  },
};

export const Default = () => (
  <Box
    sx={sx.container}
  >
    <TextField label="Name" controlProps={{ tabIndex: '-1' }} />
    <Box
      sx={sx.overlay}
      tabIndex="0"
    >
      <Icon icon={VisibilityOffOutlineIcon} size={22} />
    </Box>
  </Box>
);
