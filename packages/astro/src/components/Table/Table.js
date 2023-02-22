import React from 'react';

import Box from '../Box';

/**
 * Basic Table parent component.
 *
 * Renders an HTML `<table>`
 *
 * Accepts the `<TableBody>` component and/or the `<TableHead>` as children.
 *
 */

const Table = props => {
  const { children,
    ...others } = props;
  return (
    <Box
      as="table"
      variant="table.container"
      {...others}
    >
      {children}
    </Box>
  );
};

export default Table;
