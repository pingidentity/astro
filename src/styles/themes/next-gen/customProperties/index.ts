import type { IconSize } from '../../../../types';
import { LoaderSize } from '../../../../types';

import customSizes from './customSizes';
import icons from './icons';
import styles from './styles';
import tShirtSizes, { iconWrapperSizes } from './tShirtSizes';

const accordionItemDefaultLabelTag = 'h2';
const iconBadgeCircleColor = 'badge.iconBadge';
const activeColor = '#1a73e8';
const backgroundBaseColor = 'white';
const iFrameContentDivBackgroundColor = backgroundBaseColor;
const defaultIconColor = 'gray-800';
const defaultIconSize = 'md' as IconSize;
const buttonLoaderSize = 'sm' as LoaderSize;

export const nextGenThemeValues = {
  activeColor,
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
  buttonLoaderSize,
  ...customSizes,
};
