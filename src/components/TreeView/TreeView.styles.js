const treeRow = {
  flexGrow: 1,
  cursor: 'pointer',
  height: '31px',
  outline: 'none',
  '&.is-selected, &.is-hovered, &.is-drop-target': {
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
  '& :focus': { border: 'none' },
};

const wrapper = {
  '&.is-focused': {
    boxSizing: 'unset',
    outline: '1px solid',
    outlineColor: 'blue',
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

const rowWrapper = {
  '&.is-focused': {
    boxSizing: 'unset',
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  border: 'none',
  ':focus': {
    border: 'none',
  },
  '&.is-expanded': {
    marginBottom: 'xs',
  },
  outline: 'none',
};

const insertionIndicator = {
  width: '100%',
  outline: '1px solid',
  outlineColor: 'active',
};

export default {
  treeRow,
  rowWrapper,
  wrapper,
  insertionIndicator,
};
