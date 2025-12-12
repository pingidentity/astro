import React from 'react';

import { AstroProvider, OnyxDarkTheme } from '../../..';

import PanelHeaderComponent from './OnyxPanelHeaderComponent';

export default {
  title: 'Chromatic Only Onyx Dark Panel Header',
};

export const Default = () => {
  return (
    <AstroProvider theme={OnyxDarkTheme}>
      <PanelHeaderComponent />
    </AstroProvider>
  );
};
