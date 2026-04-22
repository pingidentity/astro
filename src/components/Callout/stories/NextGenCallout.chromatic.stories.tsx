import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import { CalloutNextGenComponent } from './CalloutNextGenComponent';

export default {
  title: 'Chromatic Only Onyx Callout',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <CalloutNextGenComponent />
    </AstroProvider>
  );
};
