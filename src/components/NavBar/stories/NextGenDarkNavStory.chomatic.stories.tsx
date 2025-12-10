import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { NavBarNextGenComponent } from './NavBarNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark NavBar',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <NavBarNextGenComponent />
    </AstroProvider>
  );
};
