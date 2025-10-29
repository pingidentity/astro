const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '-2px',
};

const navBarSelected = {
  backgroundColor: 'background.hover',
};

export const navBar = {
  container: {
    width: '252px',
    p: 'sm',
    backgroundColor: 'background.base',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  },
  sectionButton: {
    '&.is-focused': {
      ...navBarFocus,
    },

    '&.is-pressed': {
      backgroundColor: 'background.hover',
      color: 'white',
      fontFamily: 'standard',
      '> div > span': {
        color: 'white',
      },
      '> div > svg': {
        fill: 'white',
      },
    },
    '&.is-hovered': {
      '> div': {
        backgroundColor: 'background.hover',
      },
    },
  },
  itemButton: {
    color: 'text.primary',
    fontFamily: 'standard',
    '&.is-selected': {
      backgroundColor: 'background.hover',
      color: 'white',
      '> div > span': {
        color: 'white',
      },
      '> div > svg': {
        fill: 'white',
      },
    },
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: 'background.hover',
    },
    '&.is-pressed': {
      backgroundColor: 'background.hover',
      color: 'white',
    },
  },
  subtitle: {
    fontFamily: 'standard',
    color: 'text.primary',
  },
  headerText: {
    color: 'text.primary',
    fontFamily: 'standard',
    '.is-selected &': {
      color: 'white',
    },
  },
  headerNav: {
    color: 'text.primary',
    fontFamily: 'standard',
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
    color: 'text.primary',
    fontFamily: 'standard',
    '&.is-hovered': {
      backgroundColor: 'background.hover',
    },
    '> div > svg': {
      fill: 'text.primary',
    },
    '&.is-selected': {
      ...navBarSelected,
      '> div > svg': {
        fill: 'white',
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
    '&.is-pressed': {
      backgroundColor: 'background.hover',
      '> div > span': {
        color: 'white',
      },
      '> div > svg': {
        fill: 'white',
      },
    },
  },
  itemHeaderContainer: {
    px: '1rem',
    py: '.75rem',
    backgroundColor: 'transparent',
    '> svg': {
      fill: 'text.primary',
    },
    '> div > svg': {
      fill: 'text.primary',
    },
    '&.is-selected': {
      ...navBarSelected,
      '> svg': {
        fill: 'white',
      },
    },
  },
};
