export const tab = {
  mr: 20,
  pt: 10,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  outline: 'none',
  '&.is-focused': {
    boxShadow: 'focus',
  },
  '&.is-disabled': {
    cursor: 'default',
  },
  '&.is-selected.is-vertical': {
    bg: 'accent.95',
  },
};

export const tabLine = {
  height: '2px',
  width: '100%',
  bg: 'active',
};

export const tabPanel = {
  outlineColor: 'transparent',
};

export const tabs = {
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'neutral.40',
  mb: 'lg',
};
