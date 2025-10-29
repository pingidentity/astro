import React, { forwardRef } from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { Box } from '../..';

interface NavigationHeaderProps {
  isSticky?: boolean;
  children?: React.ReactNode;
  sx?: ThemeUICSSObject
}

const NavigationHeader = forwardRef<HTMLDivElement, NavigationHeaderProps>((props, ref) => {
  const { children, isSticky, ...others } = props;
  return (
    <Box
      as="nav"
      ref={ref}
      variant="navigationHeader.container"
      sx={{
        ...props?.sx,
        ...(isSticky && { position: 'sticky' }),
      }}
      {...others}
    >
      <Box variant="navigationHeader.wrapper">
        <Box isRow justifyContent="space-between" alignItems="center">
          {children}
        </Box>
      </Box>
    </Box>
  );
});

export default NavigationHeader;
