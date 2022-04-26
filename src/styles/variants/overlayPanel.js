const overlayPanel = {
  position: 'fixed',
  overflowY: 'scroll',
  zIndex: 1,
  top: 0,
  bottom: 0,
  right: '-100%',
  background: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '1px solid',
  borderLeftColor: 'neutral.80',
  boxShadow: '-2px 0px 2px 1px rgba(37, 55, 70, 0.15)',
  p: '25px',
  transition: 'right 500ms',
  maxWidth: '100%',
  '&.is-small': {
    width: '400px',
  },
  '&.is-medium': {
    width: '550px',
  },
  '&.is-large': {
    width: '800px',
  },
  '&.is-full': {
    width: 'container.full',
  },
  '&.is-open': {
    display: 'flex !important',
    right: 0,
  },
};

const overlayPanelInner = {
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  right: 0,
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px 0px rgb(110 110 110 / 25%) inset',
  minWidth: '50%',
  maxWidth: '100%',
  width: '100%',
  height: '200px',
  p: '25px',
  backgroundColor: 'accent.99',
};

const overlayPanelBody = {
  display: 'none',
  height: '100%',
  width: '100%',
  '&.is-open': {
    display: 'flex',
  },
};

export default {
  overlayPanel,
  overlayPanelBody,
  overlayPanelInner,
};
