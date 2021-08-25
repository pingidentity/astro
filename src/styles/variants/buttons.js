import { text as textVariants } from './text';
import { neutral } from '../colors';

const base = {
  cursor: 'pointer',
  height: 36,
  inlineHeight: 30,
  px: 'md',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  ...textVariants.buttonLabel,
};

const defaultActive = {
  bg: 'active',
  border: '1px solid',
  borderColor: 'active',
  color: 'white',
  'path': {
    fill: 'white',
  },
};

const defaultHover = {
  bg: 'accent.99',
  border: '1px solid',
  borderColor: 'accent.40',
  color: 'accent.40',
  boxShadow: 'standard',
};

const defaultFocus = {
  outline: 'none',
  boxShadow: 'focus',
};

const iconButton = {
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
    fill: 'neutral.20',
  },
  outline: 'none',
  '&.is-hovered': {
    bg: 'accent.95',
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: 'active',
  },
};

const close = {
  ...iconButton,
  p: 0,
  ml: 'auto',
  outline: 'none',
  path: {
    fill: 'neutral.10',
  },
  '&.is-hovered': {
    bg: 'white',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    boxShadow: 'standard',
    bg: 'neutral.10',
    path: {
      fill: 'white',
    },
  },
  '&.is-success': {
    path: {
      fill: 'success.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'success.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-warning': {
    path: {
      fill: 'warning.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'warning.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-error': {
    path: {
      fill: 'critical.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'critical.dark',
      path: {
        fill: 'white',
      },
    },
  },
};

const accordionHeader = {
  ...base,
  bg: 'white',
  color: 'neutral.10',
  paddingLeft: '5px',
  paddingRight: '5px',
  flexGrow: 0,
  fontWeight: 700,
  '&.is-hovered': {
    bg: 'button.hoverBackground',
  },
  '&.is-pressed': {
    ...defaultActive,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

// TODO: Remove this variant in Astro-UI 1.0.0
const icon = {
  p: '3px',
  alignSelf: 'flex-start',
  flexGrow: 0,
  borderRadius: '100%',
  cursor: 'pointer',
  bg: 'transparent',
  'path': {
    fill: 'text.secondary',
  },
  outline: 'none',
  color: 'white',
  '&.is-hovered': {
    bg: 'accent.90',
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: 'active',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const primary = {
  ...base,
  bg: 'active',
  border: '1px solid',
  borderColor: 'active',
  color: 'white',
  '&.is-hovered': {
    bg: 'accent.40',
    border: '1px solid',
    borderColor: 'accent.40',
    color: 'white',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    bg: 'accent.20',
    border: '1px solid',
    borderColor: 'accent.20',
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const success = {
  ...base,
  bg: 'success.bright',
  border: '1px solid',
  borderColor: 'success.bright',
  color: 'white',
};

const critical = {
  ...base,
  bg: 'critical.bright',
  border: '1px solid',
  borderColor: 'critical.bright',
  color: 'white',
};

const inverted = {
  ...iconButton,
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
  },
};

const helpHint = {
  ...iconButton,
  bg: 'neutral.90',
  borderColor: 'active',
  mt: 'auto',
  mb: 'auto',
  ml: '5px',
  maxWidth: '13px',
  maxHeight: '14px',
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
  },
};

const inline = {
  ...base,
  bg: 'white',
  height: '26px',
  lineHeight: '26px',
  fontSize: '14px',
  borderRadius: '15px',
  border: '1px solid',
  borderColor: 'active',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  '&.is-hovered': {
    ...defaultHover,
  },
  '&.is-pressed': {
    ...defaultActive,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const text = {
  ...base,
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'transparent',
  color: 'active',
  height: 'auto',
  padding: '0',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const quiet = {
  all: 'unset',
  display: 'flex',
};

const rocker = {
  ...base,
  height: '26px',
  lineHeight: '26px',
  fontSize: '14px',
  borderRadius: '15px',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  textTransform: 'uppercase',
  bg: 'accent.95',
  '&.is-selected': {
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const comboBox = {
  bg: 'transparent',
  color: 'black',
  padding: 0,
};

const danger = {
  ...base,
  bg: 'white',
  border: '1px solid',
  borderColor: 'critical.bright',
  color: 'critical.bright',
  '&.is-hovered': {
    ...defaultHover,
    color: 'critical.bright',
    borderColor: 'critical.bright',
  },
  '&.is-pressed': {
    ...defaultActive,
    bg: 'critical.bright',
    borderColor: 'critical.bright',
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const colorField = {
  border: `1px solid ${neutral['80']}`,
  '&:focus-visible': {
    outline: 'none',
  },
};

const imageUpload = {
  ...base,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'accent.99',
  border: '2px solid',
  borderColor: 'neutral.95',
};

export default {
  accordionHeader,
  close,
  colorField,
  comboBox,
  critical,
  danger,
  default: {
    ...base,
    bg: 'white',
    border: '1px solid',
    borderColor: 'active',
    '&.is-hovered': {
      ...defaultHover,
    },
    '&.is-pressed': {
      ...defaultActive,
    },
    '&.is-focused': {
      ...defaultFocus,
    },
  },
  iconButton,
  icon,
  imageUpload,
  inline,
  inverted,
  primary,
  quiet,
  rocker,
  success,
  text,
  helpHint,
};
