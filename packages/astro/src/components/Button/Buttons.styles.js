import { text as textVariants } from '../Text/Text.styles';

export const base = {
  cursor: 'pointer',
  height: 36,
  lineHeight: '30px',
  minWidth: 'min-content',
  px: 'md',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
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

export const defaultFocus = {
  outline: '1px solid',
  outlineColor: 'active',
  outlineOffset: '4px',
};

export const iconButton = {
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
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: 'active',
  },
};

const svgIconButton = {
  ...iconButton,
  path: {
    fill: 'default',
  },
};

export const square = {
  ...iconButton,
  borderRadius: '2px',
};

const primary = {
  ...base,
  display: 'inline-flex',
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
  display: 'inline-flex',
  bg: 'success.bright',
  border: '1px solid',
  borderColor: 'success.bright',
  color: 'white',
};

const critical = {
  ...base,
  display: 'inline-flex',
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

const invertedSquare = {
  ...inverted,
  borderRadius: '2px',
};

const applicationPortal = {
  ...iconButton,
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
  ...iconButton,
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

const inline = {
  ...base,
  display: 'inline-flex',
  bg: 'white',
  height: '22px',
  lineHeight: 1,
  fontSize: 'sm',
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

const inlinePrimary = {
  ...inline,
  ...defaultActive,
  '&.is-hovered': {
    ...defaultHover,
    backgroundColor: 'accent.40',
    color: 'white',
  },
  '&.is-pressed': {
    ...defaultActive,
    backgroundColor: 'accent.20',
    border: '1px solid',
    borderColor: 'accent.20',
  },
};

export const text = {
  ...base,
  display: 'inline-flex',
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'transparent',
  color: 'active',
  height: 'auto',
  padding: '0',
  lineHeight: 'unset',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

export const quiet = {
  all: 'unset',
  display: 'flex',
};

const danger = {
  ...base,
  display: 'inline-flex',
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

export const link = {
  ...text,
  lineHeight: 'unset',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  width: 'max-content',
  '&.is-current': {
    cursor: 'default',
    color: 'text.primary',
  },
};

const defaultVariant = {
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
};

const filter = {
  ...defaultVariant,
  px: 'sm',
  borderColor: 'neutral.80',
  height: 40,
  color: 'active',
  display: 'flex',
};

const colorBlock = {
  bg: 'neutral.95',
  border: '1px solid',
  borderColor: 'neutral.90',
  borderRadius: 10,
  outline: 'none',
  cursor: 'pointer',
  width: 150,
  minHeight: 40,
  p: '5px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&.is-hovered': {
    bg: 'neutral.80',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'neutral.60',
    borderColor: 'neutral.60',
  },
  '& span': {
    color: 'text.primary',
    textAlign: 'left',
  },
  '&>div': {
    alignItems: 'baseline',
  },
  '&>svg': {
    color: 'text.secondary',
    fill: 'text.secondary',
  },

  '&.is-configured': {
    bg: 'active',
    borderColor: 'active',
    '& span': {
      color: 'white',
    },
    '&>svg': {
      color: 'white',
      fill: 'white',
    },
  },
  '&.is-configured.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
  },
  '&.is-configured.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
  },
};

export default {
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
  filter,
  iconButton,
  inline,
  inlinePrimary,
  inverted,
  link,
  primary,
  quiet,
  success,
  text,
  applicationPortalPinned,
  applicationPortal,
  square,
  invertedSquare,
  colorBlock,
  svgIconButton,
};
