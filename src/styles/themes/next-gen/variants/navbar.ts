import { astroTokens } from '@pingux/onyx-tokens';

// @ts-expect-error - font-size is in default tokens but not in the type definition
const fontSizes = astroTokens.default['font-size'];

export const navBarSelected = {
  backgroundColor: astroTokens.color['nav-bar-item'].selected.bg,
  boxShadow: 'none',
};

export const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '-2px',
};

export const navBar = {
  itemIcon: {
    color: 'blue',
    fill: 'blue',
  },
  itemIconSelected: {
    color: 'darkblue',
    fill: 'darkblue',
  },
  container: {
    fontFamily: 'standard',
    width: '252px',
    p: 'sm',
    backgroundColor: 'backgroundBase',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  },
  sectionContainer: {
    pt: '0',
  },
  sectionButton: {
    borderRadius: '4px',
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: astroTokens.color.gray[200],
    },
    '&.is-focused': {
      ...navBarFocus,
    },
  },
  itemButton: {
    py: '.75rem',
    paddingLeft: '53px',
    color: astroTokens.color.gray[700],
    borderRadius: '4px',
    fontWeight: 0,
    fontSize: fontSizes['nav-bar-item'],
    lineHeight: '160%',
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: astroTokens.color.gray[200],
      color: astroTokens.color.gray[700],
    },
    '&.is-selected': {
      bg: astroTokens.color.blue[100],
      boxShadow: 'none',
      color: 'darkblue',
    },
  },
  subtitle: {
    color: astroTokens.color.gray[700],
  },
  headerText: {
    color: astroTokens.color.gray[700],
    fontWeight: 0,
    fontSize: fontSizes['nav-bar-item'],
    lineHeight: '160%',
    ml: 'sm',
    '.is-selected &': {
      color: 'darkblue',
    },
  },
  headerNav: {
    borderRadius: '4px',
    color: 'text.primary',
    '&.is-hovered': {
      backgroundColor: 'light',
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
    color: astroTokens.color.gray[700],
    borderRadius: '4px',
    '&.is-hovered': {
      backgroundColor: astroTokens.color['nav-bar-item'].hover.bg,
    },
    '> div > svg': {
      fill: astroTokens.color.gray[700],
    },
    '> div > span': {
      color: 'gray-700',
    },
    '&.is-pressed': {
      backgroundColor: astroTokens.color.gray[200],
    },
    '&.is-selected': {
      ...navBarSelected,
      '> div > svg': {
        fill: 'darkblue',
      },
      '> div > span': {
        color: 'darkblue',
      },
      '&.is-hovered': {
        backgroundColor: 'light',
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
    py: '.75rem',
    '&.is-selected': {
      ...navBarSelected,
      '> svg': {
        fill: 'darkblue',
      },
      '> div > svg': {
        fill: 'darkblue',
      },
      '> div > span': {
        color: 'darkblue',
      },
    },
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    backgroundColor: 'transparent',
    '> svg': {
      fill: astroTokens.color.gray[700],
    },
    '> div > svg': {
      fill: astroTokens.color.gray[700],
    },
  },
  navBarItemBody: {
    mb: '0px !important',
  },
};
