import React, { forwardRef } from 'react';
import Box from '../Box/Box';

/**
 * The intended use of List is to hold a collection of <ListItem/> components.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/

const List = forwardRef((props, ref) => {
  const {
    children,
    ...others
  } = props;

  return (
    <Box ref={ref} role="list" as="ul" pl="0" {...others}>
      {children}
    </Box>
  );
});

List.displayName = 'List';

export default List;
