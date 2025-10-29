import React from 'react';

import { Box } from '../..';
import { FooterLinkProps } from '../../types';

const FooterNav = (props:FooterLinkProps) => {
  const { children, ...others } = props;

  return (
    <Box
      as="ul"
      isRow
      variant="footer.footerNav"
      {...others}
    >
      {children}
    </Box>
  );
};

export default FooterNav;
