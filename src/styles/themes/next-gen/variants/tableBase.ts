import colors from '../colors/colors';

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
  backgroundColor: 'background.base',
  px: 'lg',
  color: 'text.primary',
  borderBottom: '1px solid',
  borderBottomColor: 'border.base',
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
};

const row = {
  borderBottom: '1px solid',
  borderBottomColor: 'border.base',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'background.hover',
  },
  '&:nth-of-type(odd)': {
    bg: 'background.base',
    '&.is-hovered': {
      bg: 'background.hover',
    },
  },
};

const thead = {
  borderBottomColor: 'border.base',
  backgroundColor: 'background.base',
  '&.is-sticky': {
    boxShadow: `0 1px 0 ${colors.border.base}`,
  },
};

const head = {
  px: 'lg',
  py: 'sm',
  fontSize: 'md',
  fontWeight: '2',
  color: 'text.primary',
  lineHeight: 'body',
  '&.is-focused': {
    ...defaultFocus,
  },
};

const tbody = {
  borderTopColor: 'border.base',
  borderBottom: 'unset',
  backgroundColor: 'background.base',
  borderBottomLeftRadius: borderRadius,
  borderBottomRightRadius: borderRadius,
};

const data = {
  ...head,
  py: 'md',
  fontWeight: '1',
};

export const tableBase = {
  container,
  caption,
  row,
  thead,
  head,
  tbody,
  data,
};
