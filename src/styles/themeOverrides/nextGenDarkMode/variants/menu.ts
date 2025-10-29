export const menuItem = {
  item: {
    bg: 'transparent',
    padding: '10px 10px',
    outline: 'none',
    color: 'gray-400',
    cursor: 'pointer',
    '&.is-focused, &.is-selected, &.is-pressed': {
      bg: 'gray-800',
      color: 'text.primary',
      '> *': {
        color: 'text.primary',
      },
    },
    '&.is-pressed': {
      color: 'text.secondary',
      bg: 'gray-800',
    },
  },
  separator: {
    my: 'sm',
  },
};

export const menu = {
  backgroundColor: '#23282e',
};
