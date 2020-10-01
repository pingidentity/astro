// Styles for default checkbox and variants go here.

// Default checkbox
export const checkbox = {
  color: 'active',
  mr: 'sm',
  'input ~ &': {
    pointer: 'cursor',
  },
  'input:disabled ~ &': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
};
