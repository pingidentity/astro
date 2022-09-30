import React from 'react';
import Box from '../Box';

/**
 * Basic TableBody component.
 *
 * Renders HTML `<tbody>`
 *
 * Needs to be a child of the `<Table>` component. Accepts `<TableRow>` as children.
 *
 */

const TableBody = (props) => {
  const { children, ...others } = props;
  return (
    <Box variant="table.body" as="tbody" {...others}>
      {children}
    </Box>
  );
};

export default TableBody;
