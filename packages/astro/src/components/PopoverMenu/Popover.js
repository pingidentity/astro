import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useModal, useOverlay, OverlayContainer } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';

export const Popover = forwardRef((props, ref) => {
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

Popover.propTypes = {
  placement: PropTypes.string,
  arrowProps: PropTypes.shape({}),
  onClose: PropTypes.func,
  isNotClosedOnBlur: PropTypes.bool,
  hasNoArrow: PropTypes.bool,
  isKeyboardDismissDisabled: PropTypes.bool,
  isNonModal: PropTypes.bool,
};

const PopoverWrapper = forwardRef((props, ref) => {
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
  const { overlayProps } = useOverlay({ ...props, isDismissable: true }, ref);
  const { modalProps } = useModal({ isDisabled: isNonModal });
  const { classNames } = useStatusClasses(className, { isOpen });

  return (
    <>
      {
        isOpen &&
        <Box
          {...mergeProps(others, overlayProps, modalProps)}
          variant="popoverMenu.container"
          ref={ref}
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
              <Arrow {...arrowProps} />
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

const Arrow = (props) => {
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
