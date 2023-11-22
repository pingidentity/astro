const treeRow = {
  flexGrow: 1,
  cursor: 'pointer',
  height: '31px',
  outline: 'none',
  '&.is-selected, &.is-hovered': {
    backgroundColor: 'active',
    '& span': {
      color: 'white',
    },
    '& svg': {
      fill: 'white',
    },
    '& button': {
      fill: 'white',
    },
  },
  '&.is-expanded': {
    marginBottom: 'xs',
  },
  '& :focus': { border: 'none' },
};

const wrapper = {
  '&.is-focused': {
    boxSizing: 'unset',
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  width: '100%',
  ':not(:last-child)': {
    mb: 'sm',
  },
  ':focus': {
    border: 'none',
  },
  outline: 'none',
};

export default {
  treeRow,
  wrapper,
};
