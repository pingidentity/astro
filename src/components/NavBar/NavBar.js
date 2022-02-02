import React from 'react';
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
  return (
    <Box
      variant="boxes.navBar"
      role="navigation"
      as="nav"
    >
      {props.children}
    </Box>
  );
};

export default NavBar;
