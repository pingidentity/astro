const base = 10;
const spacing = {
  xs: base * 0.5, // 5
  sm: base * 1, // 10
  md: base * 1.5, // 15
  lg: base * 2.5, // 25
  xl: base * 4, // 40
  xx: base * 6.5, // 65
};
const textColors = {
  secondary: '#798087',
  active: '#2996cc',
};
const colors = {
  active: '#277ba5',
  activeHover: '#3d88ae',
  critical: '#a31300',
  warning: '#eeb91c',
  success: '#21934c',
  neutral: {
    10: '#575f67',
    20: '#686f77',
    30: '#798087',
    40: '#8b9197',
    50: '#9da2a8',
    60: '#afb4b8',
    70: '#c2c6ca',
    80: '#d5d8db',
    90: '#e8ebed',
    95: '#f8f8f8',
  },
  line: {
    hairline: '#8b9197',
  },
  cardBg: 'white',
  text: textColors,
};
const fontSizes = {
  xs: '11px',
  sm: '13px',
  md: '15px',
  lg: '22px',
  xl: '28px',
  xx: '36px',
};
const fontWeights = {
  regular: 400,
  light: 300,
  semibold: 600,
  bold: 700,
};
const buttonText = {
  fontSize: 'md',
  fontFamily: 'standard',
  color: 'neutral.20',
};
const buttonHover = {
  color: 'active',
  borderColor: 'active',
};
const buttonFocus = {
  outline: 'none',
  boxShadow: 'focus',
};
const buttonBase = {
  ...buttonText,
  bg: 'white',
  border: '1px solid',
  borderColor: 'neutral.60',
  borderRadius: 2,
  display: 'block',
  padding: '9px',
  boxShadow: 'none',
  minHeight: 40,
  height: 'auto',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  width: '100%',
  outline: 'none',
  '&.is-hovered': {
    ...buttonHover,
  },
  '&.is-pressed': {
    color: buttonText.color,
    borderColor: 'neutral.60',
  },
  '&.is-focused': {
    ...buttonFocus,
  },
};
const cards = {
  bg: 'cardBg',
  boxShadow: 'overlay',
  boxSizing: 'border-box',
  margin: '0 auto',
  maxWidth: 400,
  minHeight: 200,
  position: 'relative',
  width: '100%',
  p: 'xl',
};
const shadows = {
  overlay: '0 1px 4px 1px #79808759',
};
const buttons = {
  default: {
    ...buttonBase,
  },
  primary: {
    ...buttonBase,
    color: 'white',
    bg: 'active',
    borderColor: 'active',
    '&.is-hovered': {
      bg: 'activeHover',
      borderColor: 'activeHover',
    },
    '&.is-pressed': {
      bg: 'active',
      borderColor: 'active',
    },
  },
  secondary: {
    ...buttonBase,
  },
  tertiary: {
    ...buttonBase,
    fontSize: 'sm',
    py: 'xs',
    px: 'md',
    width: 'auto',
    mx: 'auto',
    minHeight: 'initial',
  },
};
const wordWrap = {
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
};
const fieldHelperText = {
  title: {
    ...base,
    ...wordWrap,
    fontSize: 'sm',
    '&.is-default': {
      color: 'text.secondary',
    },
    '&.is-error': {
      color: 'critical.dark',
    },
  },
};

const fontDefault = {
  fontFamily: '"pingito", "Helvetica Neue", Helvetica, Roboto, "Segoe UI", sans-serif',
};

const text = {
  base: {
    color: 'neutral.20',
    fontSize: 'md',
  },
  heading: {
    color: 'neutral.20',
    fontWeight: '400',
    fontSize: 'lg',
    fontFamily: 'standard',
  },
  subheading: {
    fontSize: 'md',
  },
  label: {
    ...wordWrap,
    fontSize: 15,
    fontWeight: 500,
    position: 'absolute',
    color: 'text.secondary',
    ...fontDefault,
  },
  input: {
    color: 'neutral.30',
    fontSize: 15,
    fontWeight: 500,
    ...fontDefault,
  },
};
const activeFloatLabel = {
  fontWeight: 0,
  fontSize: '13px',
  transform: 'translate(-4px, -10px) scale(0.75)',
  textTransform: 'uppercase',
  color: 'text.active',
  transition: 'all 0.05s',
};
const label = {
  ...text.label,
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
  '&.is-float-label': {
    zIndex: 1,
    top: '15px',
    left: 'md',
    mb: 0,
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
  },
  '.is-float-label-active &.is-float-label': {
    ...activeFloatLabel,
  },
};
const input = {
  ...text.input,
  position: 'relative',
  background: 'white',
  borderColor: 'neutral.40',
  borderWidth: 1,
  borderRadius: 2,
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  px: 10,
  py: 15,
  color: 'neutral.30',
  outline: 'none',
  '&:focus': {
    borderColor: 'activeHover',
  },
  '&:after': {
    display: 'none',
  },
};

export default {
  name: 'End User',
  fonts: {
    standard: fontDefault.fontFamily,
  },
  space: spacing,
  shadows,
  colors,
  buttons,
  fontSizes,
  fontWeights,
  text,
  forms: {
    input,
    label,
  },
  cards,
  variants: {
    fieldHelperText,
  },
};
