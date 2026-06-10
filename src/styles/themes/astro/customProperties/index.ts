import { hoveredState } from '../../../../components/AccordionGroup/Accordion.styles';
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
const pageHeaderAddIconMargin = 'sm';
const pageHeaderAddIconSize = 'sm' as IconSize;
const activeColor = '#4462ED';
const backgroundBaseColor = 'white';
const defaultLoaderSize = 16;
const buttonLoaderSize = '0.5em' as LoaderSize;
const iFrameContentDivBackgroundColor = '#F7F8FD';
const defaultIconColor = 'currentColor';
const defaultIconSize = 'sm' as IconSize;
const linkSelectFieldWidth = '10em';
const calendarIconSize = 25 as IconSize;
const navBarIconSize = 18 as IconSize;
const badgeTextFontSize = '';
const modalCloseIconSize = 'sm' as IconSize;
const linkSelectFieldIcon = 'sm' as IconSize;

export const astroThemeValues = {
  accordionHoveredState: hoveredState,
  accordionItemDefaultLabelTag,
  navBarIconSize,
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
  pageHeaderAddIconMargin,
  pageHeaderAddIconSize,
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
  badgeTextFontSize,
  modalCloseIconSize,
  linkSelectFieldIcon,
};
