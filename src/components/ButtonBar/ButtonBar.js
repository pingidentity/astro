import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../index';

const ButtonBar = forwardRef((props, ref) => {
  const {
    align,
    children,
    ...others
  } = props;

  return (
    <Box
      ref={ref}
      isRow
      variant={align === 'right' ? 'buttonBar.justifyRightContainer' : 'buttonBar.container'}
      {...others}
    >
      {children}
    </Box>
  );
});

ButtonBar.propTypes = {
  /** Justifies the component's children. */
  align: PropTypes.oneOf(['left', 'right']),
};

ButtonBar.defaultProps = {
  align: 'left',
};

export default ButtonBar;
