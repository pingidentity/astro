import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import RockerButtonGroupNextGen from './RockerButtonGroupNextGen';

export default {
  title: 'Chromatic Only Onyx Dark RockerButtonGroup',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <RockerButtonGroupNextGen />
    </AstroProvider>
  );
};
