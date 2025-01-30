import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../../..';
import { DataTableNextGenComponent } from '../../../themes/next-gen/stories/DataTableNextGenComponent';

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
