import React, { forwardRef } from 'react';

import { Box } from '../..';
import { useLocalOrForwardRef } from '../../hooks';
import { FooterProps } from '../../types';

const Footer = forwardRef<HTMLElement, FooterProps >((props, ref) => {
  const { children, ...others } = props;
  const footerRef = useLocalOrForwardRef<HTMLElement>(ref);

  return (
    <Box isRow as="footer" ref={footerRef} variant="footer.container" {...others}>
      <Box variant="footer.wrapper">
        {children}
      </Box>
    </Box>
  );
});

export default Footer;
