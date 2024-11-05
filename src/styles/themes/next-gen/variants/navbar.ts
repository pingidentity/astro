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
    width: '252px',
    p: 'sm',
    backgroundColor: 'background.base',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
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
    color: 'text.primary',
    borderRadius: '4px',
    '&.is-focused': {
      ...navBarFocus,
    },
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '&.is-pressed': {
      backgroundColor: 'gray-200',
      color: 'text.primary',
    },
    '&.is-selected': {
      bg: 'lightblue',
      boxShadow: 'none',
      color: 'darkblue',
    },
  },
  subtitle: {
    color: 'text.primary',
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
    color: 'text.primary',
    borderRadius: '4px',
    '&.is-hovered': {
      backgroundColor: 'light',
    },
    '> div > svg': {
      fill: 'text.primary',
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
      fill: 'text.primary',
    },
    '> div > svg': {
      fill: 'text.primary',
    },
  },
  navBarItemBody: {
    mb: '0px !important',
  },
};
