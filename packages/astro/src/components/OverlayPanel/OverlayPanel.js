import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FocusScope } from 'react-aria';
import PropTypes from 'prop-types';

import { Box } from '../..';
import { useOverlayPanelState, useStatusClasses } from '../../hooks';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

const OverlayPanel = forwardRef((props, ref) => {
  const {
    children,
    isOpen,
    isTransitioning,
    onClose: onCloseProp,
    className,
    state,
    size,
    triggerRef,
    ...others
  } = props;

  const { onClose } = useOverlayPanelState();

  const overlayPanelRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => overlayPanelRef.current);

  // this is code to avoid regressions -- implementations that do not use the
  // useMountTransition hook will not break, because this className gives the
  // component the styling properties that it needs.
  const isOpenNoTransition = isTransitioning === undefined && isOpen === true;

  const { classNames } = useStatusClasses(className, { isOpen, isTransitioning, isOpenNoTransition, [`is-${props?.sx?.width ? 'custom' : size}`]: size });

  const handleClose = e => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      onClose(state, triggerRef, onCloseProp);
    }
  };

  return (
    <FocusScope autoFocus>
      <Box variant="overlayPanel.container" ref={overlayPanelRef} {...others} className={classNames} onKeyUp={handleClose} aria-hidden={!isOpen}>
        <Box
          variant="overlayPanel.body"
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
  /** Sets the size of the overlay panel. */
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
  /** Boolean that determines whether or not the css transition is occuring. */
  isTransitioning: PropTypes.bool,
  /** Ref that is connected to the button that triggers the overlay state.
   Focus will return to this ref when the keyboard is used to close the OverlayPanel. */
  triggerRef: PropTypes.shape({}),
};

OverlayPanel.defaultProps = {
  size: 'medium',
};

export default OverlayPanel;
