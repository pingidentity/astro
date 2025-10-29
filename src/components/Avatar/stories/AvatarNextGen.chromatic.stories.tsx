import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';

import AvatarNextGen from './AvatarNextGen';

export default {
  title: 'Chromatic Only Onyx Avatar',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <AvatarNextGen />
    </AstroProvider>
  );
};
