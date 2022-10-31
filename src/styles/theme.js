import spacing from './spacing';
import colors, { accent, line, shadow, focus } from './colors';
import { fontSizes, fontWeights, textColors } from './text';
import breakpoints from './breakpoints';
import forms from './forms';
import { buttons, images, links, text, variants } from './variants';

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
  buttons,
  textColors,
  links,
  variants,
};
