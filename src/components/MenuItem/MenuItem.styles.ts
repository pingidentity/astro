const item = {
  bg: 'transparent',
  padding: '10px 10px',
  outline: 'none',
  cursor: 'pointer',
  '&.is-focused, &.is-selected, &.is-pressed': {
    color: 'white',
    bg: 'active',
    '> *': {
      color: 'white',
    },
  },
  '&.is-pressed': {
    bg: 'accent.20',
  },
};

const separator = {
  padding: '0px',
  '& > [role="separator"]': {
    margin: '0px',
  },
  outline: 'none',
};

export default {
  item,
  separator,
};
