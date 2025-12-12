import React from 'react';

import { AstroProvider, OnyxTheme } from '../../..';

import { LoaderOnyxComponent } from './LoaderOnyxComponent';

export default {
  title: 'Chromatic Only Onyx Loader',
};

export const Default = () => {
  return (
    <AstroProvider theme={OnyxTheme}>
      <LoaderOnyxComponent />
    </AstroProvider>
  );
};
