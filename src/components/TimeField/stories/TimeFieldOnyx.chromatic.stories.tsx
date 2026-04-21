import React from 'react';

import { AstroProvider, OnyxTheme } from '../../..';

import OnyxTimeField from './OnyxTimeField';

export default {
  title: 'Onyx TimeField',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider theme={OnyxTheme}>
      <OnyxTimeField />
    </AstroProvider>
  );
};
