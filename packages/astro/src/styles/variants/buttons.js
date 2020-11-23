import { text } from './text';

const base = {
  cursor: 'pointer',
  height: 36,
  inlineHeight: 30,
  px: 'md',
  outline: 'none',
  ...text.buttonLabel,
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

export const buttons = {
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
  primary: {
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
  },
  text: {
    ...base,
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'transparent',
    color: 'active',
    '&.is-hovered': {
      bg: 'accent.95',
      border: '1px solid',
      borderColor: 'accent.95',
      color: 'accent.40',
    },
    '&.is-pressed': {
      bg: 'active',
      border: '1px solid',
      borderColor: 'active',
      color: 'white',
    },
  },
  success: {
    ...base,
    bg: 'success.bright',
    border: '1px solid',
    borderColor: 'success.bright',
    color: 'white',
  },
  critical: {
    ...base,
    bg: 'critical.bright',
    border: '1px solid',
    borderColor: 'critical.bright',
    color: 'white',
  },
  icon: {
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
  },
  inline: {
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
  },
};
