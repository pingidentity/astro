import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../../..';
import StickerSheetComponent from '../../../themes/next-gen/stories/StickerSheetComponent';

export default {
  title: 'Chromatic Only Onyx Dark Sticker Sheet',
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <StickerSheetComponent />
    </AstroProvider>
  );
};
