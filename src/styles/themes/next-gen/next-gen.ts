import merge from 'deepmerge';

import theme from '../../theme.js';

import codeView from './codeView/codeView';
import colors from './colors/colors';
import buttons from './variants/button';
import cards from './variants/cards';
import links from './variants/links';
import { text as newText } from './variants/text';
import variants, { badges } from './variants/variants';
import forms from './forms';
import spacing from './spacing';
import { fontSizes, fontWeights } from './text';

import './open_sans.css';

const breakpoints = [
  '0px',
  '576px',
  '768px',
  '992px',
  '1200px',
  '1600px',
];

const nextGenTheme = {
  name: 'Next Gen',
  colors,
  breakpoints,
  buttons,
  forms,
  fontSizes,
  fontWeights,
  lineHeights: {
    body: '1.5',
    md: '1.75',
  },
  text: newText,
  fonts: {
    standard: '"Open Sans", sans-serif',
    body: '"Open Sans", sans-serif',
    heading: '"Open Sans", sans-serif',
    codeView: 'Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace',
  },
  sizes: {
    container: {
      xs: ['100%', '540px', '720px', '960px', '1140px', '1540px'],
      sm: ['100%', '540px', '720px', '960px', '1140px', '1540px'],
      md: ['100%', '100%', '720px', '960px', '1140px', '1540px'],
      lg: ['100%', '100%', '100%', '960px', '1140px', '1540px'],
      xl: ['100%', '100%', '100%', '100%', '1140px', '1540px'],
      xx: ['100%', '100%', '100%', '100%', '100%', '1540px'],
      fluid: ['100%', '100%', '100%', '100%', '100%', '100%'],
    },
  },
  badges,
  space: spacing,
  links,
  cards,
  variants,
  overrides: {
    codeView,
  },
};

const mergedTheme = merge(theme, nextGenTheme);

export default {
  ...mergedTheme,
  breakpoints,
};
