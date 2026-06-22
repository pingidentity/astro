import { astroTokens } from '@pingux/onyx-tokens';
import chroma from 'chroma-js';

import { copyButton } from '../codeView/codeView';
import tShirtSizes from '../customProperties/tShirtSizes';

import { commonContentProps } from './box';


const transitions = {
  transition:
    'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
};

const boxShadowNone = {
  boxShadow: 'none !important',
};

export const defaultFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '2px',
};

const searchNavTabLabel = {
  mb: '0px',
  pb: '9px',
  pt: 'sm',
  color: 'neutral.40',
  '&.is-hovered': {
    '& > svg': {
      fill: 'active',
    },
  },
};

const buttonBase = {
  ...transitions,
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  minWidth: 'min-content',
  cursor: 'pointer',
  display: 'block',
  maxWidth: '100%',
  fontFamily: 'standard',
  fontSize: '.9375rem',
  fontWeight: 400,
  textAlign: 'center',
  verticalAlign: 'middle',
  backgroundColor: 'transparent',
  lineHeight: 1.5,
  borderRadius: '1.75rem',
  border: '1px solid',
  borderColor: 'border.base',
  px: astroTokens.spacing.button['padding-x'],
  py: astroTokens.spacing.button['padding-y'],
  maxHeight: '48.5px',
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
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.button.primary.hover.bg,
    borderColor: astroTokens.color.button.primary.hover.border,
    ...boxShadowNone,
  },
  '&.is-focused': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
    outline: '2px solid',
  },
};

const secondary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: astroTokens.color.primary,
  color: astroTokens.color.primary,
  '&.is-pressed': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
    color: 'white',
    path: { fill: 'white' },
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.button.primary.hover.bg,
    borderColor: astroTokens.color.button.primary.hover.border,
    color: 'white',
    path: { fill: 'white' },
    ...boxShadowNone,
  },
};

