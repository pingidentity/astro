import { text } from '../Text/Text.styles';

const defaultFocus = {
  outline: '1px',
  outlineStyle: 'solid',
  outlineColor: 'focus',
  outlineOffset: '-1px',
};

const container = {
  width: '100%',
  borderSpacing: '0',
  borderCollapse: 'collapse',
  position: 'relative',
};

const caption = {
  fontFamily: 'standard',
  fontSize: 'lg',
  fontWeight: '2',
  p: 'sm',
  textAlign: 'left',
};

const thead = {
  borderBottom: '1px solid',
  backgroundColor: 'white',
  borderBottomColor: 'neutral.40',
  '&.is-sticky': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
};

const head = {
  ...text.label,
  fontWeight: 500,
  textAlign: 'left',
  p: 'sm',
  cursor: 'default',
  '&.is-focused': {
    ...defaultFocus,
  },
};

const tbody = {
  borderBottom: '1px solid',
  borderBottomColor: 'neutral.80',
  overflow: 'auto',
};

const row = {
  '&:nth-of-type(odd) ': {
    bg: 'neutral.95',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    // This is the hover state for the row
  },
  '&.is-selected': {
    // This is the selected state for the row
  },
};

const data = {
  ...text.tableData,
  p: 'sm',
  '&.is-focused': {
    ...defaultFocus,
  },
};

export default {
  thead,
  tbody,
  caption,
  container,
  data,
  head,
  row,
};
