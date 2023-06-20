import React from 'react';

import Box from '../Box';

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
