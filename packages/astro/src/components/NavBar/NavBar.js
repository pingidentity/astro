import React, { useState } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import PropTypes from 'prop-types';

import { NavBarContext } from '../../context/NavBarContext';
import useNavBarStyling from '../../hooks/useNavBarStyling/useNavBarStyling';
import useProgressiveState from '../../hooks/useProgressiveState';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import Box from '../Box/Box';

const NavBar = props => {
  const {
    defaultSelectedKey,
    selectedKey: selectedKeyProp,
    setSelectedKey: setSelectedKeyProp,
    hasRestoreFocus,
    defaultExpandedKeys,
    children,
    variant,
    ...others
  } = props;

  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);

  const [selectedKey, setSelectedKey] = useProgressiveState(
    selectedKeyProp,
    defaultSelectedKey,
  );

  const navStyles = useNavBarStyling(variant);

  const items = Array.isArray(children)
    ? children.map(child => ({ item: child, key: child.key }))
    : [{ item: children, key: children.key }];

  const contextValue = {
    selectedKey,
    setSelectedKey: setSelectedKeyProp || setSelectedKey,
    expandedKeys,
    setExpandedKeys,
    navStyles,
  };

  return (
    <NavBarContext.Provider
      value={contextValue}
    >
      <Box variant={navStyles.navBar} role="navigation" as="nav" {...others}>
        {items.length ? (
          <FocusScope restoreFocus={hasRestoreFocus}>
            {items.map(({ item, key }) => <FocusableItem key={key}>{item}</FocusableItem>)}
          </FocusScope>
        ) : null}
      </Box>
    </NavBarContext.Provider>
  );
};

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

NavBar.propTypes = {
  /** This applies a style to the entire nav tree. the options are default and popup. */
  variant: PropTypes.oneOf(['default', 'popupNav']),
  /** Whether or not the focus will return to the previously focused element upon unmount. */
  hasRestoreFocus: PropTypes.bool,
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: PropTypes.string,
  /** The initial expanded keys in the collection (uncontrolled). */
  defaultExpandedKeys: isIterableProp,
  /** The selected key in the collection (controlled). */
  selectedKey: isIterableProp,
  /**
  * Callback function that fires when the selected key changes.
  *
  * `(selectedKey: String) => void`
  */
  setSelectedKey: PropTypes.func,
};

NavBar.defaultProps = {
  defaultSelectedKey: '',
  defaultExpandedKeys: [],
  variant: 'default',
  hasRestoreFocus: true,
};

export default NavBar;
