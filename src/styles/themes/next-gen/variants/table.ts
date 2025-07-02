const container = {
  overflow: 'hidden',
};

const caption = {
  px: 'lg',
  color: 'text.primary',
  borderBottom: '1px solid',
  borderBottomColor: 'border.base',
};

const head = {
  px: 'lg',
  py: 'sm',
  fontSize: 'md',
  fontWeight: '2',
  color: 'text.primary',
  lineHeight: 'body',
};

const body = {
  borderTopColor: 'border.base',
  borderBottom: 'unset',
  backgroundColor: 'background.base',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  '&& > tr:not(:last-child)': {
    borderBottom: '1px solid',
    borderBottomColor: 'border.base',
  },
  '&& > tr:nth-of-type(odd) ': {
    backgroundColor: 'background.base',
  },
  '&& > tr:last-child': {
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
};

const data = {
  ...head,
  py: 'md',
  fontWeight: '1',
};

export const table = {
  container,
  caption,
  head,
  body,
  data,
};
