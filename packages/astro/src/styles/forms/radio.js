// Styles for default radio and variants go here.

// Default radio
export const radio = {
  width: 20,
  height: 20,
  color: 'active',
  mr: 'xs',
  // override the default focus styling
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
  },
};

export const radioField = {
  '.is-horizontal &': {
    mr: '15px',
  },
};
