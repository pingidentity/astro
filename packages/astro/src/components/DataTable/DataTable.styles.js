import { text } from './../../styles/variants/text';

const tableCell = {
  ...text.tableData,
  color: 'text.primary',
  position: 'relative',
  display: 'flex',
  fontSize: '13px',
  height: '100%',
  '&.is-key-focused': {
    outline: '1px',
    outlineStyle: 'solid',
    outlineColor: 'accent.50',
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
  flex: '1 1 0%',
  minWidth: '0px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontWeight: '400',
  justifyContent: 'center',
};

const tableRow = {
  position: 'relative',
  cursor: 'default',
  borderBottom: '1px',
  outline: '0',
  borderBottomStyle: 'solid !important',
  backgroundColor: 'accent.99',
  borderBottomColor: 'neutral.80',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.is-row-focus-visible': {
    border: '1px solid',
    borderColor: 'accent.50',
    borderBottom: '1px',
    borderBottomColor: 'accent.50',
    backgroundColor: 'white',
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
  ...text.label,
  cursor: 'default',
  backgroundColor: 'accent.99',
  flexDirection: 'row !important',
  alignItems: 'flex-end',
  fontWeight: 500,
  height: '100%',
  py: '10px',
  '&.is-click-focused': {
    outline: '0',
  },
  '&.is-key-focused': {
    outline: '1px',
    outlineStyle: 'solid',
    outlineColor: 'accent.50 !important',
    outlineOffset: '-1px',
    backgroundColor: 'accent.99 !important',
  },
  '&.is-column-sortable': {
    color: 'text.active',
    cursor: 'pointer',
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
  p: '5px',
  borderRadius: '50px',
};

export default {
  tableBody,
  tableHeadWrapper,
  tableCenteredWrapper,
  tableCellContents,
  tableCell,
  tableRow,
  tableHeadCell,
  tableMenu,
};
