import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import { FooterNextGenComponent } from './FooterNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Footer',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <FooterNextGenComponent />
    </AstroProvider>
  );
};
