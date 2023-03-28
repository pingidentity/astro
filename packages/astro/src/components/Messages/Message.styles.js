const wrapper = {
  position: 'absolute',
  right: 'lg',
  bottom: 'lg',
  left: 'lg',
  alignItems: 'flex-end',
  pointerEvents: 'none',
};

const transition = {
  transition: 'opacity 200ms, max-height 200ms',
  opacity: 1,
  '&.is-hidden': {
    opacity: 0,
  },
};

const item = {
  maxWidth: 400,
  pointerEvents: 'all',
  mb: 'md',
  p: 'md',
  wordBreak: 'break-word',
  alignItems: 'center',
  bg: 'neutral.95',
  color: 'neutral.10',
  borderRadius: 4,
  '&.is-success, > .is-success': {
    bg: 'success.light',
    color: 'success.dark',
  },
  '&.is-warning, > .is-warning': {
    bg: 'warning.light',
    color: 'warning.dark',
  },
  '&.is-error, > .is-error': {
    bg: 'critical.light',
    color: 'critical.dark',
  },
};

export const messageCloseButton = {
  p: 0,
  ml: 'auto',
  outline: 'none',
  path: {
    fill: 'neutral.10',
  },
  '&.is-hovered': {
    bg: 'white',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    boxShadow: 'standard',
    bg: 'neutral.10',
    path: {
      fill: 'white',
    },
  },
  '&.is-success': {
    path: {
      fill: 'success.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'success.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-warning': {
    path: {
      fill: 'warning.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'warning.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-error': {
    path: {
      fill: 'critical.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'critical.dark',
      path: {
        fill: 'white',
      },
    },
  },
};

export default {
  wrapper,
  transition,
  item,
  messageCloseButton,
};
