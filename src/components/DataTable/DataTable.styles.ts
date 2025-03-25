import { text } from '../Text/Text.styles';

const tableCell = {
  ...text.tableData,
  color: 'text.primary',
  position: 'relative',
  display: 'flex',
  fontSize: '13px',
  height: '100%',
  pr: 'lg',
  flex: '1 1 0%',
  overflow: 'hidden',
  fontWeight: 0,
  justifyContent: 'center',
  py: 10,
  '&.is-key-focused': {
    outline: '1px',
    outlineStyle: 'solid',
    outlineColor: 'focus',
    outlineOffset: '-1px',
    backgroundColor: 'white',
  },
  '&.is-align-start': {
    alignItems: 'flex-start',
  },
  '&.is-align-center': {
    alignItems: 'center',
  },
  '&.is-align-end': {
    alignItems: 'flex-end',
  },
};

const tableCellContents = {
  maxHeight: 80,
  // overflow: 'hidden',
  display: '-webkit-box !important',
  '-webkit-line-clamp': '4',
  '-webkit-box-orient': 'vertical',
};

const tableRow = {
  position: 'relative',
  cursor: 'default',
  borderBottom: '1px',
  outline: '0',
  borderBottomStyle: 'solid !important',
  borderBottomColor: 'neutral.80',
  '&.is-row-focus-visible': {
    border: '1px solid',
    borderColor: 'focus',
    borderBottom: '1px',
    borderBottomColor: 'focus',
    backgroundColor: 'white',
  },
};

const selectableTableRow = {
  ...tableRow,
  bg: 'accent.99',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
    cursor: 'pointer',
  },
  '&.is-focused': {
    boxShadow: '0 0 0 1px inset #D033FF',
  },
  '&.is-disabled': {
    opacity: '0.5 !important',
  },
};

const tableHeadWrapper = {
  borderLeftWidth: '0px',
  borderLeftStyle: 'solid',
  borderRightWidth: '0px',
  borderRightStyle: 'solid',
  flex: '0 0 auto',
  borderBottom: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'neutral.80',
};

const tableCenteredWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

const tableHeadCell = {
  ...text.tableHeader,
  cursor: 'default',
  flexDirection: 'row !important',
  alignItems: 'center',
  fontWeight: 1,
  height: '100%',
  pr: 'lg',
  py: '10px',
  '&.is-click-focused': {
    outline: '0',
  },
  '&.is-key-focused': {
    outline: '1px',
    outlineStyle: 'solid',
    outlineColor: '#D033FF !important',
    outlineOffset: '-2px',
  },
  '&.is-column-sortable': {
    cursor: 'pointer',
    borderLeft: '1px solid',
    borderRight: '1px solid',
    borderColor: 'transparent',
    'svg': {
      fill: 'text.primary',
    },
    '&:hover': {
      color: 'active',
      textDecoration: 'underline',
      borderColor: 'neutral.80',
      'svg': {
        fill: 'active',
      },
    },
  },
  '&.is-column-sortable.is-first-column': {
    borderLeft: 'none',
  },
  '&.is-column-sortable.is-last-column': {
    borderRight: 'none',
  },
  '&.is-align-start': {
    justifyContent: 'flex-start',
  },
  '&.is-align-center': {
    justifyContent: 'center',
  },
  '&.is-align-end': {
    justifyContent: 'flex-end',
  },
};

const tableBody = {
  position: 'relative',
  overflow: 'auto',
};

const tableMenu = {
  borderRadius: '50px',
  mr: 'md',
};

const truncateText = {
  whiteSpace: 'normal',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  overflow: 'hidden',
};

export default {
  selectableTableRow,
  tableBody,
  tableHeadWrapper,
  tableCenteredWrapper,
  tableCellContents,
  tableCell,
  tableRow,
  tableHeadCell,
  tableMenu,
  truncateText,
};
