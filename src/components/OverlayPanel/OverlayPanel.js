import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { useStatusClasses } from '../../hooks';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

const OverlayPanel = forwardRef((props, ref) => {
  const {
    children,
    isOpen,
    className,
    size,
    ...others
  } = props;

  const overlayPanelRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => overlayPanelRef.current);

  const { classNames } = useStatusClasses(className, { isOpen, [`is-${size}`]: size });

  return (
    <Box variant="overlayPanel.overlayPanel" {...others} className={classNames}>
      <Box
        variant="overlayPanel.overlayPanelBody"
        className={classNames}
      >
        {children}
      </Box>
    </Box>
  );
});

OverlayPanel.propTypes = {
  /** Sets the open state of the menu. */
  isOpen: PropTypes.bool,
  /** Sets the open state of the menu. */
  size: PropTypes.oneOf(Object.values(panelSizes)),
};

OverlayPanel.defaultProps = {
  size: 'medium',
};

export default OverlayPanel;
