import { focusWithCroppedOutline } from '../Button/Buttons.styles';

const app = {
  color: 'active',
  fontFamily: 'standard',
  fontSize: 'md',
  textDecoration: 'none',
  outline: 'none',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    ...focusWithCroppedOutline,
  },
  '&.is-pressed': {
    color: 'accent.40',
    textDecoration: 'underline',
  },
  '&.is-disabled': {
    pointerEvents: 'none',
  },
};

const web = {
  ...app,
  textDecoration: 'underline',
  '&:visited': {
    color: 'decorative.7',
  },
  '&.is-focused': {
    ...focusWithCroppedOutline,
  },
};

const popover = {
  ...app,
  color: 'white',
  fontSize: 'sm',
  fontWeight: 1,
  textDecoration: 'underline',
  '&.is-hovered': {
    cursor: 'pointer',
  },
};

const copyRightLink = {
  fontFamily: 'standard',
  color: 'gray-100',
  fontSize: 'md',
  textDecoration: 'none',
  borderRadius: '1px',
  '&.is-hovered': {
    color: '#c5d2df',
  },
};

const footerLink = {
  fontFamily: 'standard',
  px: 'md',
  py: 'sm',
  fontSize: 'md',
  color: 'gray-100',
  textDecoration: 'none',
  borderRadius: '1px',
  '&.is-hovered': {
    color: '#c5d2df',
  },
};

const footerEALink = {
  ...footerLink,
  display: 'flex',
  flexShrink: '0',
  justifyContent: 'center',
};

export default {
  app,
  popover,
  web,
  copyRightLink,
  footerLink,
  footerEALink,
};
