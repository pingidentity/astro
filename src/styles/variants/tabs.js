export const tab = {
  pt: 10,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'inline-flex',
  outline: 'none',
  transform: 'translateY(1px)',
  width: '100%',
  '&.is-focused': {
    boxShadow: 'focus',
  },
  '&.is-disabled': {
    cursor: 'default',
  },
  '&.is-selected.is-vertical': {
    bg: 'accent.95',
  },
  '& > svg': {
    flexShrink: 0,
  },
};

export const tabLine = {
  height: '2px',
  width: '100%',
  bg: 'active',
  flexShrink: 0,
};

export const tabPanel = {
  outline: 'none',
};

export const tabs = {
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'neutral.90',
  mb: 'lg',
};
