import React from 'react';

import { AstroProvider, NextGenTheme } from '../../../..';

import { NavBarNextGenComponent } from './NavBarNextGenComponent';

export default {
  title: 'Chromatic Only NextGen NavBar',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <NavBarNextGenComponent />
    </AstroProvider>
  );
};
