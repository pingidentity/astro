import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import { CalloutNextGenComponent } from './CalloutNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Dark Callout',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <CalloutNextGenComponent />
    </AstroProvider>
  );
};
