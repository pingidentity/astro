export const menuItem = {
  item: {
    bg: 'transparent',
    padding: '12px 12px',
    outline: 'none',
    color: 'gray-400',
    cursor: 'pointer',
    '&.is-hovered': {
      bg: '#2C323A',
      color: 'gray-200',
      '> *': {
        color: 'gray-200',
      },
    },
    '&.is-focused': {
      bg: '#2C323A',
      color: 'gray-200',
      outline: '1px solid',
      outlineOffset: '1px',
      outlineColor: 'primary',
      '> *': {
        color: 'gray-200',
      },
    },
    '&.is-selected, &.is-pressed': {
      color: 'text.secondary',
      bg: 'gray-800',
      '> *': {
        color: 'gray-200',
      },
    },
  },
  separator: {
    my: 'sm',
  },
};

export const menu = {
  backgroundColor: '#23282e',
  borderColor: 'border.attachment',
};