const tertiary = {
  ...buttonBase,
  backgroundColor: 'transparent',
  borderColor: 'border.base',
  color: astroTokens.color.font.base,
  '&.is-focused': {
    ...defaultFocus,
    outlineColor: 'gray-700',
    backgroundColor: 'backgroundSecondary',
  },
  '&.is-pressed': {
    backgroundColor: 'backgroundSecondary',
    color: astroTokens.color.font.base,
  },
  '&.is-hovered': {
    backgroundColor: 'backgroundSecondary',
    color: astroTokens.color.font.base,
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
    backgroundColor: astroTokens.color.button.critical.press,
    borderColor: astroTokens.color.button.critical.press,
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.button.critical.hover,
    borderColor: astroTokens.color.button.critical.hover,
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
  color: astroTokens.color.primary,
  borderColor: astroTokens.color.primary,
  '&.is-pressed': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
    color: 'white',
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.primary,
    borderColor: astroTokens.color.primary,
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
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.button.primary.hover,
    borderColor: astroTokens.color.button.primary.hover,
    ...boxShadowNone,
  },
  '&.is-focused': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
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
  color: astroTokens.color.font.link,
  transition: 'color, .15s, ease-in-and-out',
  fontSize: 'md',
  textDecoration: 'none',
  px: '0px',
  py: '0px',
  '&.is-pressed': {
    textDecoration: 'underline',
    outline: 'none',
    color: chroma.mix(astroTokens.color.primary, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-focused': {
    textDecoration: 'underline',
    outline: 'none',
  },
};

const selectLink = {
  ...link,
  textDecoration: 'none',
  px: '0',
  '&.is-hovered': {
    textDecoration: 'none',
  },
  '&.is-pressed': {
    textDecoration: 'none',
  },
  '&.is-focused': {
    textDecoration: 'none',
    outline: 'none',
    'span.link-select-field-placeholder': {
      textDecoration: 'underline',
    },
    'span.material-symbols-outlined': {
      textDecoration: 'none',
    },
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
  path: { fill: astroTokens.color.primary },
};

const primaryWithIcon = {
  ...primary,
  display: 'inline-flex',
  color: 'white',
};

const inlineWithIcon = {
  ...inline,
  display: 'inline-flex',
  path: { fill: astroTokens.color.primary },
};

const inlinePrimaryWithIcon = {
  ...inlinePrimary,
  display: 'inline-flex',
  color: 'white',
};

const colorBlock = {
  bg: astroTokens.color.gray[200],
  borderColor: astroTokens.color.gray[200],
  borderRadius: '1.75rem',
  width: 150,
  height: 50,
  p: '5px 15px 5px 20px',
  '&.is-hovered': {
    bg: astroTokens.color.blue[100],
    borderColor: astroTokens.color.blue[100],
    ...boxShadowNone,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: astroTokens.color.blue[100],
    borderColor: astroTokens.color.blue[100],
  },
  '&>svg': {
    color: 'text.primary',
    fill: 'text.primary',
  },
};

const colorBlockPrimary = {
  ...colorBlock,
  bg: astroTokens.color.primary,
  borderColor: astroTokens.color.primary,
  '& span': {
    color: 'white',
    textAlign: 'left',
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.button.primary.hover,
    borderColor: astroTokens.color.button.primary.hover,
    color: 'white',
    ...boxShadowNone,
  },
  '&.is-pressed': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
  },
  '&.is-focused': {
    backgroundColor: astroTokens.color.button.primary.press,
    borderColor: astroTokens.color.button.primary.press,
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
    backgroundColor: astroTokens.color.gray[100],
    path: { fill: 'dark' },
  },
  '&.is-pressed': {
    backgroundColor: '#d5dfe8 !important',
    path: { fill: 'dark' },
  },
};

// Base styles for icon buttons
const baseIconButtonStyle = {
  p: '4px',
  transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
  outline: 'none',
  borderRadius: '28px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: 'none !important',
  alignSelf: 'center',
};

const baseIconButton = {
  ...baseIconButtonStyle,
  path: { fill: 'dark' },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.gray[100],
    path: { fill: 'dark' },
  },
  '&.is-pressed': {
    backgroundColor: astroTokens.color.gray[100],
    path: { fill: 'dark' },
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const invertedIconButton = {
  ...baseIconButtonStyle,
  '&.is-hovered': {
    boxShadow: 'none !important',
    backgroundColor: astroTokens.color.blue[600],
  },
  '&.is-pressed': {
    backgroundColor: astroTokens.color.blue[600],
  },
  '&.is-disabled': {
    backgroundColor: astroTokens.color.gray[300],
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const modalCloseButton = {
  ...baseIconButton,
};

const onyxIconButton = {
  ...baseIconButton,
  path: { fill: 'blue' },
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.is-hovered': {
    backgroundColor: chroma.mix(astroTokens.color.primary, 'black', 0.075, 'rgb').hex(),
    path: { fill: 'white' },
  },
  '&.is-pressed': {
    backgroundColor: chroma.mix(astroTokens.color.primary, 'black', 0.125, 'rgb').hex(),
    path: { fill: 'white' },
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const hintButton = {
  maxWidth: 'unset',
  maxHeight: 'unset',
  borderRadius: '28px',
  backgroundColor: 'transparent',
  path: { fill: 'dark' },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.gray[100],
    path: { fill: 'dark' },
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const badgeDeleteButton = {
  ...baseIconButton,
  p: 0,
  height: 14,
  width: 14,
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    backgroundColor: astroTokens.color.gray[100],
    path: { fill: 'dark' },
  },
  '&.is-hovered': {
    bg: 'transparent',
  },
  ...transitions,
};

const searchClearButton = {
  ...baseIconButtonStyle,
  path: { fill: 'dark' },
  width: '20px',
  height: '20px',
  position: 'absolute',
  right: '20px',
  '&.is-hovered': {
    bg: 'background.hover',
    boxShadow: 'none !important',
  },
  '&.is-pressed': {
    bg: 'background.hover',
  },
};

const iconButtons = {
  base: {
    ...baseIconButton,
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
  modalHeaderCloseButton: {
    ...modalCloseButton,
    top: '50%',
    transform: 'translateY(-50%)',
    right: '16px',
  },
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
        backgroundColor: astroTokens.color.gray[100],
      },
      '&.is-pressed': {
        backgroundColor: astroTokens.color.gray[100],
        path: { fill: 'dark' },
      },
      ...transitions,
    },
  },
  messageCloseButton: {
    ...baseIconButton,
    minWidth: '28px',
    width: '28px',
    height: '28px',
    '& > svg': {
      minWidth: tShirtSizes.sm,
      width: tShirtSizes.sm,
      height: tShirtSizes.sm,
      path: {
        fill: '#455469 !important',
      },
    },
  },
  headerNav: {
    ...baseIconButton,
  },
  copyButton,
  deleteAttachment: {
    ...baseIconButton,
    backgroundColor: 'light',
    size: '24px',
    '&.is-hovered': {
      backgroundColor: '#dde5ec',
    },
  },
  inverted: {
    ...invertedIconButton,
  },
  searchClearButton,
  filter: {
    ...baseIconButton,
    width: '32px',
    height: '32px',
    '&.is-hovered': {
      boxShadow: 'none !important',
      backgroundColor: astroTokens.color.gray[100],
      path: { fill: 'dark' },
    },
    '&.is-pressed': {
      backgroundColor: astroTokens.color.gray[100],
      path: { fill: 'dark' },
    },
  },
  hintButton: {
    ...hintButton,
  },
  passwordVisibilityIcon: {
    ...baseIconButton,
    ...commonContentProps,
    right: 0,
    py: astroTokens.spacing.button['padding-y'],
    px: astroTokens.spacing.button['padding-x'],
    border: '0px solid !important',
    '&:hover, &.is-pressed': {
      background: 'transparent',
      boxShadow: 'none',
    },
    '&.is-focused': {
      outline: '2px solid',
      outlineOffset: '2px',
      outlineColor: astroTokens.color.gray[700],
    },
  },
  tooltip: {
    button: {
      ...baseIconButton,
      '&.is-hovered': {
        path: { fill: 'dark' },
        backgroundColor: astroTokens.color.common.light,
      },
    },
  },
};

const listBoxLink = {
  color: 'active',
  transition: 'color, .15s, ease-in-and-out',
  fontSize: 'md',
  textDecoration: 'none',
  px: 'md',
  pt: 'md',
  '&.is-pressed': {
    textDecoration: 'underline',
    outline: 'none',
    color: chroma.mix(astroTokens.color.primary, 'black', 0.125, 'rgb').hex(),
  },
  '&.is-focused': {
    textDecoration: 'underline',
    outline: 'none',
  },
  badgeDeleteButton,
  invertedBadgeDeleteButton: {
    ...badgeDeleteButton,
  },
  clearSelectionButton: {
    ...searchClearButton,
    top: '15px',
    right: '1rem',
    bg: 'transparent',
    '.is-float-label &': {
      top: '12px',
    },
  },
};

const ButtonInputGroupContentRight = {
  ...tertiary,
  ...commonContentProps,
  right: 0,
  py: astroTokens.spacing.button['padding-y'],
  px: astroTokens.spacing.button['padding-x'],
  borderRadius: '0px 4px 4px 0px !important',
  borderWidth: '0px !important',
  borderLeftWidth: '1px !important',
  borderRightWidth: '1px !important',
  borderLeftColor: astroTokens.color.gray[500],
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
  searchNavTabLabel,
  outlineCritical,
  link,
  listBoxLink,
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
  ButtonInputGroupContentRight,
  selectLink,
};

export default buttons;
