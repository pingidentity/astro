export const switchable = {
  container: {
    minWidth: '32px',
    color: 'neutral.80',
    bg: 'backgorund.base',
    border: '1px solid',
    borderColor: 'neutral.80',
    borderRadius: 9999,
    '&.is-selected': {
      bg: 'active',
      borderColor: 'active',
    },
  },
  thumbContainer: {
    bg: 'transparent',
    border: 'none',
    maxWidth: 24,
    height: 16,
    py: '3px',
    px: '3px',
    'label.is-selected &': {
      bg: 'transparent',
    },
  },
  thumb: {
    bg: 'gray-500',
    minHeight: 10,
    maxHeight: 10,
    width: 10,
    border: 'none',
    '&.is-selected': {
      bg: 'white',
      transform: 'translateX(15px)',
    },
  },
};
