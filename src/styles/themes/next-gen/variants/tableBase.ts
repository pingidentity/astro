import { astroTokens } from '@pingux/onyx-tokens';

import { defaultFocus as baseFocus } from './button';

const borderRadius = '16px';

const defaultFocus = {
  ...baseFocus,
  outlineOffset: '-2px',
};

const container = {
  '& > thead > tr': {
    '& > th:first-of-type': {
      borderTopLeftRadius: borderRadius,
    },
    '& > th:last-of-type': {
      borderTopRightRadius: borderRadius,
    },
  },
  '& > tbody > tr:last-child': {
    borderBottom: 'unset',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    '&.is-focused': {
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
    },
    '& > td:first-of-type': {
      borderBottomLeftRadius: borderRadius,
    },
    '& > td:last-of-type': {
      borderBottomRightRadius: borderRadius,
    },
  },
  '&.has-caption > thead > tr:first-of-type > th': {
    borderRadius: '0',
  },
  '&.has-pagination > tbody > tr:last-child': {
    borderRadius: 0,
    '& > td': {
      borderRadius: 0,
    },
  },
};

const caption = {
  backgroundColor: 'backgroundBase',
  px: 'lg',
  color: astroTokens.color.font.base,
  borderBottom: '1px solid',
  borderBottomColor: astroTokens.color.common.border,
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
};

const row = {
  borderBottom: '1px solid',
  borderBottomColor: astroTokens.color.common.border,
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: astroTokens.color['table-row'].hover.bg,
    '& > td:last-of-type': {
      bg: astroTokens.color['table-row'].hover.bg,
    },
  },
  '&:nth-of-type(odd)': {
    bg: astroTokens.color.common.bg.base,
    '&.is-hovered': {
      bg: astroTokens.color['table-row'].hover.bg,
    },
    '& > td:last-of-type': {
      bg: astroTokens.color.common.bg.base,
    },
  },
};

const thead = {
  borderBottomColor: astroTokens.color.common.border,
  backgroundColor: 'backgroundBase',
  '&.is-sticky': {
    border: 'none',
    boxShadow: `0 1px 0 ${astroTokens.color.common.border}`,
  },
};

const resizer = {
  backgroundColor: astroTokens.color.common['border-dark'],
};

const head = {
  px: 'lg',
  py: 'sm',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&:last-of-type': {
    backgroundColor: 'backgroundBase',
  },
};

const tbody = {
  borderTopColor: astroTokens.color.common.border,
  borderBottom: 'unset',
  backgroundColor: 'backgroundBase',
  borderBottomLeftRadius: borderRadius,
  borderBottomRightRadius: borderRadius,
};

const data = {
  ...head,
  py: 'md',
  fontWeight: '0',
  '&:last-of-type': {
    backgroundColor: 'backgroundBase',
    zIndex: 1,
  },
};

export const tableBase = {
  container,
  caption,
  row,
  thead,
  head,
  tbody,
  data,
  resizer,
};
