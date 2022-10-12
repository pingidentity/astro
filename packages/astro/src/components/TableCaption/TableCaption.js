import React from 'react';
import Box from '../Box';

/**
 * Basic TableCaption component.
 *
 * Renders HTML `<caption>`
 *
 * Needs to be a child of the `<Table>` component. Accepts text as children.
 *
 */

const TableCaption = (props) => {
  const { children, ...others } = props;
  return (
    <Box variant="table.tableCaption" as="caption" {...others}>
      {children}
    </Box>
  );
};

export default TableCaption;
