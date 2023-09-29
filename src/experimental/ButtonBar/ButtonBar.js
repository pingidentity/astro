import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../index';

const ButtonBar = props => {
  const {
    align = 'left',
    children,
    ...others
  } = props;

  return (
    <Box
      isRow
      gap="md"
      sx={{ bg: 'white', px: 'lg', py: 'md', justifyContent: align === 'right' ? 'right' : 'left' }}
      {...others}
    >
      {children}
    </Box>
  );
};

ButtonBar.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
};

export default ButtonBar;
