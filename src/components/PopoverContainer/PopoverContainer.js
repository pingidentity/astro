import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { useModal, useOverlay, OverlayContainer } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';

/**
 * PopoverContainer component used for popover on SelectField, ComboBox, and PopoverMenu.
*/

const PopoverContainer = forwardRef((props, ref) => {
  const {
    children,
    placement,
    arrowProps,
    onClose,
    isNotClosedOnBlur,
    hasNoArrow,
    isKeyboardDismissDisabled,
    isNonModal,
    ...others
  } = props;

  return (
    <OverlayContainer>
      <PopoverWrapper
        ref={ref}
        placement={placement}
        arrowProps={arrowProps}
        onClose={onClose}
        isNotClosedOnBlur={isNotClosedOnBlur}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        hasNoArrow={hasNoArrow}
        isNonModal={isNonModal}
        {...others}
      >
        {children}
      </PopoverWrapper>
    </OverlayContainer>
  );
});

PopoverContainer.propTypes = {
  placement: PropTypes.string,
  arrowProps: PropTypes.shape({}),
  onClose: PropTypes.func,
  isNotClosedOnBlur: PropTypes.bool,
  hasNoArrow: PropTypes.bool,
  isKeyboardDismissDisabled: PropTypes.bool,
  isNonModal: PropTypes.bool,
};

export const PopoverWrapper = forwardRef((props, ref) => {
  const {
    children,
    className,
    placement,
    arrowProps,
    isOpen,
    hasNoArrow,
    isNotClosedOnBlur,
    isKeyboardDismissDisabled,
    isNonModal,
    ...others
  } = props;
  const popoverRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => popoverRef.current);
  const { overlayProps } = useOverlay({ ...props, isDismissable: true }, popoverRef);
  const { modalProps } = useModal({ isDisabled: isNonModal });
  const { classNames } = useStatusClasses(className, { isOpen });

  return (
    <>
      {
        isOpen &&
        <Box
          {...mergeProps(others, overlayProps, modalProps)}
          variant="popoverMenu.container"
          ref={popoverRef}
          className={classNames}
          role="presentation"
          data-popover-placement={placement}
          data-testid="popover-container"
        >
          {children}
          {
            hasNoArrow
            ? null
            : (
              <PopoverArrow {...arrowProps} />
            )
          }
        </Box>
      }
    </>
  );
});

PopoverWrapper.propTypes = {
  placement: PropTypes.string,
  arrowProps: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  hasNoArrow: PropTypes.bool,
  isNotClosedOnBlur: PropTypes.bool,
  isKeyboardDismissDisabled: PropTypes.bool,
  isNonModal: PropTypes.bool,
};

PopoverWrapper.defaultProps = {
  placement: 'bottom',
};

export const PopoverArrow = (props) => {
  const { ...others } = props;
  return (
    <Box
      variant="popoverMenu.arrow"
      data-popover-arrow="arrow"
      data-testid="popover-arrow"
      {...others}
    />
  );
};

export default PopoverContainer;
