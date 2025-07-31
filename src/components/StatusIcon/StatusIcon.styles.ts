const base = {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  p: '0',
  '& > svg': {
    width: '16px',
    height: '16px',
    minWidth: '16px',
    minHeight: '16px',
  },
  '&.is-default': {
    bg: 'neutral.90',
    path: {
      fill: 'text.primary',
    },
  },
  '&.is-critical': {
    bg: 'critical.light',
    path: {
      fill: 'critical.bright',
    },
  },
  '&.is-warning': {
    bg: 'warning.light',
    path: {
      fill: 'warning.bright',
    },
  },
  '&.is-info': {
    bg: 'accent.95',
    path: {
      fill: 'active',
    },
  },
  '&.is-major': {
    bg: 'critical.light',
    path: {
      fill: 'critical.bright',
    },
  },
  '&.is-minor': {
    bg: 'warning.light',
    path: {
      fill: 'warning.bright',
    },
  },
  '&.is-warning-neutral': {
    bg: 'neutral.90',
    path: {
      fill: 'text.secondary',
    },
  },
  '&.is-fatal': {
    bg: 'neutral.10',
    path: {
      fill: 'white',
    },
  },
  '&.is-selected.is-selected': {
    bg: 'white',
    '& > svg': {
      path: {
        fill: 'accent.30',
      },
    },
  },
};

export default {
  base,
};
