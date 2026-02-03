import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import ChevronUpIcon from '@pingux/mdi-react/ChevronUpIcon';

import { OnyxTheme } from '../..';
import { pingLogoHorizontalSmall } from '../../utils/devUtils/constants/logos';
import icons from '../themes/next-gen/customProperties/icons';

export const navBarSelected = {
  backgroundColor: 'rgba(229, 233, 248, .6)',
  boxShadow: 'none',
};

export const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '-2px',
};

const navBar = {
  container: {
    fontFamily: 'standard',
    width: '230px',
    p: '8px',
    backgroundColor: 'white',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  },
  logoParent: {
    p: '8px',
  },
  sectionContainer: {
    pt: '0',
  },
  sectionButton: {
    borderRadius: '4px',
    mb: '2px',
    height: 'unset',
    '&.is-hovered': {
      backgroundColor: '#f6f8fa',
    },
    '&.is-pressed': {
      backgroundColor: '#e5e9f8',
    },
    '&.is-focused': {
      ...navBarFocus,
    },
    ':focus': {
      border: 'none',
    },
    '&:not(.disabled):hover': {
      borderRadius: '4px',
      mb: '2px',
      height: 'unset',
      '&.is-hovered': {
        backgroundColor: '#f6f8fa',
      },
      '&.is-pressed': {
        backgroundColor: '#e5e9f8',
      },
      '&.is-focused': {
        ...navBarFocus,
      },
      backgroundColor: '#f6f8fa',
    },
  },
  itemButton: {
    py: '.75rem',
    paddingLeft: '50px',
    color: '#455469',
    borderRadius: '4px',
    fontWeight: 0,
    fontSize: '14px',
    mb: '2px',
    '&:not(.disabled)': {
      fontWeight: 0,
    },
    '&:not(.disabled):hover': {
      color: '#455469',
      py: '.75rem',
      paddingLeft: '50px',
      borderRadius: '4px',
      fontWeight: 0,
      fontSize: '14px',
      mb: '2px',
      '&.is-focused': {
        ...navBarFocus,
      },
      '&.is-hovered': {
        backgroundColor: '#f6f8fa',
        fontWeight: 0,
      },
      ':focus': {
        border: 'none',
      },
      '&.is-pressed': {
        backgroundColor: '#e5e9f8',
        color: '#455469',
      },
      '&.is-selected': {
        backgroundColor: 'rgba(229, 233, 248, .6)',
        boxShadow: 'none',
        color: 'accent.40',
      },
    },
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: '#f6f8fa',
    },
    ':focus': {
      border: 'none',
    },
    '&.is-pressed': {
      backgroundColor: '#e5e9f8',
      color: '#455469',
    },
    '&.is-selected': {
      backgroundColor: 'rgba(229, 233, 248, .6)',
      boxShadow: 'none',
      color: 'accent.40',
    },
  },
  subtitle: {
    color: '#455469',
    marginLeft: '50px !important',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '1px',
  },
  headerText: {
    color: '#455469',
    fontWeight: 0,
    fontSize: '14px',
    ml: '6px',
    mr: '8px',
    maxWidth: '122px',
    '.is-selected &': {
      color: 'accent.40',
    },
  },
  headerNav: {
    borderRadius: '4px',
    color: 'text.primary',
    '&.is-hovered': {
      backgroundColor: '#f6f8fa',
    },
    '&.is-focused': {
      boxShadow: 'none',
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
    },
  },
  item: {
    px: '1rem',
    py: '.75rem',
    color: '#455469',
    borderRadius: '4px',
    mb: '2px',
    '&.is-hovered': {
      backgroundColor: '#f6f8fa',
    },
    '> div > svg': {
      fill: '#455469',
    },
    '&.is-pressed': {
      backgroundColor: '#e5e9f8',
    },
    '&.is-selected': {
      ...navBarSelected,
      '> div > svg': {
        fill: 'accent.40',
      },
    },
    '&.is-focused': {
      outline: '2px solid',
      outlineColor: 'active',
      outlineOffset: '-2px',
      boxShadow: 'none',
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
    },
  },
  itemHeaderContainer: {
    boxShadow: 'none',
    maxWidth: '236px',
    px: '1rem',
    borderRadius: '4px',
    py: '.75rem',
    '&.is-selected': {
      ...navBarSelected,
      '> svg': {
        fill: 'accent.40',
      },
      '> div > svg': {
        fill: '#4462ED !important',
      },
    },
    backgroundColor: 'transparent',
    '> svg': {
      fill: '#455469',
    },
    '> div > svg': {
      fill: '#455469',
    },
  },
  navBarItemBody: {
    mb: '0px !important',
  },
};

const separator = {
  navBarSeparator: {
    my: '.5rem',
    mx: '0px',
    maxWidth: '236px',
    backgroundColor: '#e7eef4',
  },
};

export default {
  variants: {
    navBar,
    separator,
  },
  icons: {
    ...icons,
    test: 'test',
    MenuDown: ChevronDownIcon,
    MenuUp: ChevronUpIcon,
    pingLogoHorizontalSmall,
  },
  tShirtSizes: {
    xxs: 9,
    xs: 15,
    sm: 20,
    md: 25,
    'xsm': 16,
  },
};
