// Styles for default checkbox and variants go here.

// Default checkbox
export const checkbox = {
  color: 'active',
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
  },
};
