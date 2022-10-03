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
    defaultSelectedKeys,
    selectedKeys: selectedKeysProp,
    setSelectedKeys: setSelectedKeysProp,
    defaultExpandedKeys,
    children,
  } = props;

  const [expandedKeys, setExpandedKeys] = useState(new Set(defaultExpandedKeys));
  const [selectedKeys, setSelectedKeys] = useProgressiveState(
    selectedKeysProp,
    defaultSelectedKeys,
  );

  const items = useMemo(
    () => (Array.isArray(children)
      ? children.map(child => ({ item: child, key: uuid() }))
      : [{ item: children, key: uuid() }]),
    [children],
  );

  return (
    <NavBarContext.Provider
      value={{
        selectedKey: selectedKeys,
        setSelectedKey: setSelectedKeysProp || setSelectedKeys,
        expandedKeys,
        setExpandedKeys,
      }}
    >
      <Box variant="navBar.container" role="navigation" as="nav">
        {items.length ? (
          <FocusScope restoreFocus autoFocus>
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
  defaultSelectedKeys: isIterableProp,
  /** The initial expanded keys in the collection (uncontrolled). */
  defaultExpandedKeys: isIterableProp,
  selectedKeys: isIterableProp,
  setSelectedKeys: PropTypes.func,
};

NavBar.defaultProps = {
  defaultSelectedKeys: [],
};

export default NavBar;
