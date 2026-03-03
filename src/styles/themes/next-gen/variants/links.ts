import { astroTokens } from '@pingux/onyx-tokens';

import buttons, { defaultFocus } from './button';

const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
};

const app = {
  lineHeight: '160%',
  '&.is-hovered': {
    color: astroTokens.color.blue[600],
    textDecorationColor: astroTokens.color.blue[600],
  },
  '&.is-focused': {
    ...navBarFocus,
    borderRadius: '2px',
  },
  '&.is-pressed': {
    color: astroTokens.color.blue[600],
    textDecorationColor: astroTokens.color.blue[600],
  },
  '&:visited': {
    color: astroTokens.color.purple[700],
    textDecoration: 'underline',
  },
};

const nextGen = {
  color: 'gray-800',
  fontSize: 'md',
  py: 'sm',
  px: 'md',
  textDecoration: 'none',
  borderRadius: '4px',
  lineHeight: '1.5',
  minHeight: '22.5px',
  fontFamily: 'standard',
  cursor: 'pointer',
  '&.is-hovered': {
    color: astroTokens.color.blue[600],
  },
  '&.is-pressed': {
    color: astroTokens.color.blue[600],
  },
};

const onyx = {
  ...nextGen,
};

const sideNav = {
  ...nextGen,
  px: '0',
  display: 'block',
  position: 'relative',
  cursor: 'pointer',
  '&:before': {
    position: 'absolute',
    display: 'block',
    borderRadius: '.25rem',
    content: '""',
    top: '0',
    right: '-1rem',
    bottom: 0,
    left: '-1rem',
    transition: 'background-color .15s ease',
  },
  '&.is-selected': {
    color: astroTokens.color.blue[600],
    '&:before': {
      backgroundColor: 'active_light',
    },
  },
};

const footerLinks = {
  ...sideNav,
};

const footerHeader = {
  ...footerLinks,
  fontWeight: '2',
};

const button = {
  ...buttons.default,
  textDecoration: 'none',
};

const primaryButton = {
  ...buttons.primary,
  textDecoration: 'none',
};

const navBarLogoLink = {
  borderRadius: '4px',
  px: 'md',
  py: 'sm',
  '&.is-focused': {
    ...navBarFocus,
  },
};

const copyRightLink = {
  '&.is-focused': {
    ...defaultFocus,
  },
};

const footerLink = {
  '&.is-focused': {
    ...defaultFocus,
  },
};

const footerEALink = {
  '&.is-focused': {
    ...defaultFocus,
  },
};

const skip = {
  py: 'sm',
  px: 'md',
  height: '40px',
  lineHeight: '24px',
};

const navItem = {
  boxShadow: 'none !important',
  '&.is-focused': {
    ...navBarFocus,
    borderRadius: '4px',
    outlineOffset: '-2px',
  },
};

export default {
  app,
  skip,
  nextGen,
  navItem,
  onyx,
  sideNav,
  footerLinks,
  footerHeader,
  button,
  primaryButton,
  navBarLogoLink,
  copyRightLink,
  footerEALink,
  footerLink,
};
