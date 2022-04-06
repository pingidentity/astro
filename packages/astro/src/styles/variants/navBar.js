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
  padding: '10px 15px 10px 15px',
  cursor: 'pointer',
  minHeight: '40px',
  fontWeight: 0,
  fontSize: '16px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const sectionContainer = {
  height: '100%',
  maxHeight: '100%',
  overflowY: 'overlay !important',
};

const sectionBody = {
  ...accordion.accordionGridBody,
  pl: '0',
};

export default {
  container,
  itemHeaderContainer,
  sectionContainer,
  sectionBody,
};
