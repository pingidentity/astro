import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { ButtonBarProps } from '../../types';
import { useStatusClasses } from '../../hooks';

const ButtonBar = forwardRef<HTMLDivElement, ButtonBarProps>((props, ref) => {
  const {
    align,
    children,
    className,
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, {
    isAlignedRight: align === 'right',
    isAlignedLeft: align === 'left',
  });

  return (
    <Box
      ref={ref}
      isRow
      variant={align === 'right' ? 'buttonBar.justifyRightContainer' : 'buttonBar.container'}
      className={classNames}
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
