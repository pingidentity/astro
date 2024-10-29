import React from 'react';

import { AstroProvider, NextGenTheme } from '../../../..';

import StickerSheetComponent from './StickerSheetComponent';

export default {
  title: 'NextGen Sticker Sheet',
};

export const Default = () => {
  return (
    <AstroProvider theme={NextGenTheme}>
      <StickerSheetComponent />
    </AstroProvider>
  );
};
