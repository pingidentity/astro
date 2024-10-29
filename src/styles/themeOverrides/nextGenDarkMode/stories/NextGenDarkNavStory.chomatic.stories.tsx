import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../../..';
import { NavBarNextGenComponent } from '../../../themes/next-gen/stories/NavBarNextGenComponent';

export default {
  title: 'Chromatic Only NextGen Dark NavBar',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <NavBarNextGenComponent />
    </AstroProvider>
  );
};
