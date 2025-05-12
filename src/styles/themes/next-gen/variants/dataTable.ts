const container = {
  border: '1px solid',
  borderColor: 'border.base',
  borderRadius: '16px',
};

const tableRow = {
  borderTop: '1px solid',
  borderTopColor: 'border.base',
  borderBottom: '0',
  pl: 'lg',
  '&:last-of-type': {
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
};

const selectableTableRow = {
  ...tableRow,
  bg: 'background.base',
  '&.is-hovered': {
    bg: 'gray-100',
  },
  '&.is-selected': {
    bg: 'gray-100',
  },
  '&.is-focused': {
    boxShadow: '0 0 0 3px inset #1a73e8',
    bg: 'gray-100',
  },
  '&.is-disabled': {
    opacity: '0.5 !important',
  },
};

export const dataTable = {
  container,
  tableRow,
  selectableTableRow,
  tableHeadWrapper: {
    borderBottom: '0',
  },
  tableHeadCell: {
    px: 'lg',
    fontWeight: '2',
    fontSize: 'md',
    '&.is-first-column': {
      borderTopLeftRadius: '16px',
    },
    '&.is-last-column': {
      borderTopRightRadius: '16px',
    },
    '&.is-key-focused': {
      outline: '1px',
      outlineStyle: 'solid',
      outlineColor: 'active',
      outlineOffset: '-2px',
    },
  },
  rowHeader: {
    py: '20px !important',
  },
  tableCell: {
    fontSize: 'md',
    px: 'lg',
  },
};
