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

export default {
  app,
  popover,
  web,
};
