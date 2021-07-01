const container = {
  visibility: 'hidden',
  position: 'relative',
  bg: 'white',
  color: 'neutral.10',
  borderRadius: 4,
  fontSize: 'md',
  lineHeight: 1.4,
  outline: 'none',
  transitionProperty: 'transform,visibility,opacity',
  'WebkitBoxShadow': '0px 0px 12px 2px #0000002e',
  'MozBoxShadow': '0px 0px 12px 2px #0000002e',
  'boxShadow': '0px 0px 12px 2px #0000002e',

  '&.is-dark-mode': {
    color: 'white',
    bg: 'accent.20',
    '&[data-popover-placement^=top] > [data-popover-arrow="arrow"]:before': {
      borderTopColor: 'accent.20',
    },
    '&[data-popover-placement^=bottom] > [data-popover-arrow="arrow"]:before': {
      borderBottomColor: 'accent.20',
    },
    '&[data-popover-placement^=left] > [data-popover-arrow="arrow"]:before': {
      borderLeftColor: 'accent.20',
    },
    '&[data-popover-placement^=right] > [data-popover-arrow="arrow"]:before': {
      borderRightColor: 'accent.20',
    },
  },

  '&[data-popover-placement^=top] > [data-popover-arrow="arrow"]': {
    bottom: 0,
  },
  '&[data-popover-placement^=top] > [data-popover-arrow="arrow"]:before': {
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '8px 8px 0',
    borderTopColor: 'white',
    transformOrigin: 'center top',
  },
  '&[data-popover-placement^=bottom] > [data-popover-arrow="arrow"]': {
    top: 0,
  },
  '&[data-popover-placement^=bottom] > [data-popover-arrow="arrow"]:before': {
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '0 8px 8px',
    borderBottomColor: 'white',
    transformOrigin: 'center bottom',
  },
  '&[data-popover-placement^=left] > [data-popover-arrow="arrow"]': {
    right: 0,
  },
  '&[data-popover-placement^=left] > [data-popover-arrow="arrow"]:before': {
    right: '-8px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderWidth: '8px 0 8px 8px',
    borderLeftColor: 'white',
    transformOrigin: 'center left',
  },
  '&[data-popover-placement^=right] > [data-popover-arrow="arrow"]': {
    left: 0,
  },
  '&[data-popover-placement^=right] > [data-popover-arrow="arrow"]:before': {
    left: '-8px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderWidth: '8px 8px 8px 0',
    borderRightColor: 'white',
    transformOrigin: 'center right',
  },

  '&.is-open': {
    visibility: 'visible',
  },
};

const arrow = {
  color: 'white',
  '&:before': {
    content: '""',
    position: 'absolute',
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
};

export default {
  arrow,
  container,
};
