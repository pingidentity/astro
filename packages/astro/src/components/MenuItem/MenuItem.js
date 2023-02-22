import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { mergeProps, useMenuItem } from 'react-aria';
import { useFocus, useHover, usePress } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { useMenuContext } from '../../context/MenuContext';
import { usePropWarning, useStatusClasses } from '../../hooks';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import Box from '../Box';

/**
 * Menu Item component intended to be used within Menu or PopupMenu.
 * This component is not intented to be used outside of Menu or independently.
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useMenu.html)
 */

const MenuItem = forwardRef((props, ref) => {
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
  const { key, rendered, props: itemProps } = item;
  const { isSeparator, isPressed: propIsPressed, 'data-id': dataId, ...others } = itemProps;
  const isDisabled = propIsDisabled || state.disabledKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);
  const menuItemRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => menuItemRef.current);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      'aria-label': item['aria-label'],
      isDisabled,
      onAction,
      isSelected,
      onClose,
      closeOnSelect,
    },
    state,
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

MenuItem.propTypes = {
  /** Whether the item is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the menu item is selected. */
  isSelected: PropTypes.bool,
  /** Whether the menu item is currently pressed. */
  isPressed: PropTypes.bool,
  /**
   * Whether the containing menu has keyboard focus.
   * Used to determine when to present hover vs focus styling.
   */
  isFocusVisible: PropTypes.bool,
  /**
   * Whether menu item should receive focus state on hover.
   */
  isNotFocusedOnHover: PropTypes.bool,
  /** A screen reader only label for the menu item. */
  'aria-label': PropTypes.string,
  /** Handler that is called when the menu should close after selecting an item. */
  onClose: PropTypes.func,
  /** Handler that is called when the user activates the item. */
  onAction: PropTypes.func,
  item: PropTypes.shape({
    'aria-label': PropTypes.string,
    key: PropTypes.string,
    props: PropTypes.shape({
      'data-id': PropTypes.string,
      isSeparator: PropTypes.bool,
      isPressed: PropTypes.bool,
    }),
    rendered: PropTypes.node,
    isDisabled: PropTypes.bool,
  }),
  state: PropTypes.shape({
    disabledKeys: isIterableProp,
    selectionManager: PropTypes.shape({
      isSelected: PropTypes.func,
    }),
  }),
};

MenuItem.defaultProps = {
  isDisabled: false,
  isPressed: false,
};

export default MenuItem;
