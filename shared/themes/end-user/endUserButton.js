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

const endUserButtons = {
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

const airButtons = {
  primary: {
    width: 125,
    borderWidth: 0,
    marginRight: 'auto !important',
  },
};

const focusButtons = {
  primary: {
    width: '100%',
    borderWidth: 0,
    fontWeight: 800,
  },
};

const muralButtons = {
  primary: {
    width: '60%',
    borderWidth: 0,
    fontWeight: 800,
  },
};

const pingDefaultButtons = {
  primary: {
    width: '100%',
    borderWidth: 0,
  },
};

const slateButtons = {
  primary: {
    width: '60%',
    borderWidth: 0,
    marginRight: 'auto !important',
    fontSize: 18,
  },
};

const splitButtons = {
  primary: {
    width: '50%',
    borderWidth: 0,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
};

export const templateOverrides = {
  air: airButtons,
  focus: focusButtons,
  mural: muralButtons,
  default: pingDefaultButtons,
  slate: slateButtons,
  split: splitButtons,
};

export const defaultThemeOverrides = defaultTheme => ({
  primary: {
    bg: defaultTheme.configuration.buttonColor,
    borderColor: defaultTheme.configuration.buttonColor,
    color: defaultTheme.configuration.buttonTextColor,
    '&.is-hovered, &.is-active': {
      bg: defaultTheme.configuration.buttonColor,
      borderColor: defaultTheme.configuration.buttonColor,
      opacity: 0.9,
    },
    '&.is-focused': {
      bg: defaultTheme.configuration.buttonColor,
      borderColor: defaultTheme.configuration.buttonColor,
    },
  },
});

export default endUserButtons;
