import React from 'react';

import { AstroProvider, OnyxSideNavOverride } from '../../..';
import uiLibraryOverride from '../../../styles/themeOverrides/uiLibraryOverride';

import { NavBarNextGenComponent } from './NavBarNextGenComponent';

export default {
  title: 'Onyx SideBar First Steps',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[uiLibraryOverride, OnyxSideNavOverride]}>
      <NavBarNextGenComponent />
    </AstroProvider>
  );
};
