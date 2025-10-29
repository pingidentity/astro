import merge from 'deepmerge';

import { themes } from '../../../utils/devUtils/constants/themes.js';
import theme from '../../theme.js';

import codeView from './codeView/codeView.js';
import colors from './colors/colors.js';
import { badges } from './variants/badges.js';
import buttons from './variants/button.js';
import cards from './variants/cards.js';
import images from './variants/images.js';
import links from './variants/links.js';
import navigationHeader from './variants/navigationHeader.js';
import { text as newText } from './variants/text.js';
import variants from './variants/variants.js';
import forms from './forms.js';
import sizes from './sizes.js';
import spacing from './spacing.js';
import { fontSizes, fontWeights } from './text.js';

const breakpoints = [
  '0px',
  '576px',
  '768px',
  '992px',
  '1200px',
  '1600px',
];

const nextGenTheme = {
  name: themes.NEXT_GEN,
  colors,
  breakpoints,
  buttons,
  forms,
  fontSizes,
  fontWeights,
  lineHeights: {
    body: '1.6',
    md: '1.75',
  },
  text: newText,
  fonts: {
    standard: '"Open Sans", sans-serif',
    body: '"Open Sans", sans-serif',
    heading: '"Open Sans", sans-serif',
    codeView: 'Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace',
  },
  sizes,
  badges,
  navigationHeader,
  space: spacing,
  links,
  cards,
  variants,
  images,
  overrides: {
    codeView,
  },
};

const mergedTheme = merge(theme, nextGenTheme);

export default {
  ...mergedTheme,
  breakpoints,
};
