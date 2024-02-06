import React, { forwardRef } from 'react';

import { TableCellProps } from '../../types';
import Box from '../Box';

/**
 * TableCell component.
 *
 * Renders either an `<th>` or a `<td>` HTML element, depending on the isHeading prop.
 *
 * Accepts text as children, and needs to have a `<TableRow>` as a parent.
 *
 */

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => {
  const { children, isHeading, ...others } = props;
  return (
    <Box ref={ref} variant={isHeading ? 'table.head' : 'table.data'} as={isHeading ? 'th' : 'td'} {...others}>
      {children}
    </Box>
  );
});

export default TableCell;
