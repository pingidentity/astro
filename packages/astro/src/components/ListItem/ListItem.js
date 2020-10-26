import React, { forwardRef } from 'react';
import Box from '../Box/Box';

/**
 * List Item component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/

const ListItem = forwardRef((props, ref) => {
  const {
    children,
    ...others
  } = props;

  return (
    <Box role="listitem" ref={ref} as="li" variant="boxes.listItem" isRow p="md" {...others}>
      {children}
    </Box>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
