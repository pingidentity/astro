import * as React from 'react';
import { DismissButton, Overlay, useOverlay, usePopover } from '@react-aria/overlays';

import { useStatusClasses } from '../../hooks';
import { PopoverProps } from '../../types';
import Box from '../Box';
import { PopoverArrow } from '../PopoverContainer';

const Popover = (props: PopoverProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const {
    arrowProps,
    arrowCrossOffset,
    direction,
    popoverRef = ref,
    state,
    children,
    className,
    isNonModal,
    hasNoArrow,
    width,
    isDismissable,
    isNotClosedOnBlur,
    offset,
    ...others
  } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset: offset ?? 0,
      popoverRef,
    },
    state,
  );

  const { isOpen } = state;
  const { classNames } = useStatusClasses(className, { isOpen });

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose: state.close,
      isDismissable,
      shouldCloseOnBlur: !isNotClosedOnBlur,
    },
    popoverRef,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} />}
      <Box
        ref={popoverRef}
        variant="popoverMenu.container"
        className={classNames}
        role="presentation"
        width={width}
        {...popoverProps}
        {...overlayProps}
        {...others}
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
        <DismissButton onDismiss={state.close} />
      </Box>
    </Overlay>
  );
};

export default Popover;
