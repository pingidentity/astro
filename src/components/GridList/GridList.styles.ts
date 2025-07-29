const container = {
  '&.is-focused': {
    outline: 'none !important',
  },
  ':focus': {
    outline: 'none',
  },
};

const rowContainer = {
  alignItems: 'center',
  alignContent: 'center',
  '&.is-dragging': {
    opacity: 0.4,
  },
};

export default {
  container,
  rowContainer,
};
