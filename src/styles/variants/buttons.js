const base = {
  cursor: 'pointer',
  height: 36,
  inlineHeight: 30,
  px: 15,
  '&:focus': {
    outline: 'none',
  },
};

export const buttons = {
  default: {
    ...base,
    bg: 'white',
    border: '1px solid',
    borderColor: 'active',
    color: 'active',
    '&:hover': {
      bg: 'accent.99',
      border: '1px solid',
      borderColor: 'accent.40',
      color: 'accent.40',
    },
    '&:active': {
      bg: 'active',
      border: '1px solid',
      borderColor: 'active',
      color: 'white',
    },
  },
  primary: {
    ...base,
    bg: 'active',
    border: '1px solid',
    borderColor: 'active',
    color: 'white',
    '&:hover': {
      bg: 'accent.40',
      border: '1px solid',
      borderColor: 'accent.40',
      color: 'white',
    },
    '&:active': {
      bg: 'accent.20',
      border: '1px solid',
      borderColor: 'accent.20',
      color: 'white',
    },
  },
  text: {
    ...base,
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'transparent',
    color: 'active',
    '&:hover': {
      bg: 'accent.95',
      border: '1px solid',
      borderColor: 'accent.95',
      color: 'accent.40',
    },
    '&:active': {
      bg: 'active',
      border: '1px solid',
      borderColor: 'active',
      color: 'white',
    },
  },
  success: {
    ...base,
    bg: 'success.bright',
    border: '1px solid',
    borderColor: 'success.bright',
    color: 'transparent',
  },
  critical: {
    ...base,
    bg: 'critical.bright',
    border: '1px solid',
    borderColor: 'critical.bright',
    color: 'transparent',
  },
};
