import React from 'react';

import Box from '../Box';

/**
 * TableHead component.
 *
 * Renders a `<thead>` html element.
 *
 * Accepts `<TableRow>` as children. Needs to be wrapped within a `<Table>` component.
 *
 */

const TableHead = (props => {
  const { children, ...others } = props;
  return (
    <Box
      as="thead"
      {...others}
    >
      {children}
    </Box>
  );
});

export default TableHead;
