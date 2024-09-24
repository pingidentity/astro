import React, { FC, forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, OverlayContainer, useModal, useOverlay } from 'react-aria';

import { useStatusClasses } from '../../hooks';
import { PopoverArrowProps, PopoverContainerProps, PopoverWrapperProps } from '../../types';
import Box from '../Box';

/**
 * PopoverContainer component used for popover on SelectField, ComboBox & PopoverMenu.
*/

const PopoverContainer = forwardRef<HTMLElement, PopoverContainerProps>((props, ref) => {
  const {
    children,
    ...others
  } = props;

  return (
    <OverlayContainer>
      <PopoverWrapper
        ref={ref}
        {...others}
      >
        {children}
      </PopoverWrapper>
    </OverlayContainer>
  );
});

// eslint-disable-next-line max-len
export const PopoverWrapper = forwardRef<HTMLElement, PopoverWrapperProps>((props, ref) => {
  const {
    children,
    className,
    placement = 'bottom',
    arrowProps,
    arrowCrossOffset,
    isOpen,
    hasNoArrow,
    isNotClosedOnBlur,
    isNonModal,
    width,
    direction,
    sx,
    ...others
  } = props;


  const popoverRef = useRef<HTMLElement>(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => popoverRef.current as HTMLElement);
  const { overlayProps } = useOverlay(
    {
      ...props,
      shouldCloseOnBlur: !isNotClosedOnBlur,
    },
    popoverRef,
  );
  const { modalProps } = useModal({ isDisabled: isNonModal });
  const { classNames } = useStatusClasses(className, { isOpen });

  if (!isOpen) {
    return null;
  }

  return (
    isOpen
      && (
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
      )
  );
});

export const PopoverArrow: FC<PopoverArrowProps> = props => {
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

export default PopoverContainer;
