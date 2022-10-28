import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { mergeProps, useFocusRing, useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';
import { useSyncRef } from '@react-aria/utils';

import { MenuContext } from '../../context/MenuContext';
import { usePropWarning } from '../../hooks';
import MenuItem from '../MenuItem';
import Box from '../Box';
import ORIENTATION from '../../utils/devUtils/constants/orientation';

/**
 * Menu component intended to be used as a wrapper for MenuItem.
 * This component is typically used alongside others such as PopoverMenu.
 *
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useMenu.html).
 */

const Menu = forwardRef((props, ref) => {
  const {
    isDisabled,
    onAction,
    onSelectionChange,
    isNotFocusedOnHover,
    ...others
  } = props;
  const contextProps = useContext(MenuContext);
  const completeProps = {
    ...mergeProps(contextProps, props),
  };

  const state = useTreeState(completeProps);
  const menuRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => menuRef.current);
  const { menuProps } = useMenu(completeProps, state, menuRef);
  const { isFocusVisible, focusProps } = useFocusRing({ within: true });

  // Sync the refs between context and local instance for overlay positioning
  useSyncRef(contextProps, menuRef);

  return (
    <Box
      as="ul"
      ref={menuRef}
      variant="menu"
      aria-orientation={ORIENTATION.VERTICAL}
      {...others}
      {...mergeProps(focusProps, menuProps)}
    >
      {Array.from(state.collection).map(item => (
        <MenuItem
          key={item.key}
          item={item}
          state={state}
          onAction={onAction}
          isDisabled={isDisabled}
          isFocusVisible={isFocusVisible}
          isNotFocusedOnHover={isNotFocusedOnHover}
        />
      ))}
    </Box>
  );
});

Menu.propTypes = {
  /** The type of selection that is allowed. */
  selectionMode: PropTypes.oneOf(['none', 'single', 'multiple']),
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /**
   * The initial selected keys in the collection (uncontrolled).
   *
   * `defaultSelectedKeys="all"` can be used to select every key.
   */
  defaultSelectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   * The currently selected keys in the collection (controlled).
   *
   * `selectedKeys="all"` can be used to select every key.
   */
  selectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Whether the item is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the menu item is selected. */
  isSelected: PropTypes.bool,
  /**
   * Whether menu item should receive focus state on hover.
   */
  isNotFocusedOnHover: PropTypes.bool,
  /**
   * Handler that is called when an item is selected.
   *
   * `(key: Key) => void`
   */
  onAction: PropTypes.func,
  /**
   * Handler that is called when the selection changes. Does not fire when `selectionMode="none"`.
   *
   * `(keys: Selection) => any`
   */
  onSelectionChange: PropTypes.func,
  /** A screen reader only label for the menu item. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed,
   * extended description for the object.
   */
  'aria-details': PropTypes.string,
};

Menu.defaultProps = {
  selectionMode: 'none',
  isDisabled: false,
};

Menu.displayName = 'Menu';
export default Menu;
