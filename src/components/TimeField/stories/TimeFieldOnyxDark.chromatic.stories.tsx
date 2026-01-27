import React from 'react';

import { AstroProvider, OnyxDarkTheme } from '../../..';

import OnyxTimeField from './OnyxTimeField';

export default {
  title: 'Onyx Dark TimeField',
};

export const Default = () => {
  return (
    <AstroProvider theme={OnyxDarkTheme}>
      <OnyxTimeField />
    </AstroProvider>
  );
};
