import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { useMenuItem } from '@react-aria/menu';
import { useFocus, useHover } from '@react-aria/interactions';

import { useMenuContext } from '../../context/MenuContext';
import useStatusClasses from '../../hooks/useStatusClasses';
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
    className,
    onAction,
    state,
  } = props;

  const {
    onClose,
    closeOnSelect,
  } = useMenuContext();
  const { key, rendered, props: itemProps } = item;
  const { isSeparator } = itemProps;
  const isDisabled = propIsDisabled || state.disabledKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);
  const menuItemRef = useRef();
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
  const { focusProps } = useFocus({ onFocusChange: setFocused });
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isFocused,
    isDisabled,
    isSelected,
  });

  return (
    <Box
      as="li"
      className={classNames}
      ref={menuItemRef}
      variant={isSeparator ? 'menuItem.separator' : 'menuItem.item'}
      {...mergeProps(hoverProps, focusProps, menuItemProps)}
    >
      {rendered}
    </Box>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  /** Whether the item is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the menu item is sele
   * cted. */
  isSelected: PropTypes.bool,
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
      isSeparator: PropTypes.bool,
    }),
    rendered: PropTypes.node,
    isDisabled: PropTypes.bool,
  }),
  state: PropTypes.shape({
    disabledKeys: PropTypes.instanceOf(Set),
    selectionManager: PropTypes.shape({
      isSelected: PropTypes.func,
    }),
  }),
};

MenuItem.defaultProps = {
  isDisabled: false,
};

export default MenuItem;
