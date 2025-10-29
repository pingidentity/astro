import React, { forwardRef, useMemo, useState } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';

import { NavBarContext } from '../../context/NavBarContext';
import useNavBarStyling from '../../hooks/useNavBarStyling/useNavBarStyling';
import useProgressiveState from '../../hooks/useProgressiveState';
import { NavBarProps } from '../../types/navBar';
import Box from '../Box/Box';

const NavBar = forwardRef<HTMLElement, NavBarProps>((props, ref) => {
  const {
    isAutoСollapsible,
    defaultSelectedKey,
    selectedKey: selectedKeyProp,
    setSelectedKey: setSelectedKeyProp,
    hasRestoreFocus,
    defaultExpandedKeys,
    children,
    variant,
    ...others
  } = props;

  const initialExpandedKeys = isAutoСollapsible
    && Array.isArray(defaultExpandedKeys) && defaultExpandedKeys.length
    ? defaultExpandedKeys[0]
    : defaultExpandedKeys;

  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  const [selectedKey, setSelectedKey] = useProgressiveState(
    selectedKeyProp,
    defaultSelectedKey,
  );

  const navStyles = useNavBarStyling(variant!);

  const items = Array.isArray(children)
    ? children.map(child => ({ item: child, key: child.key }))
    : [{ item: children, key: !children ? '' : children[0]?.key }];

  const contextValue = useMemo(() => {
    return {
      isAutoСollapsible,
      selectedKey,
      setSelectedKey: setSelectedKeyProp || setSelectedKey,
      expandedKeys,
      setExpandedKeys,
      navStyles,
    };
  }, [
    isAutoСollapsible,
    selectedKey,
    setSelectedKeyProp,
    setSelectedKey,
    expandedKeys,
    setExpandedKeys,
    navStyles,
  ]);

  return (
    <NavBarContext.Provider
      value={contextValue}
    >
      <Box ref={ref} variant={navStyles.navBar} role="navigation" as="nav" {...others}>
        {items.length ? (
          <FocusScope restoreFocus={hasRestoreFocus}>
            {items.map(({ item, key }, index) => <FocusableItem key={key || `key${index}`}>{item}</FocusableItem>)}
          </FocusScope>
        ) : null}
      </Box>
    </NavBarContext.Provider>
  );
});

const FocusableItem = props => {
  const focusManager = useFocusManager();
  const onKeyDown = e => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusManager.focusNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusManager.focusPrevious();
        break;
      default:
        break;
    }
  };

  const childWithFocusHandle = React.cloneElement(props.children, { onKeyDown });
  return childWithFocusHandle;
};

NavBar.defaultProps = {
  isAutoСollapsible: false,
  defaultSelectedKey: '',
  defaultExpandedKeys: [],
  variant: 'default',
  hasRestoreFocus: true,
};

export default NavBar;
