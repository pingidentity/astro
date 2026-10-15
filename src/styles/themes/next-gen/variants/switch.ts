export const switchable = {
  container: {
    minWidth: '28px',
    mr: '12px',
    color: 'neutral.80',
    bg: 'gray-400',
    border: '1px solid',
    borderColor: 'gray-400',
    backgroundColor: 'gray-400',
    borderRadius: 14,
    '&.is-selected': {
      bg: 'active',
      borderColor: 'active',
    },
  },
  thumbContainer: {
    bg: 'transparent',
    border: 'none',
    width: '28px',
    height: 16,
    py: '2px',
    px: '2px',
    'label.is-selected &': {
      bg: 'transparent',
    },
  },
  thumb: {
    bg: 'white',
    minHeight: 12,
    maxHeight: 12,
    width: 12,
    border: 'none',
    '&.is-selected': {
      bg: 'white',
      transform: 'translateX(12px)',
    },
  },
};
