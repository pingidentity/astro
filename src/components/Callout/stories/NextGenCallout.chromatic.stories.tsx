import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import { CalloutNextGenComponent } from './CalloutNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Callout',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <CalloutNextGenComponent />
    </AstroProvider>
  );
};
