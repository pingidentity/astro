import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../..';

import AvatarNextGen from './AvatarNextGen';

export default {
  title: 'Chromatic Only Onyx Dark Avatar',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <AvatarNextGen />
    </AstroProvider>
  );
};
