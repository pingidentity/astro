import React, { forwardRef } from 'react';

import Box from '../Box';

/**
 * TableRow component.
 *
 * Renders a `<tr>` html element.
 *
 * Accepts `<TableCell>` as children. Needs to be wrapped within a `<TableHead>` or a `<TableBody>`.
 *
 */

const TableRow = forwardRef((props, ref) => {
  const { children, ...others } = props;
  return (
    <Box
      ref={ref}
      variant="table.row"
      as="tr"
      {...others}
    >
      {children}
    </Box>
  );
});

export default TableRow;
