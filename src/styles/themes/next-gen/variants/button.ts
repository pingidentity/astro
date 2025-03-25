import chroma from 'chroma-js';

import { copyButton } from '../codeView/codeView';
import colors from '../colors/colors';

const { primary: primaryBlue, critical: criticalRed } = colors;

const transitions = {
  transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
};

const defaultFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '3px',
};

const buttonBase = {
  ...transitions,
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'min-content',
  cursor: 'pointer',
  display: 'block',
  maxWidth: '100%',
  fontFamily: 'standard',
  fontSize: '.9375rem',
  flexGrow: '1',
  fontWeight: 400,
  textAlign: 'center',
  verticalAlign: 'middle',
  backgroundColor: 'transparent',
  lineHeight: 1.5,
  borderRadius: '1.75rem',
  border: '1px solid',
  borderColor: 'border.base',
  px: '20px',
  py: '12px',
  height: '48.5px',
  '&.is-disabled': {
    opacity: 0.65,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const neutral = {
  color: 'gray-600',
  ...buttonBase,
  ...transitions,
  '&.is-pressed': {
    color: 'white',
  },
  '&.is-hovered': {
    borderColor: 'primary',
  },
};

const primary = {
  ...buttonBase,
  color: 'white',
  backgroundColor: 'primary',
  borderColor: 'primary',
  '&.is-pressed': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    borderColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-hovered': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
  },
};

const secondary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'primary',
  color: 'primary',
  '&.is-pressed': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    borderColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    color: 'white',
  },
  '&.is-hovered': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
    color: 'white',
  },
};

const tertiary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'border.base',
  color: 'text.secondary',
};

const outlineCritical = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'critical.bright',
  color: 'critical.bright',
  '&.is-focused': {
    ...defaultFocus,
    outlineColor: 'critical.bright',
  },
  outlineColor: 'critical.bright',
};

const inverse = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'white',
  color: 'white',
};

const critical = {
  ...buttonBase,
  backgroundColor: 'critical.bright',
  borderColor: 'critical',
  color: 'white',
  '&.is-focused': {
    ...defaultFocus,
    outlineColor: 'critical.bright',
    backgroundColor: 'critical.dark',
  },
  '&.is-pressed': {
    backgroundColor: chroma.mix(criticalRed.bright, 'black', 0.125, 'rgb').hex(),
    borderColor: chroma.mix(criticalRed.bright, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-hovered': {
    backgroundColor: chroma.mix(criticalRed.bright, 'black', 0.075, 'rgb').hex(),
    color: 'white',
  },
};

const checkboxButton = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'border.base',
  color: 'text.secondary',
};

const checkboxActiveButton = {
  ...buttonBase,
  backgroundColor: 'text.primary',
  color: 'white',
};

const link = {
  color: 'active',
  transition: 'color, .15s, ease-in-and-out',
  fontSize: 'md',
  textDecoration: 'none',
  px: '1.25rem',
  py: '.75rem',
  '&.is-pressed': {
    textDecoration: 'underline',
    outline: 'none',
    color: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-focused': {
    textDecoration: 'underline',
    outline: 'none',
  },
};

const withIcon = {
  ...secondary,
  display: 'inline-flex',
};

const primaryWithIcon = {
  ...primary,
  display: 'inline-flex',
  color: 'white',
};

const aiChat = {
  ...withIcon,
  maxWidth: 'fit-content',
  gap: 'sm',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'text.primary',
  path: { fill: 'text.primary' },
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'primary',
    outlineOffset: '3px',
  },
  '&.is-hovered': {
    backgroundColor: 'gray-100',
    path: { fill: 'dark' },
  },
  '&.is-pressed': {
    backgroundColor: '#d5dfe8 !important',
    path: { fill: 'dark' },
  },
};

const baseIconButton = {
  cursor: 'pointer',
  transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
  outline: 'none',
  borderRadius: '28px',
  border: '2px solid',
  borderColor: 'transparent',
  path: { fill: 'dark' },
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'primary',
    outlineOffset: '3px',
  },
  '&.is-hovered': {
    backgroundColor: 'gray-100',
    path: { fill: 'dark' },
  },
  '&.is-pressed': {
    backgroundColor: 'gray-100',
    borderColor: 'gray-200',
    path: { fill: 'dark' },
  },
};

const modalCloseButton = {
  ...baseIconButton,
  position: 'absolute',
  top: 22,
  right: 22,
};

const onyxIconButton = {
  ...baseIconButton,
  ...secondary,
  path: { fill: 'blue' },
  '&.is-hovered': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
    path: { fill: 'white' },
  },
  '&.is-pressed': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    borderColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    path: { fill: 'white' },
  },
  maxHeight: '48.5px',
  maxWidth: '48.5px',
  width: '48.5px',
  p: 'sm',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconButtons = {
  base: {
    ...baseIconButton,
  },
  nextGen: {
    ...onyxIconButton,
  },
  onyx: {
    ...onyxIconButton,
  },
  responseToolbar: {
    ...baseIconButton,
    '&.is-not-loaded': {
      display: 'none',
    },
    display: 'inline-flex',
  },
  modalCloseButton,
  badge: {
    deleteButton: {
      ...baseIconButton,
      borderRadius: '50%',
      cursor: 'pointer',
      height: 14,
      p: 0,
      width: 14,
      '&.is-focused': {
        ...defaultFocus,
        backgroundColor: 'gray-100',
      },
      '&.is-pressed': {
        backgroundColor: 'gray-100',
        borderColor: 'gray-200',
        path: { fill: 'dark' },
      },
      ...transitions,
    },
  },
  messageCloseButton: {
    ...baseIconButton,
  },
  headerNav: {
    ...baseIconButton,
    borderRadius: '4px',
    path: { fill: 'text.primary' },
    px: 'md',
    py: 'sm',
    width: '56px',
    height: '40px',
    '&.is-hovered': {
      path: { fill: 'text.secondary' },
    },
    '&.is-pressed': {
      path: { fill: 'text.secondary' },
    },
    '&.is-focused': {
      ...defaultFocus,
      outlineOffset: '1px',
    },
  },
  copyButton,
  deleteAttachment: {
    ...baseIconButton,
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: 'gray-300',
    size: '24px',
    p: '4px',
  },
  inverted: {
    cursor: 'pointer',
    transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
    outline: 'none',
    path: { fill: 'white' },
    '&.is-focused': {
      outline: '2px solid',
      outlineColor: 'primary',
      outlineOffset: '3px',
    },
    '&.is-pressed': {
      backgroundColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
      borderColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
    },
    '&.is-hovered': {
      border: 'none !important',
      boxShadow: 'none !important',
      borderColor: 'none !important',
      backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
    },
    '&.is-disabled': {
      backgroundColor: 'gray-300',
    },
  },
};

const buttons = {
  neutral,
  primary,
  default: secondary,
  tertiary,
  inverse,
  critical,
  checkboxButton,
  checkboxActiveButton,
  outlineCritical,
  link,
  withIcon,
  primaryWithIcon,
  iconButtons,
  modalCloseButton,
  aiChat,
};

export default buttons;
