import { IconSize, LoaderSize } from '../../../../types';

import icons from './icons';
import styles from './styles';
import tShirtSizes, { iconWrapperSizes } from './tShirtSizes';

const copyButtonSize = 'xs' as IconSize;
const breadcrumbIconMargin = 5;
const breadcrumbIconSize = 'xs' as IconSize;
const accordionItemDefaultLabelTag = 'span';
const iconBadgeCircleColor = 'white';
const rockerButtonGap = '3px';
const accordionItemMarginLeft = 'sm';
const pageHeaderTitleMargin = 'xs';
const activeColor = '#4462ED';
const backgroundBaseColor = 'white';
const defaultLoaderSize = 16;
const buttonLoaderSize = '0.5em' as LoaderSize;
const iFrameContentDivBackgroundColor = '#F7F8FD';
const defaultIconColor = 'currentColor';
const defaultIconSize = 'sm' as IconSize;
const linkSelectFieldWidth = '10em';
const calendarIconSize = 25 as IconSize;

export const astroThemeValues = {
  accordionItemDefaultLabelTag,
  activeColor,
  backgroundBaseColor,
  icons,
  styles,
  tShirtSizes,
  iconBadgeCircleColor,
  iconWrapperSizes,
  iFrameContentDivBackgroundColor,
  copyButtonSize,
  pageHeaderTitleMargin,
  breadcrumbIconSize,
  breadcrumbIconMargin,
  rockerButtonGap,
  accordionItemMarginLeft,
  defaultLoaderSize,
  defaultIconColor,
  defaultIconSize,
  calendarIconSize,
  buttonLoaderSize,
  badgeStyles: {
    blueBg: '#4462ed',
    greyBg: '#253746',
    blueText: '#FFFFFF',
    greyText: '#FFFFFF',
  },
  linkSelectFieldWidth,
};
