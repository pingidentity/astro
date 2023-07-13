import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import { mergeProps, useFocusRing, useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';
import { useHover } from '@react-aria/interactions';
import { useSyncRef } from '@react-aria/utils';

import { MenuContext } from '../../context/MenuContext';
import { usePropWarning } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import Box from '../Box';
import MenuItem from '../MenuItem';

import { menuPropTypes } from './menuAttributes';

const Menu = forwardRef((props, ref) => {
  const {
    isDisabled = false,
    isNotFocusedOnHover,
    onAction,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onSelectionChange,
    // eslint-disable-next-line no-unused-vars
    selectionMode = 'none',
    ...others
  } = props;
  const contextProps = useContext(MenuContext);
  const completeProps = {
    ...mergeProps(contextProps, props),
  };

  const { hoverProps } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });

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
      {...mergeProps(focusProps, menuProps, hoverProps)}
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

Menu.propTypes = menuPropTypes;

Menu.displayName = 'Menu';

export default Menu;
