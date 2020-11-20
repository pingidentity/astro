import { text } from './text';

const base = {
  cursor: 'pointer',
  height: 36,
  inlineHeight: 30,
  px: 'md',
  '&:focus': {
    outline: 'none',
  },
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

export const buttons = {
  default: {
    ...base,
    bg: 'white',
    border: '1px solid',
    borderColor: 'active',
    '&:hover': {
      ...defaultHover,
    },
    '&:active': {
      ...defaultActive,
    },
  },
  primary: {
    ...base,
    bg: 'active',
    border: '1px solid',
    borderColor: 'active',
    color: 'white',
    '&:hover': {
      bg: 'accent.40',
      border: '1px solid',
      borderColor: 'accent.40',
      color: 'white',
      boxShadow: 'standard',
    },
    '&:active': {
      bg: 'accent.20',
      border: '1px solid',
      borderColor: 'accent.20',
      color: 'white',
    },
  },
  text: {
    ...base,
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'transparent',
    color: 'active',
    '&:hover': {
      bg: 'accent.95',
      border: '1px solid',
      borderColor: 'accent.95',
      color: 'accent.40',
    },
    '&:active': {
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
    color: 'transparent',
  },
  critical: {
    ...base,
    bg: 'critical.bright',
    border: '1px solid',
    borderColor: 'critical.bright',
    color: 'transparent',
  },
  icon: {
    borderRadius: '100%',
    cursor: 'pointer',
    bg: 'transparent',
    'path': {
      fill: 'text.secondary',
    },
    '&:hover': {
      bg: 'accent.99',
    },
    '&:active': {
      'path': {
        fill: 'white',
      },
      bg: 'active',
    },
    '&:focus': {
      outline: 'none',
      color: 'white',
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
    '&:hover': {
      ...defaultHover,
    },
    '&:active': {
      ...defaultActive,
    },
  },
};
