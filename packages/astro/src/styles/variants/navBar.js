import accordion from './accordion';

const container = {
  height: '100%',
  width: '230px',
  position: 'absolute',
  zIndex: '1',
  top: '0',
  left: '0',
  backgroundColor: 'accent.20',
  overflowY: 'hidden',
};

const itemHeaderContainer = {
  flexGrow: 1,
  alignItems: 'center',
  maxWidth: '230px',
  py: 'sm',
  px: 'md',
  cursor: 'pointer',
  minHeight: '40px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const sectionContainer = {
  pt: 'sm',
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
};

const sectionBody = {
  ...accordion.accordionGridBody,
  pl: '0',
};

const navItem = {
  cursor: 'pointer',
  minHeight: '40px',
  lineHeight: '30px',
  py: 'sm',
  px: 'md',
  outline: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  color: 'neutral.95',
  flexGrow: 1,
  fontWeight: 0,
  '&.is-focused': {
    outline: '1px solid',
    outlineColor: 'focus',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.10',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.5',
  },
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

export default {
  container,
  itemHeaderContainer,
  sectionContainer,
  sectionBody,
  navItem,
};
