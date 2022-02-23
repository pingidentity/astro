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
    defaultSelectedKeys,
  } = props;

  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);

  return (
    <NavBarContext.Provider value={{ selectedKeys, setSelectedKeys }}>
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
  defaultSelectedKeys: isIterableProp,
};

NavBar.defaultProps = {
  defaultSelectedKeys: [],
};

export default NavBar;
