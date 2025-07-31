import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import NextGenStatusIcon from './NextGenStatusIcon';

export default {
  title: 'Chromatic Only Onyx Dark StatusIcon',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <NextGenStatusIcon />
    </AstroProvider>
  );
};
