/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import CheckIcon from '@pingux/mdi-react/CheckIcon';

import { Badge, DataTableBadgeProps, Icon } from '../../index';

const DataTableBadge = forwardRef<HTMLDivElement, DataTableBadgeProps>(({ cell }, ref) => {
  const color = (cell === 'Pending')
    ? 'line.light'
    : (cell === 'Failed')
      ? 'warning.bright'
      : (cell === 'Rejected')
        ? 'critical.bright'
        : 'success.dark';

  return (
    <Badge
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
        flexDirection: 'row-reverse !important' as 'row-reverse',
      }}
    >
      {cell && cell !== 'Pending' && (
        <Icon
          icon={
            cell === 'Approved'
              ? CheckIcon
              : cell === 'Rejected'
                ? AlertCircleIcon
                : cell === 'Failed'
                  ? AlertIcon
                  : undefined
          }
          title={{
            name: cell === 'Approved'
              ? 'Check Icon'
              : cell === 'Rejected'
                ? 'Alert Circle Icon'
                : cell === 'Failed'
                  ? 'Alert Icon'
                  : '',
          }}
          mr="xs"
          size="14px"
          color={color}
        />
      )}
    </Badge>
  );
});

export default DataTableBadge;
