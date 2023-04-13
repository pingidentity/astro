const hover = {
  bg: 'accent.99',
  '&.is-hovered': {
    bg: 'white',
  },
};

const container = {
  display: 'flex',
  flex: '1 1 0px',
  cursor: 'pointer',
  height: '64px',
  pl: 'md',
  pr: 'sm',
  pt: 16,
  pb: 16,
  justifyContent: 'center',
  '&.is-selected': {
    bg: 'white',
  },
  ...hover,
};

export default {
  container,
  hover,
};
