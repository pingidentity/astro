import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { PressResponder } from '@react-aria/interactions';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';

import { Popover } from './Popover';
import { MenuContext } from '../../context/MenuContext';

/**
 * The PopoverMenu serves as a wrapper around a Menu and its associated trigger, linking the Menu's
 * open state with the trigger's press state and providing necessary overlay context.
 *
 * Primarily utilizes [useMenuTrigger](https://react-spectrum.adobe.com/react-aria/useMenuTrigger.html) from React Aria and [useMenuTriggerState](https://react-spectrum.adobe.com/react-stately/useMenuTriggerState.html) from React Stately.
 */
const PopoverMenu = forwardRef((props, ref) => {
  const menuPopoverRef = useRef();
  const triggerRef = useRef();
  const menuRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => menuPopoverRef.current);
  const {
    children,
    align,
    direction,
    isDefaultOpen,
    isNotFlippable,
    isNotClosedOnSelect,
  } = props;

  const [menuTrigger, menu] = React.Children.toArray(children);
  const state = useMenuTriggerState({
    ...props,
    defaultOpen: isDefaultOpen,
    closeOnSelect: !isNotClosedOnSelect,
    shouldFlip: !isNotFlippable,
  });

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);

  const { overlayProps: positionProps, placement } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: menuPopoverRef,
    scrollRef: menuRef,
    offset: 10,
    placement: `${direction} ${align}`,
    // Our API preference is for default false so we invert this since it should be default true
    shouldFlip: !isNotFlippable,
    isOpen: state.isOpen,
    onClose: state.close,
    shouldUpdatePosition: true,
  });

  const menuContext = {
    ...menuProps,
    ref: menuRef,
    onClose: state.close,
    // Our API preference is for default false so we invert this since it should be default true
    closeOnSelect: !isNotClosedOnSelect,
    autoFocus: state.focusStrategy || true,
  };

  const contents = (
    <FocusScope restoreFocus>
      <DismissButton onDismiss={state.close} />
      {menu}
      <DismissButton onDismiss={state.close} />
    </FocusScope>
  );

  return (
    <>
      <PressResponder {...menuTriggerProps} ref={triggerRef} isPressed={state.isOpen}>
        {menuTrigger}
      </PressResponder>
      <MenuContext.Provider value={menuContext}>
        <Popover
          isOpen={state.isOpen}
          ref={menuPopoverRef}
          placement={placement}
          onClose={state.close}
          {...positionProps}
          {...menuProps}
        >
          {contents}
        </Popover>
      </MenuContext.Provider>
    </>
  );
});

PopoverMenu.propTypes = {
  /** Alignment of the popover menu relative to the trigger. */
  align: PropTypes.oneOf(['start', 'end', 'middle']),
  /** Where the popover menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Whether the overlay is open by default (controlled). */
  isOpen: PropTypes.bool,
  /** Whether the overlay is open by default (uncontrolled). */
  isDefaultOpen: PropTypes.bool,
  /** Whether the popover is prevented from closing when a selection is made. */
  isNotClosedOnSelect: PropTypes.bool,
  /**
   * Whether the popover is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable: PropTypes.bool,
  /**
   * Handler that is called when the overlay's open state changes.
   *
   * `(isOpen: boolean) => void`
   */
  onOpenChange: PropTypes.func,
};

PopoverMenu.defaultProps = {
  align: 'middle',
  direction: 'bottom',
  isNotClosedOnSelect: false,
  isNotFlippable: false,
};

PopoverMenu.displayName = 'PopoverMenu';
export default PopoverMenu;
