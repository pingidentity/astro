import spacing from './spacing';
import colors, { accent, brand, neutral, line, shadow, focus } from './colors';
import { fontSizes, fontWeights, textColors } from './text';
import breakpoints from './breakpoints';
import forms from './forms';
import variants, { buttons, text } from './variants';

export default {
  space: spacing,
  colors: {
    ...colors,
    background: accent[99],
    menu: brand.slate,
    title: neutral[10],
    subtitle: neutral[30],
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
  },
  shadows: {
    standard: `0 1px 6px ${shadow}`,
    row: `0 0 9px ${accent[95]}`,
    focus: `0 0 5px ${focus}`,
  },
  transitions: {
    panel: 'margin 0.25s',
  },
  forms,
  text,
  buttons,
  textColors,
  variants,
};
