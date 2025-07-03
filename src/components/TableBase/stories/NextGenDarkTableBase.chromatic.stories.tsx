import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import NextGenTableBase from './NextGenTableBase';

export default {
  title: 'Chromatic Only Onyx Dark TableBase',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <NextGenTableBase />
    </AstroProvider>
  );
};
