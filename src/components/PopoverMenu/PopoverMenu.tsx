import React, { forwardRef, useRef } from 'react';
import { DismissButton, FocusScope, OverlayContainer, useMenuTrigger } from 'react-aria';
import { useMenuTriggerState } from 'react-stately';
import { PressResponder } from '@react-aria/interactions';

import { MenuContext } from '../../context/MenuContext';
import { Placement, PopoverMenuProps } from '../../types';
import Popover from '../Popover/Popover';

const PopoverMenu = forwardRef<HTMLDivElement, PopoverMenuProps>((props, ref) => {
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

  /* eslint-disable react/jsx-no-constructed-context-values */
  const menuContext = {
    ...menuProps,
    ref: menuRef,
    onClose: state.close,
    // Our API preference is for default false so we invert this since it should be default true
    shouldCloseOnSelect: !isNotClosedOnSelect,
    autoFocus: state.focusStrategy || true,
  };

  const contents = (
    <FocusScope restoreFocus contain={isContainFocus}>
      <DismissButton onDismiss={state.close} />
      {menu}
      <DismissButton onDismiss={state.close} />
    </FocusScope>
  );

  const placement = `${direction} ${align}` as Placement | undefined;

  return (
    <>
      <PressResponder {...menuTriggerProps} ref={triggerRef} isPressed={state.isOpen}>
        {menuTrigger}
      </PressResponder>
      <MenuContext.Provider value={menuContext}>
        <OverlayContainer>
          <Popover
            placement={placement}
            hasNoArrow={hasNoArrow}
            {...menuProps}
            data-popover-placement={direction}
            data-testid="popover-container"
            role="presentation"
            triggerRef={triggerRef}
            state={state}
            direction={direction}
          >
            {contents}
          </Popover>
        </OverlayContainer>
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
