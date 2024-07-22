import chroma from 'chroma-js';

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
  borderColor: 'gray-300',
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
  '&.is-pressed': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-hovered': {
    backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
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
  borderColor: 'gray-300',
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
  borderColor: 'gray-300',
  color: 'text.secondary',
};

const checkboxActiveButton = {
  ...buttonBase,
  backgroundColor: 'gray-500',
  color: 'white',
};

const link = {
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

const baseIconButton = {
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

const iconButtons = {
  base: {
    ...baseIconButton,
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
};

export default buttons;
