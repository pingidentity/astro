import React from 'react';

import { AstroProvider, NextGenTheme } from '../../../..';

import { ListViewNextGen } from './ListViewNextGenComponent';

export default {
  title: 'Chromatic Only Onyx ListView',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <ListViewNextGen />
    </AstroProvider>
  );
};
