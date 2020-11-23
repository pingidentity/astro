// Styles for default radio and variants go here.

// Default radio
export const radio = {
  width: 20,
  height: 20,
  color: 'active',
  mr: 'sm',
  // override the default focus styling
  'input:focus ~ &': {
    bg: 'transparent',
  },
  'input ~ &.is-focused': {
    bg: 'highlight',
  },
};
