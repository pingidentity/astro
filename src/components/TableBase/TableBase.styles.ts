import { astroTokens } from '@pingux/onyx-tokens';

import { text } from '../Text/Text.styles';

const defaultFocus = {
  outline: '1px',
  outlineStyle: 'solid',
  outlineColor: 'focus',
  outlineOffset: '-1px',
  zIndex: 2,
};

// Pseudo-element styles for the sticky last column separator and shadow.
// Using ::after/::before instead of border-left + box-shadow because:
//   - border-collapse:collapse absorbs border-left (invisible until adjacent cell scrolls away)
//   - overflow:auto on the scroll container clips outward box-shadow
// Pseudo-elements live inside the sticky cell's stacking context and render
// within the visible viewport, so neither constraint applies.
const stickyColumnSeparator = {
  // 1px left border line — unaffected by border-collapse
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '1px',
    backgroundColor: astroTokens.color.common.border,
    pointerEvents: 'none',
  },
  // drop shadow extending left into the scrolling area — unaffected by overflow clipping
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-6px',
    width: '6px',
    background: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.13))',
    pointerEvents: 'none',
  },
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
      ...stickyColumnSeparator,
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
        zIndex: 1,
        backgroundColor: 'inherit',
        ...stickyColumnSeparator,
        '&.is-focused': {
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderWidth: '2px',
        },
      },
      '&:nth-of-type(even) td:last-of-type': {
        position: 'sticky',
        right: 0,
        zIndex: 1,
        backgroundColor: 'white',
        ...stickyColumnSeparator,
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
    '& .resizer': {
      backgroundColor: 'focus',
    },
  },
};

const resizer = {
  cursor: 'col-resize',
  display: 'inline-block',
  width: '2px',
  height: '100%',
  backgroundColor: 'neutral.10',
  boxSizing: 'content-box',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  backgroundClip: 'content-box',
  position: 'absolute',
  right: '-0.25rem',
  top: '0',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-resizing': {
    backgroundColor: 'focus',
    outline: '0px',
  },
};

// Resets native <button> chrome so the sort trigger reads as plain header
// text/icon, matching `head`'s typography, while remaining its own
// focusable, activatable element (a sibling to the resizer, not a
// descendant of it, or vice versa).
const sortButton = {
  ...text.label,
  fontWeight: 500,
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  textAlign: 'left',
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
  '&.has-actions.is-hovered:not(.is-disabled)': {
    cursor: 'pointer',
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
  resizer,
  sortButton,
};
