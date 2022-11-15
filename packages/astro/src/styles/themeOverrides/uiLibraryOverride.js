import theme from '../theme';

const buttons = {
  accordionHeader: {
    ...theme.buttons.accordionHeader,
    '&:not(.disabled):hover': {
      ...theme.buttons.defaultHover,
      color: 'active',
    },
    '&:focus': {
      ...theme.buttons.defaultFocus,
      border: 'none',
    },
  },
  critical: {
    '&:not(.disabled):hover': {
      ...theme.buttons.critical,
      ...theme.buttons.defaultHover,
    },
  },
  danger: {
    '&:not(.disabled):hover': {
      ...theme.buttons.danger,
      ...theme.buttons.defaultHover,
    },
  },
  success: {
    '&:not(.disabled):hover': {
      ...theme.buttons.success,
      ...theme.buttons.defaultHover,
    },
  },
  default: {
    '&:not(.disabled):hover': {
      ...theme.buttons.default,
      ...theme.buttons.defaultHover,
    },
    '&:focus': {
      ...theme.buttons.defaultHover,
    },
  },
  inline: {
    '&:not(.disabled):hover': {
      ...theme.buttons.inline,
      ...theme.buttons.defaultHover,
    },
  },
  inverted: {
    ...theme.buttons.inverted,
    ':focus': {
      border: 'none',
    },
  },
  primary: {
    '&:hover': {
      ...theme.buttons.primary,
    },
  },
  link: {
    'body &': theme.buttons.link,
    'body &:hover': theme.buttons.link,
  },
  iconButton: {
    ':focus': {
      ...theme.buttons.defaultFocus,
      border: 'none',
    },
  },
  environmentBreadcrumb: {
    current: {
      '&:hover:not(.disabled)': {
        ...theme.buttons.environmentBreadcrumb.current,
      },
    },
  },
  rocker: {
    ...theme.buttons.rocker,
    ':focus': {
      border: 'none',
    },
    '&.is-selected:hover': {
      color: 'white',
    },
    ':not(.is-selected):hover': {
      color: 'accent.30',
    },
  },
  navBarSectionButton: {
    ...theme.buttons.navBarSectionButton,
    height: 'unset',
    minHeight: '36px',
    '&:not(.disabled):hover': {
      ...theme.buttons.navBarSectionButton,
    },
    ':focus': {
      border: 'none',
    },
  },
  navItemButton: {
    height: 'unset',
    ...theme.buttons.navItemButton,
    '&:not(.disabled):hover': {
      ...theme.buttons.navItemButton,
    },
    ':focus': {
      border: 'none',
    },
  },
};

const forms = {
  input: {
    numberField: {
      ...theme.input,
      ...theme.numberFieldStyles,
      '&[type=text]': {
        ...theme.text.inputValue,
        backgroundColor: 'white',
        borderColor: 'neutral.80',
      },
      '&[type=text]:focus': {
        borderColor: 'neutral.80',
      },
    },
  },
  select: {
    '&:not(.disabled):hover': {
      ...theme.text.inputValue,
      borderColor: 'neutral.80',
    },
  },
  search: {
    container: {
      '& input[type=search]': {
        ...theme.text.inputValue,
        borderColor: 'neutral.80',
        bg: 'white',
        '::placeholder': {
          ...theme.text.placeholder,
          fontStyle: 'unset',
        },
      },
    },
  },
  label: {
    'body &': {
      textTransform: 'none',
    },
    checkbox: {
      textTransform: 'none',
    },
  },
};

const links = {
  app: {
    '&:hover': {
      ...theme.links.app,
    },
  },
};

export default {
  buttons,
  forms,
  links,
};
