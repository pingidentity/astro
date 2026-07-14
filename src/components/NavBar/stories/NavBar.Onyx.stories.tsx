import React from 'react';

import { AstroProvider, OnyxSideNavOverride } from '../../..';
import uiLibraryOverride from '../../../styles/themeOverrides/uiLibraryOverride';

import { NavBarNextGenComponent } from './NavBarNextGenComponent';
import { navBarOnyxArgTypes } from './navBarOnyxAttributes';

export default {
  title: 'Onyx SideBar First Steps',
  argTypes: { ...navBarOnyxArgTypes },
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[uiLibraryOverride, OnyxSideNavOverride]}>
      <NavBarNextGenComponent />
    </AstroProvider>
  );
};
