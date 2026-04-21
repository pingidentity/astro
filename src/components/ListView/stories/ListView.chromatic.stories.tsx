import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import {
  ListViewNextGen,
} from './ListViewNextGenComponent';

export default {
  title: 'Onyx ListView',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <ListViewNextGen />
    </AstroProvider>
  );
};
