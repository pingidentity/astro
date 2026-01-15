import { text } from '../Text/Text.styles';

const defaultFocus = {
  outline: '1px',
  outlineStyle: 'solid',
  outlineColor: 'focus',
  outlineOffset: '-1px',
  zIndex: 2,
};

const container = {
  width: '100%',
  height: '100%',
  borderSpacing: '0',
  borderCollapse: 'collapse',
  position: 'relative',
  '&.is-last-column-sticky': {
    'thead tr th:last-of-type': {
      position: 'sticky',
      right: 0,
      backgroundColor: 'white',
      zIndex: 2,
      '&.is-focused': {
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderWidth: '2px',
      },
    },
    'tbody tr': {
      '&.is-focused td:last-of-type': {
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderWidth: '4px 2px',
      },
      '&:nth-of-type(odd) td:last-of-type': {
        position: 'sticky',
        right: 0,
        backgroundColor: 'inherit',
        '&.is-focused': {
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderWidth: '2px',
        },
      },
      '&:nth-of-type(even) td:last-of-type': {
        position: 'sticky',
        right: 0,
        backgroundColor: 'white',
        '&.is-focused': {
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderWidth: '2px',
        },
      },
    },
  },
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
    zIndex: 2,
    boxShadow: '0 1px 0 #68747f',
  },
};

const head = {
  ...text.label,
  fontWeight: 500,
  textAlign: 'left',
  p: 'sm',
  cursor: 'default',
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const tbody = {
  borderBottom: '1px solid',
  borderBottomColor: 'neutral.80',
  overflowX: 'auto',
  scrollPaddingBottom: '20px',
};

const row = {
  '&:nth-of-type(odd)': {
    backgroundColor: 'neutral.95',
  },
  '&:focus-visible': {
    outline: 'none',
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
  '&.is-disabled': {
    bg: 'neutral.90',
    opacity: 0.5,
    cursor: 'not-allowed',
    '& > td:last-of-type': {
      backgroundColor: 'neutral.90',
    },
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
