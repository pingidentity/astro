import { focusWithCroppedOutline } from './buttons';

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

export default {
  app,
  web,
};
