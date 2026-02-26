import { astroTokensDark } from '@pingux/onyx-tokens';

export const message = {
  item: {
    backgroundColor: 'light',
    color: 'white !important',
    '> span': {
      color: 'white !important',
    },
    '&.is-success': {
      bg: 'light',
      borderLeftColor: astroTokensDark.color.green[500],
      color: 'text.message',
    },
    '&.is-success, > .is-success': {
      bg: 'light',
      color: 'text.message',
    },
    '&.is-warning': {
      bg: 'light',
      borderLeftColor: astroTokensDark.color.yellow[500],
      color: 'text.message',
    },
    '&.is-warning, > .is-warning': {
      bg: 'light',
      color: 'text.message',
    },
    '&.is-error, > .is-error': {
      bg: 'light',
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
    '&.is-default, > button > svg': {
      color: 'white !important',
      path: {
        fill: 'text.message',
      },
    },
    '&.is-error': {
      borderLeftColor: astroTokensDark.color.red[500],
    },
  },
};
