import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import { Default as RockerButtonGroupNextGen } from './RockerButtonGroup.chromatic.stories';

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
