import buttons, { defaultFocus } from './button';

const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
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
    color: 'blue-600',
  },
  '&.is-pressed': {
    color: 'blue-600',
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
    color: 'blue-600',
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

export default {
  nextGen,
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
