import type { IconSize } from '../../../../types';
import { LoaderSize } from '../../../../types';

import customSizes from './customSizes';
import icons from './icons';
import styles from './styles';
import tShirtSizes, { iconWrapperSizes } from './tShirtSizes';

const accordionHoveredState = {
  '&.is-hovered': {
    color: 'active',
    textDecoration: 'underline',
  },
};

const accordionItemDefaultLabelTag = 'h2';
const iconBadgeCircleColor = 'badge.iconBadge';
const activeColor = '#1a73e8';
const backgroundBaseColor = 'white';
const iFrameContentDivBackgroundColor = backgroundBaseColor;
const defaultIconColor = 'gray-800';
const defaultIconSize = 'sm' as IconSize;
const buttonLoaderSize = 'sm' as LoaderSize;
const badgeStyles = {
  blueBg: '#EAF2FD',
  greyBg: '#455469',
  blueText: '#155CBA',
  greyText: '#FFFFFF',
};
const linkSelectFieldWidth = '200px';
const calendarIconSize = 'sm' as IconSize;
const badgeTextFontSize = '75%';
const navBarIconSize = '20px' as IconSize;

export const nextGenThemeValues = {
  accordionHoveredState,
  activeColor,
  navBarIconSize,
  backgroundBaseColor,
  styles,
  icons,
  tShirtSizes,
  iconBadgeCircleColor,
  iconWrapperSizes,
  defaultIconColor,
  accordionItemDefaultLabelTag,
  iFrameContentDivBackgroundColor,
  rockerButtonGap: '0px',
  defaultIconSize,
  calendarIconSize,
  buttonLoaderSize,
  badgeStyles,
  badgeTextFontSize,
  linkSelectFieldWidth,
  ...customSizes,
};
