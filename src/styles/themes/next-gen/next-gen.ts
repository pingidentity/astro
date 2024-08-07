import merge from 'deepmerge';

import theme from '../../theme.js';

import colors from './colors/colors';
import buttons from './variants/button';
import { text as newText } from './variants/text';
import variants, { badges } from './variants/variants';
import forms from './forms';
import { fontSizes, fontWeights } from './text';

import './open_sans.css';

const nextGenTheme = {
  name: 'Next Gen',
  colors,
  buttons,
  forms,
  fontSizes,
  fontWeights,
  lineHeights: {
    body: '1.5',
  },
  text: newText,
  fonts: {
    standard: '"Open Sans", sans-serif',
    body: '"Open Sans", sans-serif',
    heading: '"Open Sans", sans-serif',
  },
  badges,
  variants,
};

const mergedTheme = merge(theme, nextGenTheme);

export default {
  ...mergedTheme,
};
