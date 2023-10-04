const treeRow = {
  flexGrow: 1,
  cursor: 'pointer',
  height: '31px',
  outline: 'none',
  '&.is-selected, &.is-hovered, &.is-focused': {
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
};

export default {
  treeRow,
};
