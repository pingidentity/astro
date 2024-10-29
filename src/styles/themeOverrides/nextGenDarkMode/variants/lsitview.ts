export const listViewItem = {
  styledListItem: {
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'border.base',
    },
    bg: 'background.base',
    '&.is-selected': {
      bg: 'background.hover',
    },
    '&.is-hovered': {
      bg: 'background.hover',
    },
    '&.is-focused': {
      boxShadow: '0 0 0 3px inset #1a73e8',
      bg: 'background.hover',
    },
  },
};

export const listView = {
  container: {
    borderColor: 'border.base',
  },
};
