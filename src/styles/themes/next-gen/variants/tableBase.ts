import { defaultFocus as baseFocus } from './button';

const borderRadius = '16px';

const defaultFocus = {
  ...baseFocus,
  outlineOffset: '-2px',
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
  '&:not(.has-caption)': {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    '& > tr:first-child': {
      '& > th:first-of-type': {
        borderTopLeftRadius: borderRadius,
      },
      '& > th:last-of-type': {
        borderTopRightRadius: borderRadius,
      },
    },
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
  '& > tr:last-child': {
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
};

const data = {
  ...head,
  py: 'md',
  fontWeight: '1',
};

export const tableBase = {
  caption,
  row,
  thead,
  head,
  tbody,
  data,
};
