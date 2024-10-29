export const listViewItem = {
  rightOfData: {
    flexShrink: 4,
    whiteSpace: 'nowrap',
  },
  iconContainer: {
    ml: '0px',
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
      boxShadow: '0 0 0 3px inset #1a73e8',
      bg: 'gray-100',
    },
  },
  styledContainer: {
    py: 'md',
    px: 'lg',
    bg: 'transparent',
    '&.is-hovered': {
      bg: 'transparent',
      cursor: 'pointer',
    },
  },
  expandableStyledListItem: {
    pr: '1.25rem',
    pl: 0,
  },
  expandableItemBody: {
    px: '1.5rem',
  },
  expandableRow: {
    '&.has-separator': {
      borderBottom: '1px solid',
      borderBottomColor: 'border.base',
    },
  },
};

export const listView = {
  container: {
    borderRadius: '16px',
    border: '1px solid',
    borderColor: '#e7eef4',
    '& > div > div': {
      '& > div:first-of-type': {
        '& > div > div': {
          borderRadius: '16px 16px 0 0',
        },
      },
      '& > div:last-of-type': {
        '& > div > div': {
          borderRadius: ' 0 0 16px 16px',
        },
      },
    },
  },
};
