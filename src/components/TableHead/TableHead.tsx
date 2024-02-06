import React, { forwardRef } from 'react';

import { TableHeadProps } from '../../types';
import Box from '../Box';
/**
 * TableHead component.
 *
 * Renders a `<thead>` html element.
 *
 * Accepts `<TableRow>` as children. Needs to be wrapped within a `<Table>` component.
 *
 */

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  const { children, ...others } = props;
  return (
    <Box
      ref={ref}
      as="thead"
      {...others}
    >
      {children}
    </Box>
  );
});

export default TableHead;
