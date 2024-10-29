import { merge } from 'theme-ui';

import { themes } from '../../../utils/devUtils/constants/themes';
import NextGenTheme from '../../themes/next-gen';

import badges from './variants/badges';
import buttons from './variants/buttons';
import cards from './variants/cards';
import forms from './variants/forms';
import links from './variants/links';
import variants from './variants/variants';
import { colors } from './colors';

const override = {
  forms,
  colors,
  variants,
  buttons,
  badges,
  links,
  cards,
  name: themes.NEXT_GEN_DARK,
};


const NextGenDarkTheme = merge(NextGenTheme, override);

export default NextGenDarkTheme;
