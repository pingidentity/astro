import { astroTokens } from '@pingux/onyx-tokens';

const fontSizes = astroTokens.default['font-size'];
const avatar = {
  sm: `${astroTokens.size.avatar.sm}px`,
  md: '32px',
  xmd: '44px',
  lg: `${astroTokens.size.avatar.lg}px`,
  xl: `${astroTokens.size.avatar.xl}px`,
};

const avatarLogo = {
  sm: '14px',
  md: '20px',
  xmd: '24px',
  lg: '44px',
  xl: '54px',
};

const avatarFontSize = {
  sm: fontSizes.avatar.sm,
  md: fontSizes.avatar.md,
  xmd: '18px',
  lg: fontSizes.avatar.lg,
  xl: fontSizes.avatar.xl,
};

const iconBadge = {
  md: '48px',
  xl: '104px',
};

const container = {
  xs: ['100%', '540px', '720px', '960px', '1140px', '1540px'],
  sm: ['100%', '540px', '720px', '960px', '1140px', '1540px'],
  md: ['100%', '100%', '720px', '960px', '1140px', '1540px'],
  lg: ['100%', '100%', '100%', '960px', '1140px', '1540px'],
  xl: ['100%', '100%', '100%', '100%', '1140px', '1540px'],
  xx: ['100%', '100%', '100%', '100%', '100%', '1540px'],
  fluid: ['100%', '100%', '100%', '100%', '100%', '100%'],
};

const icons = {
  xxxl: '70px',
};

export default {
  avatar,
  avatarLogo,
  avatarFontSize,
  container,
  iconBadge,
  icons,
};
