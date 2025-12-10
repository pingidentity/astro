import React, { forwardRef } from 'react';

import { useLocalOrForwardRef } from '../../hooks';
import { Box, Link } from '../../index';
import { NavSideBarHeaderProps } from '../../types';

const NavSideBarHeader = forwardRef<HTMLDivElement, NavSideBarHeaderProps>((props, ref) => {
  const {
    linkProps,
    logo,
    ...others
  } = props;

  const NavSideBarHeaderRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  return (
    <Box p="md" {...others} ref={NavSideBarHeaderRef}>
      <Link {...linkProps}>
        {logo}
      </Link>
    </Box>
  );
});
export default NavSideBarHeader;
