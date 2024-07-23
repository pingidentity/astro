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
    '& li': {
      bg: 'white',
    },
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

const loaderContainer = {
  bg: 'white',
  p: 'xs',
  position: 'absolute',
  top: 'calc(50% - 18px)',
  left: 'calc(50% - 44px)',
  borderWidth: '1px',
  borderColor: 'neutral.80',
  borderStyle: 'solid',
  borderRadius: '25px',
};

const styledContainer = {
  m: '1px',
  minHeight: '72px',
  '&.is-hovered': {
    bg: 'white',
    cursor: 'pointer',
  },
};

const styledListItem = {
  ...container,
  minHeight: 0,
  padding: 0,
};

const controls = {
  alignItems: 'center',
  alignSelf: 'center',
  flexShrink: 0,
  ml: 'auto',
  pr: 'md',
};

const iconWrapper = {
  cursor: 'pointer',
  display: 'flex',
  flex: '1 1 0px',
  ml: 'md',
};

const imageWrapper = {
  ...iconWrapper,
  ml: 'sm',
};

const leftOfDataWrapper = {
  ...iconWrapper,
  ml: 0,
};

const rightOfData = {
  alignSelf: 'center',
  flexShrink: 0,
};

const expandableFocusContainer = {
  px: 'sm',
  outline: 'none',
  border: 'none',
  '&.is-focused': {
    boxShadow: '0 0 0 1px inset #D033FF',
  },
};

const expandableItemBody = {
  px: 'md',
};

const expandableStyledListItem = {
  display: 'flex',
  padding: '0px 15px 0px 25px',
  flex: '1 1 0px',
  flexGrow: 1,
  justifyContent: 'center',
  bg: 'white',
  minHeight: '75px',
  py: 'lg',
  px: 'md',
  '&.is-hovered': {
    bg: 'accent.99',
    cursor: 'pointer',
  },
  '&.is-focused': {
    boxShadow: '0 0 0 1px inset #D033FF',
  },
};

const expandableRow = {
  '&.has-separator': {
    borderBottom: '1px solid',
    borderBottomColor: 'line.light',
  },
};

export default {
  container,
  controls,
  iconWrapper,
  imageWrapper,
  leftOfDataWrapper,
  linkedViewContainer,
  rightOfData,
  styledContainer,
  styledListItem,
  loaderContainer,
  expandableFocusContainer,
  expandableItemBody,
  expandableStyledListItem,
  expandableRow,
};
