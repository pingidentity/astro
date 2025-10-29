import React, { forwardRef } from 'react';
import { FocusScope } from 'react-aria';

import { Box } from '../..';
import { useLocalOrForwardRef, useOverlayPanelState, useStatusClasses } from '../../hooks';
import { OverlayPanelProps } from '../../types';

const OverlayPanel = forwardRef<HTMLDivElement, OverlayPanelProps>((props, ref) => {
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

  const overlayPanelRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  // this is code to avoid regressions -- implementations that do not use the
  // useMountTransition hook will not break, because this className gives the
  // component the styling properties that it needs.
  const isOpenNoTransition = isTransitioning === undefined && isOpen === true;

  const { classNames } = useStatusClasses(className, {
    isOpen,
    isTransitioning,
    isOpenNoTransition,
    [`is-${props?.sx?.width ? 'custom' : size}`]: size,
  });

  const handleClose = e => {
    if (e.key === 'Escape') {
      onClose(state, triggerRef, onCloseProp);
    }
  };

  return (
    <FocusScope autoFocus>
      <Box
        variant="overlayPanel.container"
        ref={overlayPanelRef}
        {...others}
        className={classNames}
        onKeyUp={handleClose}
        aria-hidden={!isOpen}
      >
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

OverlayPanel.defaultProps = {
  size: 'medium',
};

export default OverlayPanel;
