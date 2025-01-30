import React from 'react';

import { AstroProvider, NextGenTheme } from '../../../..';

import { DataTableNextGenComponent } from './DataTableNextGenComponent';

export default {
  title: 'Chromatic Only Onyx DataTable',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <DataTableNextGenComponent />
    </AstroProvider>
  );
};
