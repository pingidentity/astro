import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FocusScope } from '@react-aria/focus';
import Box from '../Box';
import { useStatusClasses, useOverlayPanelState } from '../../hooks';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

const OverlayPanel = forwardRef((props, ref) => {
  const {
    children,
    isOpen,
    onClose: onCloseProp,
    className,
    state,
    size,
    triggerRef,
    ...others
  } = props;

  const { onClose } = useOverlayPanelState();

  const overlayPanelRef = useRef();
  const [contain, setIsContained] = useState(true);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => overlayPanelRef.current);

  const { classNames } = useStatusClasses(className, { isOpen, [`is-${props?.sx?.width ? 'custom' : size}`]: size });

  const handleClose = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setIsContained(false);
    }
  };

  useEffect(() => {
    if (!contain && onClose) {
      onClose(state, triggerRef, onCloseProp);
    }
  }, [contain]);

  return (
    <FocusScope autoFocus contain={contain}>
      <Box variant="overlayPanel.overlayPanel" ref={overlayPanelRef} {...others} className={classNames} onKeyUp={handleClose} >
        <Box
          variant="overlayPanel.overlayPanelBody"
          className={classNames}
        >
          {children}
        </Box>
      </Box>
    </FocusScope>
  );
});

OverlayPanel.propTypes = {
  /** Sets the open state of the menu. */
  isOpen: PropTypes.bool,
  /** Sets the open state of the menu. */
  size: PropTypes.oneOf(Object.values(panelSizes)),
  /** JSX styling that is passed into the component. */
  sx: PropTypes.shape({
    width: PropTypes.string,
  }),
  /** State object that is passed in from the useOverlayPanelState hook */
  state: PropTypes.shape({
    close: PropTypes.func,
  }),
  /** Callback function that runs when the esc key is used to close the OverlayPanel. */
  onClose: PropTypes.func,
  /** Ref that is connected to the button that triggers the overlay state.
   Focus will return to this ref when the keyboard is used to close the OverlayPanel. */
  triggerRef: PropTypes.shape({}),
};

OverlayPanel.defaultProps = {
  size: 'medium',
};

export default OverlayPanel;
