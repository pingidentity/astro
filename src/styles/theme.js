import breakpoints from './breakpoints';
import colors, { accent, focus, line, shadow } from './colors';
import forms from './forms';
import spacing from './spacing';
import { fontSizes, fontWeights, textColors } from './text';
import { badges, buttons, cards, grids, images, links, text, variants } from './variants';

export default {
  name: 'Astro',
  space: spacing,
  colors: {
    ...colors,
    background: accent[99],
  },
  borders: {
    separator: `1px solid ${line.hairline}`,
  },
  breakpoints,
  fonts: {
    standard: '"Helvetica Neue", Helvetica, sans-serif',
  },
  fontSizes,
  fontWeights,
  sizes: {
    buttonHeight: 36,
    column: 400,
    container: {
      xs: '400px',
      sm: '550px',
      md: '800px',
      lg: '1200px',
      full: '100%',
    },
  },
  shadows: {
    standard: `0 1px 3px ${shadow}`,
    row: `0 0 9px ${accent[95]}`,
    focus: `0 0 5px ${focus}`,
  },
  forms,
  text,
  images,
  grids,
  buttons,
  badges,
  cards,
  textColors,
  links,
  variants,
};
