import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { FooterNextGenComponent } from './FooterNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark Footer',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <FooterNextGenComponent />
    </AstroProvider>
  );
};
