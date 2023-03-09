const container = {
  display: 'flex',
  padding: '0px 15px 0px 25px',
  flex: '1 1 0px',
  minHeight: '80px',
  justifyContent: 'center',
  bg: 'accent.99',
  outline: 'none',
  '& li': {
    bg: 'white',
  },
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
    cursor: 'pointer',
  },
  '&.is-focused': {
    boxShadow: '0 0 0 1px inset #D033FF',
  },
  '&.has-separator': {
    borderBottom: '1px solid',
    borderBottomColor: 'line.light',
  },
};

const linkedViewContainer = {
  ...container,
  minHeight: '75px',
  height: '76px',
  '& li': {
    bg: 'white',
  },
  '&.has-inset-separator': {
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% - 43px)',
      right: 0,
      bottom: 0,
      borderBottom: '1px solid',
      borderBottomColor: 'line.light',
    },
    '&.is-focused': {
      '&:after': {
        content: '""',
        position: 'absolute',
        width: 'calc(100% - 43px)',
        right: 0,
        bottom: 0,
        borderBottom: '1px solid',
        borderBottomColor: 'focus',
      },
    },
  },
};

export default {
  container,
  linkedViewContainer,
};
