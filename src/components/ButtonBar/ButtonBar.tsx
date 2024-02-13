import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { ButtonBarProps } from '../../types';

const ButtonBar = forwardRef<HTMLDivElement, ButtonBarProps>((props, ref) => {
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

ButtonBar.defaultProps = {
  align: 'left',
};

export default ButtonBar;
