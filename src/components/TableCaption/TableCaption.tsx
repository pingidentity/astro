import React, { forwardRef } from 'react';

import { TableCaptionProps } from '../../types';
import Box from '../Box';
/**
 * Basic TableCaption component.
 *
 * Renders HTML `<caption>`
 *
 * Needs to be a child of the `<Table>` component. Accepts text as children.
 *
 */

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>((props, ref) => {
  const { children, ...others } = props;
  return (
    <Box ref={ref} variant="table.caption" as="caption" {...others}>
      {children}
    </Box>
  );
});

export default TableCaption;
