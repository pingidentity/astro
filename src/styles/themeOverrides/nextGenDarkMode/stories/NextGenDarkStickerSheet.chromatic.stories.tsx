import React from 'react';

import { AstroProvider, NextGenDarkTheme } from '../../../..';
import StickerSheetComponent from '../../../themes/next-gen/stories/StickerSheetComponent';

export default {
  title: 'Onyx Dark Sticker Sheet',
  tags: ['!dev', '!autodocs'],
};

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenDarkTheme]}>
      <StickerSheetComponent />
    </AstroProvider>
  );
};

Default.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
