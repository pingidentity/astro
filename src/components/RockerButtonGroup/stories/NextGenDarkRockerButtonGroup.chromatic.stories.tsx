import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { Default as RockerButtonGroupNextGen } from './RockerButtonGroup.chromatic.stories';

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
