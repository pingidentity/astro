import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NavBarContext } from '../../context/NavBarContext';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import Box from '../Box/Box';
import useProgressiveState from '../../hooks/useProgressiveState';

/**
 * Composed component that spreads children.
 *
 * This component is built to have the NavBarSection component passed into it.
 *
 * NavBarSection is an iterative component that
 * will build an AccordionGridGroup using
 * the array of objects that is passed into it.
 *
 */

const NavBar = (props) => {
  const {
    defaultSelectedKeys,
    selectedKeys: selectedKeysProp,
    setSelectedKeys: setSelectedKeysProp,
    defaultExpandedKeys,
  } = props;

  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);
  const [selectedKeys, setSelectedKeys] = useProgressiveState(
    selectedKeysProp,
    defaultSelectedKeys,
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
        {props.children}
      </Box>
    </NavBarContext.Provider>
  );
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
