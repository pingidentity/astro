import { badgeDeleteButton, deleteButton, invertedBadgeDeleteButton } from '../Badge/Badge.styles';
import { defaultFocus } from '../Button/Buttons.styles';
import { toggle } from '../CollapsiblePanel/CollapsiblePanel.styles';
import { copyButton } from '../CopyText/CopyText.styles';
import { containedIcon } from '../DatePicker/DatePicker.styles';
import { hintButton } from '../HelpHint/HelpHint.styles';
import { messageCloseButton } from '../Messages/Message.styles';
import { modalCloseButton } from '../Modal/Modal.styles';
import { button } from '../TooltipTrigger/Tooltip.styles';

export const base = {
  justifyContent: 'center',
  appearance: 'none',
  alignItems: 'center',
  alignSelf: 'baseline',
  display: 'inline-flex !important',
  flexGrow: 0,
  flexShrink: 0,
  borderRadius: '100%',
  cursor: 'pointer',
  bg: 'transparent',
  p: '3px',
  width: 'inherit',
  height: 'inherit',
  path: {
    fill: 'neutral.40',
  },
  outline: 'none',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'accent.95',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: 'active',
    boxShadow: 'none',
  },
};

const bidirectional = {
  border: '1px solid',
  outline: 'none',
  height: '24px',
  width: '24px',
  color: 'active',
  borderRadius: '12px',
  borderColor: 'active',
  '&.is-hovered': {
    color: 'accent.40',
    borderColor: 'accent.40',
  },
  '&.is-pressed': {
    color: 'accent.20',
    borderColor: 'accent.20',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const inverted = {
  ...base,
  bg: 'active',
  borderColor: 'active',
  'path': {
    fill: 'white',
  },
  '&.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
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
    boxShadow: 'none',
  },
};

const invertedSquare = {
  ...inverted,
  borderRadius: '2px',
};

export const square = {
  ...base,
  borderRadius: '2px',
};

const svgIconButton = {
  ...base,
  path: {
    fill: 'default',
  },
};

/**
 * Recipe related variants below
 */

const applicationPortal = {
  ...base,
  background: 'transparent',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    'path': {
      fill: 'active',
    },
  },
  '&.is-pressed': {
    'path': {
      fill: 'active',
    },
  },
};

const applicationPortalPinned = {
  ...base,
  'path': {
    fill: 'success.bright',
  },
  background: 'transparent',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    'path': {
      fill: 'active',
    },
  },
  '&.is-pressed': {
    'path': {
      fill: 'active',
    },
  },
};

export default {
  base,
  bidirectional,
  badge: { deleteButton },
  badgeDeleteButton,
  copyButton,
  datePicker: {
    containedIcon: { ...base, ...containedIcon },
  },
  hintButton: { ...base, ...hintButton },
  inverted,
  messageCloseButton: { ...base, ...messageCloseButton },
  modalCloseButton: { ...base, ...modalCloseButton },
  invertedBadgeDeleteButton,
  invertedSquare,
  square,
  svgIconButton,
  toggle,
  tooltip: {
    button: { ...base, ...button },
  },
  // Recipe related variants
  applicationPortal,
  applicationPortalPinned,
};
