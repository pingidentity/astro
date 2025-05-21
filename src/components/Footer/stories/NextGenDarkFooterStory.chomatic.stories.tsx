import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { FooterNextGenComponent } from './FooterNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark Footer',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <FooterNextGenComponent />
    </AstroProvider>
  );
};
