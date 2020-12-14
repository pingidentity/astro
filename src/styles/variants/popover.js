const container = {
  position: 'relative',
  backgroundColor: 'accent.20',
  color: 'white',
  borderRadius: 4,
  fontSize: 'md',
  lineHeight: 1.4,
  outline: 0,
  transitionProperty: 'transform,visibility,opacity',

  '&[data-animation=fade][data-state=hidden]': {
    opacity: 0,
  },
  '&[data-placement^=top] > .tippy-arrow': {
    bottom: 0,
  },
  '&[data-placement^=top] > .tippy-arrow:before': {
    bottom: -7,
    left: 0,
    borderWidth: '8px 8px 0',
    borderTopColor: 'initial',
    transformOrigin: 'center top',
  },
  '&[data-placement^=bottom] > .tippy-arrow': {
    top: 0,
  },
  '&[data-placement^=bottom] > .tippy-arrow:before': {
    top: -7,
    left: 0,
    borderWidth: '0 8px 8px',
    borderBottomColor: 'initial',
    transformOrigin: 'center bottom',
  },
  '&[data-placement^=left] > .tippy-arrow': {
    right: 0,
  },
  '&[data-placement^=left] > .tippy-arrow:before': {
    borderWidth: '8px 0 8px 8px',
    borderLeftColor: 'initial',
    right: -7,
    transformOrigin: 'center left',
  },
  '&[data-placement^=right] > .tippy-arrow': {
    left: 0,
  },
  '&[data-placement^=right] > .tippy-arrow:before': {
    left: -7,
    borderWidth: '8px 8px 8px 0',
    borderRightColor: 'initial',
    transformOrigin: 'center right',
  },
  '&[data-inertia][data-state=visible]': {
    transitionTimingFunction: 'cubic-bezier(.54,1.5,.38,1.11)',
  },
};

const content = {
  position: 'relative',
  px: 'sm',
  py: 'xs',
  zIndex: 1,
};

const arrow = {
  width: 16,
  height: 16,
  color: 'accent.20',
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
  content,
};
