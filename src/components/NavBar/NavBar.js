import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { FocusScope, useFocusManager } from '@react-aria/focus';

import { NavBarContext } from '../../context/NavBarContext';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import Box from '../Box/Box';
import useProgressiveState from '../../hooks/useProgressiveState';

/**
 * Composed component that spreads children.
 *
 * This component is built to have the NavBarSection component passed into it.
 *
 * NavBarSection is an iterative component that using
 * an array of objects that is passed into it.
 *
 */

const NavBar = (props) => {
  const {
    defaultSelectedKey,
    selectedKey: selectedKeyProp,
    setSelectedKey: setSelectedKeyProp,
    defaultExpandedKeys,
    children,
  } = props;

  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);

  const [selectedKey, setSelectedKey] = useProgressiveState(
    selectedKeyProp,
    defaultSelectedKey,
  );

  const items = useMemo(
    () => (Array.isArray(children)
      ? children.map(child => ({ item: child, key: uuid() }))
      : [{ item: children, key: uuid() }]),
    [],
  );

  const contextValue = {
    selectedKey,
    setSelectedKey: setSelectedKeyProp || setSelectedKey,
    expandedKeys,
    setExpandedKeys,
  };

  return (
    <NavBarContext.Provider
      value={contextValue}
    >
      <Box variant="navBar.container" role="navigation" as="nav">
        {items.length ? (
          <FocusScope restoreFocus>
            {items.map(({ item, key }) => <FocusableItem key={key}>{item}</FocusableItem>)}
          </FocusScope>
        ) : null}
      </Box>
    </NavBarContext.Provider>
  );
};

const FocusableItem = (props) => {
  const focusManager = useFocusManager();
  const onKeyDown = (e) => {
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
};

export default NavBar;
