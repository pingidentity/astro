import { astroTokens } from '@pingux/onyx-tokens';

import sizes from './sizes';

const fontSize = astroTokens.default['font-size'];

const fontSizeBase = 0.9375;

export const fontSizes = {
  avatar: {
    'sm': `calc(${sizes.avatar.sm} * .4)`,
    'md': `calc(${sizes.avatar.md} * .4)`,
    'lg': `calc(${sizes.avatar.lg} * .4)`,
    'xl': `calc(${sizes.avatar.xl} * .4)`,
  },
  'xs': '11px',
  'tiny': `${fontSize.tiny}px`,
  'sm': `${fontSize.small || fontSize.sm}px`,
  'small': `${fontSize.small}px`,
  'md': `${fontSizeBase * 1}rem`,
  'lg': `${fontSizeBase * 1.25}rem`,
  'xl': `${fontSizeBase * 1.5}rem`,
  'xx': `${fontSizeBase * 1.75}rem`,
  'xxx': `${fontSizeBase * 2.25}rem`,
};

export const fontWeights = {
  [-1]: 300,
  0: 400,
  1: 500,
  2: 600,
  3: 700,
};
