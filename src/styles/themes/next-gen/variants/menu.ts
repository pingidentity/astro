export const menu = {
  p: 'sm',
  border: '1px solid',
  borderColor: 'border.base',
};

export const menuItem = {
  item: {
    bg: 'transparent',
    padding: '10px 10px',
    outline: 'none',
    color: 'text.primary',
    cursor: 'pointer',
    '&.is-focused, &.is-selected, &.is-pressed': {
      bg: 'gray-100',
      color: 'text.primary',
      '> *': {
        color: 'text.primary',
      },
    },
    '&.is-pressed': {
      color: 'text.primary',
      bg: 'lightblue',
    },
  },
  separator: {
    my: 'sm',
  },
};
