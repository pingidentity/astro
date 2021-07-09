import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

/**
 * TableCell component.
 *
 * Renders either an `<th>` or a `<td>` HTML element, depending on the isHeading prop.
 *
 * Accepts text as children, and needs to have a `<TableRow>` as a parent.
 *
 */

const TableCell = (props) => {
  const { children, isHeading, ...others } = props;
  return (
    <Box variant={isHeading ? 'table.tableHead' : 'table.tableData'} as={isHeading ? 'th' : 'td'} {...others}>
      {children}
    </Box>
  );
};

TableCell.propTypes = {
  /** Determines whether or not the html rendered is a th or td element. */
  isHeading: PropTypes.bool,
};

export default TableCell;
