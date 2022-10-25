import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { useModal, useOverlay, OverlayContainer } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

/**
 * PopoverContainer component used for popover on SelectField, ComboBox & PopoverMenu.
*/

const PopoverContainer = forwardRef((props, ref) => {
  const {
    children,
    placement,
    arrowProps,
    arrowCrossOffset,
    onClose,
    isNotClosedOnBlur,
    hasNoArrow,
    isKeyboardDismissDisabled,
    isNonModal,
    isDismissable,
    width,
    direction,
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
        isDismissable={isDismissable}
        arrowCrossOffset={arrowCrossOffset}
        width={width}
        direction={direction}
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
  isDismissable: PropTypes.bool,
  width: PropTypes.string,
  arrowCrossOffset: PropTypes.string,
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

export const PopoverWrapper = forwardRef((props, ref) => {
  const {
    children,
    className,
    placement,
    arrowProps,
    arrowCrossOffset,
    isOpen,
    hasNoArrow,
    isNotClosedOnBlur,
    isKeyboardDismissDisabled,
    isNonModal,
    isDismissable,
    width,
    direction,
    sx,
    ...others
  } = props;
  const popoverRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => popoverRef.current);
  const { overlayProps } = useOverlay(
    {
      ...props,
      shouldCloseOnBlur: !isNotClosedOnBlur,
    },
    popoverRef,
  );
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
          sx={{
            ...sx,
            width,
          }}
        >
          {children}
          {
            hasNoArrow
              ? null
              : (
                <PopoverArrow
                  {...arrowProps}
                  arrowCrossOffset={arrowCrossOffset}
                  direction={direction}
                />
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
  isDismissable: PropTypes.bool,
  width: PropTypes.string,
  arrowCrossOffset: PropTypes.string,
  sx: PropTypes.shape({}),
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

PopoverWrapper.defaultProps = {
  placement: 'bottom',
};

export const PopoverArrow = (props) => {
  const {
    arrowCrossOffset,
    sx,
    direction,
    ...others
  } = props;

  /* istanbul ignore next */
  const calculateOffset = () => {
    switch (true) {
      case direction === 'top':
      case direction === 'bottom':
        return {
          '&:before': {
            left: `calc(50% - ${arrowCrossOffset}) !important`,
          },
        };
      case direction === 'left':
      case direction === 'right':
        return {
          '&:before': {
            top: `calc(50% - ${arrowCrossOffset}) !important`,
          },
        };
      default:
        return {};
    }
  };

  return (
    <Box
      variant="popoverMenu.arrow"
      data-popover-arrow="arrow"
      data-testid="popover-arrow"
      {...others}
      sx={{
        ...(arrowCrossOffset && calculateOffset()),
        ...sx,
      }}
    />
  );
};

PopoverArrow.propTypes = {
  width: PropTypes.string,
  arrowCrossOffset: PropTypes.string,
  sx: PropTypes.shape({}),
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

export default PopoverContainer;
