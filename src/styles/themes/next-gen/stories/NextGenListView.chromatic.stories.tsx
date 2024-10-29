import React from 'react';

import { AstroProvider, NextGenTheme } from '../../../..';

import { ListViewNextGen } from './ListViewNextGenComponent';

export default {
  title: 'Chromatic Only NextGen ListView',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <ListViewNextGen />
    </AstroProvider>
  );
};
