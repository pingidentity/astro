import React from 'react';

import { AstroProvider, OnyxDarkTheme } from '../../..';

import { LoaderOnyxComponent } from './LoaderOnyxComponent';

export default {
  title: 'Chromatic Only Onyx Dark Loader',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[OnyxDarkTheme]}>
      <LoaderOnyxComponent />
    </AstroProvider>
  );
};
