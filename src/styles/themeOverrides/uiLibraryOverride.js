import theme from '../theme';

const buttons = {
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
  primary: {
    '&:hover': {
      ...theme.buttons.primary,
    },
  },
  link: {
    'body &': theme.buttons.link,
    'body &:hover': theme.buttons.link,
    '&:not(.disabled):hover': {
      color: 'active',
      borderColor: 'transparent',
    },
  },
  iconButtons: {
    ...theme.buttons.iconButtons,
    base: {
      ...theme.buttons.iconButtons.base,
      ':focus': {
        ...theme.buttons.defaultFocus,
        border: 'none',
      },
    },
    inverted: {
      ...theme.buttons.iconButtons.inverted,
      ':focus': {
        border: 'none',
      },
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

const variants = {
  accordion: {
    header: {
      ...theme.variants.accordion.header,
      '&:not(.disabled):hover': {
        ...theme.buttons.defaultHover,
        color: 'active',
      },
      '&:focus': {
        ...theme.buttons.defaultFocus,
        border: 'none',
      },
    },
  },
  rockerButton: {
    thumbSwitch: {
      ...theme.variants.rockerButton.thumbSwitch,
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
  },
  environmentBreadcrumb: {
    button: {
      current: {
        '&:hover:not(.disabled)': {
          ...theme.variants.environmentBreadcrumb.button.current,
        },
        '&:focus': {
          ...theme.variants.environmentBreadcrumb.button.current,
        },
      },
    },
  },
  navBar: {
    sectionButton: {
      ...theme.variants.navBar.sectionButton,
      height: 'unset',
      minHeight: '36px',
      '&:not(.disabled):hover': {
        ...theme.variants.navBar.sectionButton,
      },
      ':focus': {
        border: 'none',
      },
    },
    itemButton: {
      height: 'unset',
      ...theme.variants.navBar.itemButton,
      '&:not(.disabled):hover': {
        ...theme.variants.navBar.itemButton,
      },
      ':focus': {
        border: 'none',
      },
    },
  },
};

export default {
  buttons,
  forms,
  links,
  variants,
};
