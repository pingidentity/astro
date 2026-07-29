import { astroTokens } from '@pingux/onyx-tokens';

import theme from '../themes/next-gen';

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
  inlinePrimary: {
    '&:not(.disabled):hover': {
      ...theme.buttons.inlinePrimary,
      ...theme.buttons.defaultHover,
    },
  },
  text: {
    '&:not(.disabled):hover': {
      ...theme.buttons.text,
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
    datePicker: {
      containedIcon: {
        '&:not(.disabled):hover': {
          border: 'none',
        },
        '&:focus': {
          border: 'none',
        },
      },
    },
  },
  filter: {
    '&:not(.disabled):hover': {
      borderColor: 'accent.40',
      color: 'accent.40',
    },
  },
};

const forms = {
  input: {
    '&[type=password]': {
      backgroundColor: 'white !important',
      borderColor: '#caced3 !important',
    },
    '&[type=password]:focus': {
      outline: '1px solid',
      outlineColor: 'accent.60',
      outlineOffset: '0px',
      borderColor: '#4462ED !important',
    },
    numberField: {
      ...theme.input,
      ...theme.numberFieldStyles,
      '&[type=text]': {
        ...theme.text.inputValue,
        backgroundColor: 'white',
        borderColor: 'neutral.80',
      },
      '&[type=text]:focus': {
        outline: '1px solid',
        outlineColor: 'accent.60',
        outlineOffset: '0px',
        borderColor: '#4462ED !important',
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
    wrapper: {
      '& input[type=search]': {
        ...theme.text.inputValue,
        borderColor: 'neutral.80',
        fontSize: '15px',
        bg: 'white',
        '::placeholder': {
          ...theme.text.placeholder,
          fontStyle: 'unset',
          fontSize: '15px',
        },
      },
      '& input[type=search]:focus': {
        outline: '1px solid',
        outlineColor: 'accent.60',
        outlineOffset: '0px',
        borderColor: '#4462ED !important',
      },
    },
  },
  comboBox: {
    container: {
      '& input[type=text]': {
        ...theme.text.inputValue,
        borderColor: astroTokens.color.input.border,
        borderRadius: astroTokens.radius.input,
        height: astroTokens.size.input.height,
        fontSize: '15px',
        bg: 'white',
        '::placeholder': {
          ...theme.text.placeholder,
          fontStyle: 'unset',
          fontSize: '15px',
        },
      },
      '& input[type=text]:focus': {
        outline: '1px solid',
        outlineColor: astroTokens.color.blue[500],
        outlineOffset: '0px',
        borderColor: `${astroTokens.color.blue[500]} !important`,
      },
      '&.is-focused input[type=text]': {
        outline: '1px solid',
        outlineColor: astroTokens.color.blue[500],
        outlineOffset: '0px',
        borderColor: `${astroTokens.color.blue[500]} !important`,
      },
      '& input[type=text].is-read-only, & input[type=text][readonly]': {
        backgroundColor: astroTokens.color.input['readonly-bg'],
        borderColor: astroTokens.color.input.border,
      },
      '& input[type=text].is-disabled, & input[type=text][disabled]': {
        backgroundColor: astroTokens.color.input['readonly-bg'],
        borderColor: astroTokens.color.input.border,
        opacity: 1,
      },
    },
    button: {
      border: 'none !important',
      bg: 'transparent',
      '&:not(.disabled):hover': {
        border: 'none !important',
        bg: 'transparent',
      },
      '&:focus': {
        border: 'none !important',
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
  skip: {
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'active',
        color: 'white',
        textDecoration: 'none',
      },
    },
    '&:visited': {
      color: 'white',
      textDecoration: 'none',
    },
    '&.is-pressed': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  pingLogo: {
    '&:hover': {
      '&.is-focused': {
        outline: '2px solid',
        outlineColor: 'active',
        outlineOffset: '-2px',
      },
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
};

export default {
  buttons,
  forms,
  links,
  variants,
};
