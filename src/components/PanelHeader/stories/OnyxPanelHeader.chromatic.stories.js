import React from 'react';

import { AstroProvider, OnyxTheme } from '../../..';

import PanelHeaderComponent from './OnyxPanelHeaderComponent';

export default {
  title: 'Chromatic Only Onyx Panel Header',
};

export const Default = () => {
  return (
    <AstroProvider theme={OnyxTheme}>
      <PanelHeaderComponent />
    </AstroProvider>
  );
};
