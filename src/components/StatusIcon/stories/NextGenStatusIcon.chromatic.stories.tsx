import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import NextGenStatusIcon from './NextGenStatusIcon';

export default {
  title: 'Chromatic Only Onyx StatusIcon',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
      <NextGenStatusIcon />
    </AstroProvider>
  );
};
