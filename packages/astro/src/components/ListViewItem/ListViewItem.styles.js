const container = {
  display: 'flex',
  padding: '0px 15px 0px 25px',
  flex: '1 1 0px',
  minHeight: '80px',
  justifyContent: 'center',
  bg: 'accent.99',
  outline: 'none',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
    cursor: 'pointer',
  },
  '&.is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
  '&.has-separator': {
    borderBottom: '1px solid',
    borderBottomColor: 'line.hairline',
  },
};

export default {
  container,
};
