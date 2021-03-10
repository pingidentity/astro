const item = {
  bg: 'transparent',
  padding: '10px 10px',
  outline: 'none',
  cursor: 'pointer',
  '&.is-hovered': {
    bg: 'neutral.95',
  },
  '&.is-focused, &.is-selected': {
    borderColor: 'neutral.95',
    boxShadow: 'focus',
    bg: 'white',
  },
};

const separator = {
  padding: '0px',
  '& > [role="separator"]': {
    margin: '0px',
  },
};

export default {
  item,
  separator,
};
