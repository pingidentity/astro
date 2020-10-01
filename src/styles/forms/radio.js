// Styles for default radio and variants go here.

// Default radio
export const radio = {
  width: 20,
  height: 20,
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
