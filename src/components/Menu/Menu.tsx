import React, {
  forwardRef,
  useContext,
} from 'react';
import { mergeProps, useFocusRing, useMenu } from 'react-aria';
import { TreeProps, TreeState, useTreeState } from 'react-stately';
import { useHover } from '@react-aria/interactions';
import { useSyncRef } from '@react-aria/utils';

import { MenuContext } from '../../context/MenuContext';
import { useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { MenuProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import Box from '../Box';
import MenuItem from '../MenuItem';
import MenuSection from '../MenuSection';

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    isDisabled = false,
    isNotFocusedOnHover,
    onAction,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    // eslint-disable-next-line no-unused-vars
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

  const state = useTreeState(completeProps as TreeProps<object>) as TreeState<object>;

  const menuRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');

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
      {Array.from(state.collection).map(element => {
        if (element.type === 'section') {
          return (
            <MenuSection
              key={element.key}
              section={element}
              state={state}
              onAction={onAction}
              isDisabled={isDisabled}
              isFocusVisible={isFocusVisible}
              isNotFocusedOnHover={isNotFocusedOnHover}
            />
          );
        }
        return (
          <MenuItem
            key={element.key}
            item={element}
            state={state}
            onAction={onAction}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            isNotFocusedOnHover={isNotFocusedOnHover}
          />
        );
      })}
    </Box>
  );
});

Menu.displayName = 'Menu';

export default Menu;
