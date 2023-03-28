// Styles for default checkbox and variants go here.

// Default checkbox
export const checkbox = {
  color: 'active',
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    boxShadow: 'none',
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
  },
};
