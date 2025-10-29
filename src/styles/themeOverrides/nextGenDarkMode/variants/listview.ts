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
  expandableStyledListItem: {
    '&.is-hovered': {
      bg: 'background.hover',
    },
    '&.is-selected': {
      bg: 'background.hover',
    },
    '&.is-focused': {
      bg: 'background.hover',
    },
  },
  expandIcon: {
    color: 'gray-400',
  },
};

export const listView = {
  container: {
    borderColor: 'border.base',
  },
};

export const lisViewItemChart = {
  title: {
    color: 'gray-100',
  },
  count: {
    color: 'gray-100',
  },
  countLabel: {
    color: 'gray-100',
  },
  chartLabel: {
    color: 'gray-100',
  },
  trend: {
    color: 'gray-100',
  },
  chartButton: {
    color: 'gray-100',
  },
};
