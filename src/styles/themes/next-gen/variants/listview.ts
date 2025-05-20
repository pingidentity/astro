export const focusBoxShadow = '0 0 0 3px inset #1a73e8';
export const borderRadius = '16px';

export const listViewItem = {
  rightOfData: {
    whiteSpace: 'nowrap',
  },
  iconContainer: {
    ml: '0',
  },
  imageWrapper: {
    ml: 'md',
  },
  styledListItem: {
    bg: 'white',
    '&.is-selected': {
      bg: 'gray-100',
    },
    borderBottom: 'none',
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'gray-200',
    },
    '&.is-hovered': {
      bg: 'gray-100',
    },
    '&.is-focused': {
      boxShadow: focusBoxShadow,
      bg: 'gray-100',
    },
    '&.is-first-item': {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    '&.is-last-item': {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      '&.has-separator': {
        border: 'none',
      },
    },
  },
  styledContainer: {
    bg: 'transparent',
    '&.is-hovered': {
      bg: 'transparent',
      cursor: 'pointer',
    },
  },
  expandableStyledListItem: {
    px: 'lg',
    bg: 'background.base',
    '&.is-first-item': {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    '&.is-last-item': {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      '&.is-hovered, &.is-expanded': {
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
    '&.is-hovered': {
      bg: 'gray-100',
    },
    '&.is-selected': {
      bg: 'gray-100',
    },
    '&.is-focused': {
      boxShadow: focusBoxShadow,
      bg: 'gray-100',
    },
  },
  expandableItemBody: {
    px: 'lg',
    outline: 'none',
    '&.is-last-item-body': {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
    '&.is-focused': {
      boxShadow: focusBoxShadow,
    },
  },
  expandableRow: {
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'border.base',
    },
    '&.has-separator.is-last-row': {
      border: 'none',
    },
  },
  editIcon: {
    width: '1.5rem !important',
    height: '1.5rem !important',
  },
  menuIcon: {
    width: '1.5rem !important',
    height: '1.5rem !important',
  },
};

export const listView = {
  container: {
    borderRadius,
    border: '1px solid',
    borderColor: '#e7eef4',
  },
};

export const lisViewItemChart = {
  title: {
    color: 'gray-900',
  },
  count: {
    color: 'gray-900',
  },
  countLabel: {
    color: 'gray-900',
  },
  chartLabel: {
    color: 'gray-900',
  },
  trend: {
    color: 'gray-900',
  },
  chartButton: {
    color: 'gray-900',
  },
};
