const interactive = {
  boxShadow: 'none',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: 'gray-300',
  transition: 'border-color .15s ease-in',
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
  },
  '&.is-hovered': {
    outline: 'none',
    borderColor: 'blue',
    bg: 'default',
  },
};

export default {
  interactive,
};
