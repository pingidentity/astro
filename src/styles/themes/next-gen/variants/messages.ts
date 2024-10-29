export const message = {
  item: {
    maxWidth: 400,
    pointerEvents: 'all',
    mb: 'md',
    p: '1.25rem',
    wordBreak: 'break-word',
    alignItems: 'center',
    backgroundColor: 'blue-100',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'teal-500',
    color: 'text.message',
    fontSize: '15px !important',
    borderRadius: 4,
    '&.is-success': {
      bg: 'green-100',
      borderLeftColor: 'green-500',
      color: 'text.message',
    },
    '&.is-warning': {
      bg: 'warning.light',
      borderLeftColor: 'yellow-500',
      color: 'text.message',
    },
    '&.is-error, > .is-error': {
      bg: 'red-100',
      color: 'text.message',
    },
    '&.is-error, > button > svg': {
      color: 'text.message !important',
      path: {
        fill: 'text.message',
      },
    },
    '&.is-error': {
      borderLeftColor: 'red-500',
    },
  },
};
