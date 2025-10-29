export const navBarSelected = {
  backgroundColor: 'lightblue',
  boxShadow: 'none',
};

export const navBarFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '-2px',
};

export const navBar = {
  container: {
    fontFamily: 'standard',
    width: '252px',
    p: 'sm',
    backgroundColor: 'background.base',
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
      backgroundColor: 'gray-200',
    },
    '&.is-focused': {
      ...navBarFocus,
    },
  },
  itemButton: {
    py: '.75rem',
    paddingLeft: '53px',
    color: 'gray-700',
    borderRadius: '4px',
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: 'gray-200',
      color: 'gray-700',
    },
    '&.is-selected': {
      bg: 'lightblue',
      boxShadow: 'none',
      color: 'darkblue',
    },
  },
  subtitle: {
    color: 'gray-700',
  },
  headerText: {
    color: 'text.primary',
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
    color: 'gray-700',
    borderRadius: '4px',
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '> div > svg': {
      fill: 'gray-700',
    },
    '&.is-pressed': {
      backgroundColor: 'gray-200',
    },
    '&.is-selected': {
      ...navBarSelected,
      '> div > svg': {
        fill: 'darkblue',
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
    },
    backgroundColor: 'transparent',
    '> svg': {
      fill: 'gray-700',
    },
    '> div > svg': {
      fill: 'gray-700',
    },
  },
  navBarItemBody: {
    mb: '0px !important',
  },
};
