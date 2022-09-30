const header = {
  cursor: 'pointer',
  lineHeight: '30px',
  pl: 'sm',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  bg: 'white',
  color: 'neutral.10',
  flexGrow: 1,
  fontWeight: 700,
  '&.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
    WebkitBoxShadow: 'focus',
    MozBoxShadow: 'focus',
    zIndex: '10',
  },
  minHeight: '64px',
  '&.is-hovered': {
    backgroundColor: 'accent.99',
  },
  '&.is-pressed': {
    color: 'accent.20',
    '& div > div > div > span': {
      color: 'accent.20',
    },
  },
};

const headerNav = {
  cursor: 'pointer',
  minHeight: '40px',
  lineHeight: '30px',
  outline: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  color: 'neutral.95',
  flexGrow: 1,
  fontWeight: 0,
  fontSize: '16px',
  '&.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
    WebkitBoxShadow: 'focus',
    MozBoxShadow: 'focus',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.10',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.5',
  },
};

const navItem = {
  ...headerNav,
  padding: '10px 15px 10px 15px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const body = {
  display: 'none !important',
  pl: 'sm',
  width: '100%',
  '&.is-selected': {
    display: 'flex !important',
  },
  ':focus': {
    outline: 'none',
  },
};

const item = {
  ':focus': {
    outline: 'none',
  },
};

export default {
  header,
  body,
  headerNav,
  navItem,
  item,
};
