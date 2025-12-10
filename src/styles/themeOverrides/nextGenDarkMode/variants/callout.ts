const base = {
  color: 'text.secondary',
  '> span': {
    color: 'text.secondary',
  },
  '& > svg > path': {
    fill: 'text.secondary',
  },
  '&.is-success, > .is-success': {
    '& > svg > path': {
      fill: 'text.secondary',
    },
  },
  '&.is-warning, > .is-warning': {
    '& > svg > path': {
      fill: 'text.secondary',
    },
  },
  '&.is-error, > .is-error': {
    '& > svg > path': {
      fill: 'text.secondary',
    },
  },
};

export default {
  base,
};
