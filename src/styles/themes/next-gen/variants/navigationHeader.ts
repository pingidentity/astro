const defaultFocus = {
  outline: '2px solid',
  outlineColor: 'active',
  outlineOffset: '1px',
};

const link = {
  display: 'inline-block',
  height: '40px',
  fontSize: 'md',
  fontFamily: 'standard',
  py: 'sm',
  px: 'md',
  fontWeight: '1',
  lineHeight: 'body',
  color: 'text.primary',
  textDecoration: 'none',
  borderRadius: '3px',
  '&.is-hovered': {
    textDecoration: 'none',
    color: 'text.secondary',
  },
  '&.is-focused, &:focus-visible ': {
    ...defaultFocus,
    textDecoration: 'none',
  },
  '&.is-pressed': {
    textDecoration: 'none',
  },
  '&.is-visited': {
    textDecoration: 'none',
  },
};

const headerPlaceholder = {
  fontSize: 'lg',
  ml: 'md',
  color: 'text.primary',
  lineHeight: 'body',
  fontWeight: '1',
  '&.is-hovered': {
    color: 'text.secondary',
  },
};

const navigationHeader = {
  headerPlaceholder,
  link,
  container: {
    fontFamily: 'standard',
    borderBottom: '1px solid',
    borderColor: 'border.base',
    backgroundColor: 'background.base',
    height: '4.5rem',
    justifyContent: 'center',
  },
  wrapper: {
    px: ['1.5rem', '1.5rem', '1.5rem', '3rem', '3rem', '3rem'],
    maxWidth: '1540px',
    mx: 'auto',
    width: '100%',
    backgroundColor: 'background.base',
  },
  dropdownMenu: {
    backgroundColor: 'background.base',
    maxWidth: 'unset',
    p: 'sm',
    '&:focus': {
      ...defaultFocus,
    },
    '& > li': {
      p: '0',
    },
  },
  dropdownMenuItem: {
    ...link,
    height: 'max-content',
    padding: '.675rem 1rem',
    pr: '2.25rem',
    '&.is-hovered': { textDecoration: 'none' },
    '&.is-pressed': { textDecoration: 'none' },
    '&.is-focused': { textDecoration: 'none' },
    '&.is-visited': { textDecoration: 'none' },
  },
  accountButton: {
    display: 'flex',
    width: 'auto',
    height: 'auto',
    cursor: 'pointer',
    p: '0',
    px: 'sm',
    py: '3px',
    border: 'none',
    borderRadius: '3px',
    bg: 'transparent',
    '&.is-hovered': {
      bg: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
    '&.is-pressed': {
      bg: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
    '&.is-focused': {
      ...defaultFocus,
      bg: 'transparent',
    },
    '&.is-visited': {
      bg: 'transparent',
    },
    minWidth: '50px',
  },
};

export default navigationHeader;
