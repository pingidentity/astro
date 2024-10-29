import merge from 'deepmerge';

import { themes } from '../../../utils/devUtils/constants/themes';
import theme from '../../theme.js';

import codeView from './codeView/codeView';
import colors from './colors/colors';
import { badges } from './variants/badges';
import buttons from './variants/button';
import cards from './variants/cards';
import images from './variants/images';
import links from './variants/links';
import navigationHeader from './variants/navigationHeader';
import { text as newText } from './variants/text';
import variants from './variants/variants';
import forms from './forms';
import sizes from './sizes';
import spacing from './spacing';
import { fontSizes, fontWeights } from './text';

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
