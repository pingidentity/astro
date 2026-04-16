import { astroTokens } from '@pingux/onyx-tokens';

const container = {
  minWidth: '150px',
  boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.176)',
  transition: 'opacity 200ms ease',
  '&.animate': {
    opacity: 0,
  },
  '&.animate.is-mounted.is-transitioning': {
    opacity: '100%',
  },
  '&.is-dark-mode': {
    color: 'white',
    alignItems: 'center',
    bg: astroTokens.color.tooltip.container.bg,
    '&[data-popover-placement^=top] > [data-popover-arrow="arrow"]:before': {
      borderTopColor: astroTokens.color.tooltip.container.bg,
    },
    '&[data-popover-placement^=bottom] > [data-popover-arrow="arrow"]:before': {
      borderBottomColor: astroTokens.color.tooltip.container.bg,
    },
    '&[data-popover-placement^=left] > [data-popover-arrow="arrow"]:before': {
      borderLeftColor: astroTokens.color.tooltip.container.bg,
    },
    '&[data-popover-placement^=right] > [data-popover-arrow="arrow"]:before': {
      borderRightColor: astroTokens.color.tooltip.container.bg,
    },
  },
};

const arrow = {
  color: 'white',
  fontSize: 'sm',
  '&:before': {
    content: '""',
    position: 'absolute',
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
};

export default {
  container,
  arrow,
};
