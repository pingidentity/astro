import React, { forwardRef } from 'react';

import { TableBodyProps } from '../../types';
import Box from '../Box';

/**
 * Basic TableBody component.
 *
 * Renders HTML `<tbody>`
 *
 * Needs to be a child of the `<Table>` component. Accepts `<TableRow>` as children.
 *
 */

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  const { children, ...others } = props;
  return (
    <Box ref={ref} variant="table.body" as="tbody" {...others}>
      {children}
    </Box>
  );
});

export default TableBody;
