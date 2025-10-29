import React from 'react';

import { Box } from '../..';

interface FooterLinkItemProps {
  children?: React.ReactNode;
}

const FooterNavItem = (props:FooterLinkItemProps) => {
  const { children, ...others } = props;

  return (
    <Box as="li" {...others}>
      {children}
    </Box>
  );
};

export default FooterNavItem;
