const overlayPanel = {
  position: 'fixed',
  zIndex: 100,
  top: 0,
  bottom: 0,
  right: 0,
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '1px solid',
  borderLeftColor: 'neutral.80',
  boxShadow: '-2px 0px 2px 1px rgba(37, 55, 70, 0.15)',
  minWidth: '50%',
  maxWidth: '100%',
  width: '400px',
  p: '25px',
};

const overlayPanelBody = {
  height: '100%',
  width: '100%',
};

export default {
  overlayPanel,
  overlayPanelBody,
};
