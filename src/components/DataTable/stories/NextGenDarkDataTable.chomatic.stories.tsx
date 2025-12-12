import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { DataTableNextGenComponent } from './DataTableNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark DataTable',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <DataTableNextGenComponent />
    </AstroProvider>
  );
};

Default.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
