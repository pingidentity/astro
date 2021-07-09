import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Box from '../Box';

const OverlayPanel = forwardRef((props, ref) => {
  const {
    children,
    ...others
  } = props;

  const overlayPanelRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => overlayPanelRef.current);

  return (
    <Box variant="overlayPanel.overlayPanel" {...others} >
      <Box
        variant="overlayPanel.overlayPanelBody"
      >
        {children}
      </Box>
    </Box>
  );
});

export default OverlayPanel;
