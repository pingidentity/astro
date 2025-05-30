import chroma from 'chroma-js';

import { copyButton } from '../codeView/codeView';
import colors from '../colors/colors';

const { primary: primaryBlue,
  active_hover: primaryBlueHover,
  active_pressed: primaryBluePress,
  critical_hover: criticalRedHover,
  critical_pressed: criticalRedPress } = colors;

const transitions = {
  transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
};

const boxShadowNone = {
  boxShadow: 'none !important',
};

export const defaultFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '2px',
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
  '&.is-hovered': boxShadowNone,
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
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
  },
  '&.is-hovered': {
    backgroundColor: primaryBlueHover,
    borderColor: primaryBlueHover,
    ...boxShadowNone,
  },
  '&.is-focused': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
    outline: '2px solid',
  },
};

const secondary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'primary',
  color: 'primary',
  '&.is-pressed': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
    color: 'white',
    path: { fill: 'white' },
  },
  '&.is-hovered': {
    backgroundColor: primaryBlue,
    borderColor: primaryBlue,
    color: 'white',
    path: { fill: 'white' },
    ...boxShadowNone,
  },
};

const tertiary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'border.base',
  color: 'text.secondary',
  '&.is-hovered': {
    ...boxShadowNone,
  },
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
  borderColor: 'critical.bright',
  color: 'white',
  '&.is-focused': {
    ...defaultFocus,
    outlineColor: 'critical.bright',
    backgroundColor: 'critical.dark',
  },
  '&.is-pressed': {
    backgroundColor: criticalRedPress,
    borderColor: criticalRedPress,
  },
  '&.is-hovered': {
    backgroundColor: criticalRedHover,
    borderColor: criticalRedHover,
    color: 'white',
    ...boxShadowNone,
  },
};

const inline = {
  ...buttonBase,
  display: 'inline-flex',
  height: '29px',
  lineHeight: 1,
  fontSize: 'sm',
  borderRadius: '15px',
  border: '1px solid',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  backgroundColor: 'transparent',
  color: primaryBlue,
  borderColor: primaryBlue,
  '&.is-pressed': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
    color: 'white',
  },
  '&.is-hovered': {
    backgroundColor: primaryBlue,
    borderColor: primaryBlue,
    color: 'white',
    path: { fill: 'white' },
    ...boxShadowNone,
  },
};

const inlinePrimary = {
  ...buttonBase,
  display: 'inline-flex',
  height: '29px',
  lineHeight: 1,
  fontSize: 'sm',
  borderRadius: '15px',
  border: '1px solid',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  backgroundColor: 'primary',
  color: 'white',
  borderColor: 'primary',
  '&.is-pressed': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
  },
  '&.is-hovered': {
    backgroundColor: primaryBlueHover,
    borderColor: primaryBlueHover,
    ...boxShadowNone,
  },
  '&.is-focused': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
    outline: '2px solid',
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

const paginationMenu = {
  ...link,
  px: '0px',
  py: '0px',
  color: 'text.primary',
};

const withIcon = {
  ...secondary,
  display: 'inline-flex',
  path: { fill: primaryBlue },
};

const primaryWithIcon = {
  ...primary,
  display: 'inline-flex',
  color: 'white',
};

const inlineWithIcon = {
  ...inline,
  display: 'inline-flex',
  path: { fill: primaryBlue },
};

const inlinePrimaryWithIcon = {
  ...inlinePrimary,
  display: 'inline-flex',
  color: 'white',
};

const colorBlock = {
  bg: 'gray-200',
  borderColor: 'gray-200',
  borderRadius: '1.75rem',
  width: 150,
  height: 50,
  p: '5px 15px 5px 20px',
  '&.is-hovered': {
    bg: 'blue-100',
    borderColor: 'blue-100',
    ...boxShadowNone,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'blue-100',
    borderColor: 'blue-100',
  },
  '&>svg': {
    color: 'text.primary',
    fill: 'text.primary',
  },
};

const colorBlockPrimary = {
  ...colorBlock,
  bg: primaryBlue,
  borderColor: primaryBlue,
  '& span': {
    color: 'white',
    textAlign: 'left',
  },
  '&.is-hovered': {
    backgroundColor: primaryBlueHover,
    borderColor: primaryBlueHover,
    color: 'white',
    ...boxShadowNone,
  },
  '&.is-pressed': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
  },
  '&.is-focused': {
    backgroundColor: primaryBluePress,
    borderColor: primaryBluePress,
    outline: '2px solid',
  },
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
  top: 32,
  right: 42,
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
    backgroundColor: 'light',
    border: '1px solid',
    borderColor: 'gray-300',
    size: '24px',
    p: '4px',
    '&.is-hovered': {
      backgroundColor: '#dde5ec',
    },
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
      ...boxShadowNone,
      border: 'none !important',
      borderColor: 'none !important',
      backgroundColor: chroma.mix(primaryBlue, 'black', 0.075, 'rgb').hex(),
    },
    '&.is-disabled': {
      backgroundColor: 'gray-300',
    },
  },
  searchClearButton: {
    ...baseIconButton,
    border: 'none',
    '&.is-hovered': {
      bg: 'background.hover',
    },
    '&.is-pressed': {
      bg: 'background.hover',
    },
    position: 'absolute',
    right: 10,
  },
};

const buttons = {
  neutral,
  primary,
  default: secondary,
  tertiary,
  inverse,
  critical,
  inline,
  inlinePrimary,
  checkboxButton,
  checkboxActiveButton,
  outlineCritical,
  link,
  withIcon,
  primaryWithIcon,
  inlineWithIcon,
  inlinePrimaryWithIcon,
  colorBlock,
  colorBlockPrimary,
  iconButtons,
  modalCloseButton,
  aiChat,
  paginationMenu,
};

export default buttons;
