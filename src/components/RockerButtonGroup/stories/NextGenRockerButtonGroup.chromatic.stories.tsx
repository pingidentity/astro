import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import RockerButtonGroupNextGen from './RockerButtonGroupNextGen';

export default {
  title: 'Chromatic Only Onyx RockerButtonGroup',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <RockerButtonGroupNextGen />
    </AstroProvider>
  );
};
