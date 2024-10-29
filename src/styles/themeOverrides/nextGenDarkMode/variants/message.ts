export const message = {
  item: {
    backgroundColor: 'background.secondary',
    color: 'white !important',
    '> span': {
      color: 'text.message',
    },
    '&.is-success': {
      bg: 'background.secondary',
      borderLeftColor: 'green-500',
      color: 'text.message',
    },
    '&.is-success, > .is-success': {
      bg: 'background.secondary',
      color: 'text.message',
    },
    '&.is-warning': {
      bg: 'background.secondary',
      borderLeftColor: 'yellow-500',
      color: 'text.message',
    },
    '&.is-warning, > .is-warning': {
      bg: 'background.secondary',
      color: 'text.message',
    },
    '&.is-error, > .is-error': {
      bg: 'background.secondary',
      color: 'text.message',
    },
    '&.is-error, > button > svg': {
      color: 'white !important',
      path: {
        fill: 'white !important',
      },
    },
    '&.is-warning, > button > svg': {
      color: 'white !important',
      path: {
        fill: 'text.message',
      },
    },
    '&.is-success, > button > svg': {
      color: 'white !important',
      path: {
        fill: 'text.message',
      },
    },
    '&.is-error': {
      borderLeftColor: 'red-500',
    },
  },
};
