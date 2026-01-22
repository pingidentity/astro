import { nextGenThemeValues } from '../../../themes/next-gen/customProperties';

import icons from './icons';

const backgroundBaseColor = '#23282e';
const defaultIconColor = 'gray-400';
const iFrameContentDivBackgroundColor = backgroundBaseColor;

export const nextGenDarkThemeValues = {
  ...nextGenThemeValues,
  backgroundBaseColor,
  iFrameContentDivBackgroundColor,
  icons,
  defaultIconColor,
  badgeStyles: {
    blueBg: '#1A73E8',
    greyBg: '#F6F8FA',
    blueText: '#000000',
    greyText: '#000000',
  },
};
