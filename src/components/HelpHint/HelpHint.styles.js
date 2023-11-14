import { defaultFocus } from '../Button/Buttons.styles';
import { container } from '../TooltipTrigger/Tooltip.styles.js';

export const hintButton = {
  bg: 'neutral.90',
  borderColor: 'active',
  mt: 'auto',
  mb: 'auto',
  ml: '5px',
  maxWidth: '13px',
  maxHeight: '14px',
  borderRadius: '5.5px',
  'svg': {
    'height': '100%',
    mb: 0.75,
  },
  'path': {
    fill: 'neutral.20',
  },
  '&.is-hovered': {
    bg: 'accent.20',
    borderColor: 'accent.20',
    'path': {
      fill: 'white',
    },
    color: 'white',
    boxShadow: 'standard',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
    color: 'white',
    'path': {
      fill: 'white',
    },
  },
};

const popoverContainer = {
  ...container,
  p: '10px',
  fontSize: 'sm',
  fontWeight: 1,
};

export default { hintButton, popoverContainer };
