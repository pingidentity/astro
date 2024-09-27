import React, {
  forwardRef,
  useState,
} from 'react';
import { mergeProps, useMenuItem } from 'react-aria';
import { Node, TreeState } from 'react-stately';
import { useFocus, useHover, usePress } from '@react-aria/interactions';

import { useMenuContext } from '../../context/MenuContext';
import { useLocalOrForwardRef, usePropWarning, useStatusClasses } from '../../hooks';
import { MenuItemProps } from '../../types';
import Box from '../Box';

/**
 * Menu Item component intended to be used within Menu or PopupMenu.
 * This component is not intented to be used outside of Menu or independently.
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useMenu.html)
 */
const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const {
    item,
    isDisabled: propIsDisabled,
    isFocusVisible,
    isNotFocusedOnHover,
    className,
    onAction,
    state,
  } = props;

  const {
    onClose,
    closeOnSelect,
  } = useMenuContext();

  const { key, rendered, props: itemProps } = item as Node<object>;
  const { isSeparator, isPressed: propIsPressed, 'data-id': dataId, ...others } = itemProps;
  const isDisabled = propIsDisabled || state.disabledKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);

  usePropWarning(props, 'disabled', 'isDisabled');

  const menuItemRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const { menuItemProps } = useMenuItem(
    {
      key: item?.key,
      'aria-label': item?.['aria-label'],
      isDisabled,
      onAction,
      isSelected,
      onClose,
      closeOnSelect,
    },
    state as TreeState<object>,
    menuItemRef,
  );

  const [isFocused, setFocused] = useState(false);
  const { pressProps, isPressed } = usePress({
    ref: menuItemRef,
    isDisabled,
    isPressed: propIsPressed,
  });
  const { focusProps } = useFocus({ onFocusChange: setFocused });
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocused || (isHovered && !isFocusVisible),
    isDisabled,
    isSelected,
    isPressed,
  });

  if (isNotFocusedOnHover) {
    delete menuItemProps.onPointerEnter;
    delete menuItemProps.onPointerLeave;
  }

  return (
    <Box
      as="li"
      className={classNames}
      ref={menuItemRef}
      variant={isSeparator ? 'menuItem.separator' : 'menuItem.item'}
      data-id={dataId}
      aria-disabled={isDisabled}
      {...mergeProps(pressProps, hoverProps, focusProps, menuItemProps, others)}
    >
      {rendered}
    </Box>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {
  isDisabled: false,
  isPressed: false,
};

export default MenuItem;
