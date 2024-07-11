import React, { forwardRef, useRef } from 'react';
import { DismissButton, FocusScope, useMenuTrigger, useOverlayPosition } from 'react-aria';
import { useMenuTriggerState } from 'react-stately';
import { PressResponder } from '@react-aria/interactions';

import { MenuContext } from '../../context/MenuContext';
import { useLocalOrForwardRef } from '../../hooks';
import { Placement, PopoverMenuProps } from '../../types';
import PopoverContainer from '../PopoverContainer';

const PopoverMenu = forwardRef<HTMLDivElement, PopoverMenuProps>((props, ref) => {
  const menuPopoverRef = useLocalOrForwardRef<HTMLDivElement>(ref);
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const {
    children,
    align,
    direction,
    isDefaultOpen,
    isNotFlippable,
    isNotClosedOnSelect,
    hasNoArrow,
    isContainFocus,
  } = props;

  const [menuTrigger, menu] = React.Children.toArray(children);

  const menuTriggerState = {
    ...props,
    defaultOpen: isDefaultOpen,
    closeOnSelect: !isNotClosedOnSelect,
    shouldFlip: !isNotFlippable,
  };
  const state = useMenuTriggerState(menuTriggerState);

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);

  const { overlayProps: positionProps, placement } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: menuPopoverRef,
    scrollRef: menuRef,
    offset: 5,
    placement: `${direction} ${align}` as Placement | undefined,
    // Our API preference is for default false so we invert this since it should be default true
    shouldFlip: !isNotFlippable,
    isOpen: state.isOpen,
    onClose: state.close,
    shouldUpdatePosition: true,
  });

  /* eslint-disable react/jsx-no-constructed-context-values */
  const menuContext = {
    ...menuProps,
    ref: menuRef,
    onClose: state.close,
    // Our API preference is for default false so we invert this since it should be default true
    closeOnSelect: !isNotClosedOnSelect,
    autoFocus: state.focusStrategy || true,
  };

  const contents = (
    <FocusScope restoreFocus contain={isContainFocus}>
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
        <PopoverContainer
          isOpen={state.isOpen}
          ref={menuPopoverRef}
          placement={placement}
          onClose={state.close}
          hasNoArrow={hasNoArrow}
          isDismissable
          isNonModal
          {...positionProps}
          {...menuProps}
          role="dialog"
        >
          {contents}
        </PopoverContainer>
      </MenuContext.Provider>
    </>
  );
});


PopoverMenu.defaultProps = {
  align: 'middle',
  direction: 'bottom',
  isNotClosedOnSelect: false,
  isNotFlippable: false,
  hasNoArrow: true,
};

PopoverMenu.displayName = 'PopoverMenu';
export default PopoverMenu;
