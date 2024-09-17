import sizes from './sizes';

const fontSizeBase = 0.9375;

export const fontSizes = {
  avatar: {
    'sm': `calc(${sizes.avatar.sm} * .4)`,
    'md': `calc(${sizes.avatar.md} * .4)`,
    'lg': `calc(${sizes.avatar.lg} * .4)`,
    'xl': `calc(${sizes.avatar.xl} * .4)`,
  },
  'xs': `${fontSizeBase * 0.8}rem`,
  'sm': '0.875rem',
  'md': `${fontSizeBase * 1}rem`,
  'lg': `${fontSizeBase * 1.25}rem`,
  'xl': `${fontSizeBase * 1.5}rem`,
  'xx': `${fontSizeBase * 1.75}rem`,
  'xxx': `${fontSizeBase * 2.25}rem`,
};

export const fontWeights = {
  [-1]: 300,
  0: 400,
  1: 400,
  2: 600,
  3: 600,
};
