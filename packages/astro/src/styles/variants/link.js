const link = {
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
  '&.is-disabled': {
    pointerEvents: 'none',
  },
};

export default link;
