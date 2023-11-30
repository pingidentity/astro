import React, { forwardRef } from 'react';

import Box from '../Box';

const Table = forwardRef((props, ref) => {
  const { children,
    ...others } = props;
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
