import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../../..';
import { ListViewNextGen } from '../../../themes/next-gen/stories/ListViewNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark ListView',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <ListViewNextGen />
    </AstroProvider>
  );
};
