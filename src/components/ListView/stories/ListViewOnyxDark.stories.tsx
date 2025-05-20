import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { ListViewNextGen } from './ListViewNextGenComponent';

export default {
  title: 'Onyx Dark ListView',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <ListViewNextGen />
    </AstroProvider>
  );
};
