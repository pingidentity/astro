import React, { useState } from 'react';

import { NavBarContext } from '../../context/NavBarContext';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import Box from '../Box/Box';

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
    defaultSelectedKey,
    defaultExpandedKeys,
  } = props;

  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);

  return (
    <NavBarContext.Provider value={{ selectedKey, setSelectedKey, expandedKeys, setExpandedKeys }}>
      <Box
        variant="navBar.container"
        role="navigation"
        as="nav"
      >
        {props.children}
      </Box>
    </NavBarContext.Provider>
  );
};

NavBar.propTypes = {
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: isIterableProp,
  /** The initial expanded keys in the collection (uncontrolled). */
  defaultExpandedKeys: isIterableProp,
};

NavBar.defaultProps = {
  defaultSelectedKey: [],
};

export default NavBar;
