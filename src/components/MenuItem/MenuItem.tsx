import React, {
  forwardRef,
} from 'react';
import { mergeProps, useMenuItem } from 'react-aria';
import { Node, TreeState } from 'react-stately';
import CheckIcon from '@pingux/mdi-react/CheckIcon';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { v4 as uuid } from 'uuid';

import { Icon } from '../..';
import { useMenuContext } from '../../context/MenuContext';
import { useGetTheme, useLocalOrForwardRef, usePropWarning, useStatusClasses } from '../../hooks';
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
    isDisabled: isPropDisabled,
    isNotFocusedOnHover,
    className,
    state,
  } = props;

  const {
    onClose,
    shouldCloseOnSelect,
  } = useMenuContext();

  const { key, rendered, props: itemProps } = item as Node<object>;
  const { isSeparator, isPressed: propIsPressed, 'data-id': dataId, ...others } = itemProps;
  const isDisabled = isPropDisabled || state.disabledKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);

  usePropWarning(props, 'disabled', 'isDisabled');

  const menuItemRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const { menuItemProps } = useMenuItem(
    {
      key: item?.key ?? uuid(),
      'aria-label': item?.['aria-label'],
      isDisabled,
      isSelected,
      onClose,
      closeOnSelect: shouldCloseOnSelect,
    },
    state as TreeState<object>,
    menuItemRef,
  );

  const { pressProps, isPressed } = usePress({
    ref: menuItemRef,
    isDisabled,
    isPressed: propIsPressed,
  });

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled });

  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible && !isNotFocusedOnHover,
    isDisabled,
    isSelected,
    isPressed,
    isHovered,
  });

  if (isNotFocusedOnHover) {
    delete menuItemProps.onPointerEnter;
    delete menuItemProps.onPointerLeave;
  }

  const { themeState: { isOnyx } } = useGetTheme();

  return (
    <Box
      as="li"
      isRow
      alignItems="center"
      justifyContent="space-between"
      className={classNames}
      ref={menuItemRef}
      variant={isSeparator ? 'menuItem.separator' : 'menuItem.item'}
      data-id={dataId}
      aria-disabled={isDisabled}
      {...mergeProps(pressProps, hoverProps, focusProps, menuItemProps, others)}
    >
      {rendered}
      {isSelected && isOnyx && (
        <Icon
          icon={CheckIcon}
          title={{ name: 'Check Icon' }}
          color="success.bright"
          size="sm"
        />
      )}
    </Box>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {
  isDisabled: false,
  isPressed: false,
};

export default MenuItem;
