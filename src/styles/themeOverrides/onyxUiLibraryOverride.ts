import { astroTokens } from '@pingux/onyx-tokens';

import theme from '../themes/next-gen';
import { nextGenColors } from '../themes/next-gen/tokens/colorTokens';

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
  criticalLink: {
    '&': theme.buttons.criticalLink,
    '&:hover': theme.buttons.criticalLink,
    '&:not(.disabled):hover': {
      color: 'critical.bright',
      borderColor: 'transparent',
    },
    '&.is-pressed': {
      borderColor: 'transparent',
    },
    '&:active': {
      borderColor: 'transparent',
    },
    '&:focus': {
      borderColor: 'transparent',
    },
    '&.is-focused': {
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
  // not sure what this references/
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
      borderColor: `${astroTokens.color.blue[500]} !important`,
    },
    numberField: {
      ...theme.input,
      ...theme.numberFieldStyles,
      '&[type=text]': {
        ...theme.text.inputValue,
        backgroundColor: 'white',
        borderColor: astroTokens.color.input.border,
      },
      '&[type=text]:focus': {
        outline: '1px solid',
        outlineColor: `${astroTokens.color.blue[500]}`,
        outlineOffset: '0px',
        borderColor: `${astroTokens.color.blue[500]} !important`,
      },
    },
  },
  select: {
    '&:not(.disabled):hover': {
      ...theme.text.inputValue,
      borderColor: astroTokens.color.input.border,
    },
  },
  search: {
    wrapper: {
      '& input[type=search]': {
        ...theme.text.inputValue,
        borderColor: astroTokens.color.input.border,
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
        outlineColor: astroTokens.color.blue[500],
        outlineOffset: '0px',
        borderColor: `${astroTokens.color.blue[500]} !important`,
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
        color: 'black',
      },
      ':not(.is-selected):hover': {
        color: 'black',
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
