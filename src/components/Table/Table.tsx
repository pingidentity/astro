import React, { forwardRef } from 'react';

import { TableProps } from '../../types';
import Box from '../Box';

const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { children, ...others } = props;
  return (
    <Box
      ref={ref}
      as="table"
      variant="table.container"
      {...others}
    >
      {children}
    </Box>
  );
});

export default Table;
