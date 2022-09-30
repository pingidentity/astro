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
    textDecoration: 'underline',
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
};

export default {
  app,
  web,
};
