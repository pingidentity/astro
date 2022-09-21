/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';
import AlertIcon from 'mdi-react/AlertIcon';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import PropTypes from 'prop-types';
import { Chip, Icon } from '../../index';

const DataTableChip = forwardRef(({ cell }, ref) => {
  const color =
    (cell === 'Pending')
      ? 'line.light'
      : (cell === 'Failed')
        ? 'warning.bright'
        : (cell === 'Rejected')
          ? 'critical.bright'
          : 'success.dark';

  return (
    <Chip
      label={cell}
      bg="white"
      ref={ref}
      textColor={
        cell === 'Pending' || cell === 'Failed' ? 'text.primary' : color
      }
      sx={{
        border: '1px',
        borderStyle: 'solid',
        borderColor: color,
        flexDirection: 'row-reverse !important',
      }}
    >
      {cell !== 'Pending' && (
        <Icon
          icon={
            cell === 'Approved'
              ? CheckIcon
              : cell === 'Rejected'
              ? AlertCircleIcon
              : cell === 'Failed'
              ? AlertIcon
              : null
          }
          mr="xs"
          size="14px"
          color={color}
        />
      )}
    </Chip>
  );
});

DataTableChip.propTypes = {
  cell: PropTypes.string,
};

export default DataTableChip;
