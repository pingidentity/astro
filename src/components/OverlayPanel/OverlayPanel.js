import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { FocusScope } from 'react-aria';

import { Box } from '../../';
import { useStatusClasses, useOverlayPanelState } from '../../hooks';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

/**
 * In Astro, side panels are used to show details and present modal interactions.
 *
 * Note: The way the OverlayPanel displays in the Firefox browser differs from other browsers.
 * This is a Storybook only issue and will not effect the way it works in your app. Be sure to
 * use Chrome or Safari to view how this component works.
 */

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
  /* istanbul ignore next */
  useImperativeHandle(ref, () => overlayPanelRef.current);

  const { classNames } = useStatusClasses(className, { isOpen, [`is-${props?.sx?.width ? 'custom' : size}`]: size });

  const handleClose = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      onClose(state, triggerRef, onCloseProp);
    }
  };

  return (
    <FocusScope autoFocus>
      <Box variant="overlayPanel.container" ref={overlayPanelRef} {...others} className={classNames} onKeyUp={handleClose} >
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
  /** Ref that is connected to the button that triggers the overlay state.
   Focus will return to this ref when the keyboard is used to close the OverlayPanel. */
  triggerRef: PropTypes.shape({}),
};

OverlayPanel.defaultProps = {
  size: 'medium',
};

export default OverlayPanel;
