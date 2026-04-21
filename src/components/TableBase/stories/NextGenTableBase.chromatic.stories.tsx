import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import NextGenTableBase from './NextGenTableBase';

export default {
  title: 'Chromatic Only Onyx TableBase',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
      <NextGenTableBase />
    </AstroProvider>
  );
};
