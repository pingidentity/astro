/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import CheckIcon from '@pingux/mdi-react/CheckIcon';

import { Badge, DataTableBadgeProps, Icon } from '../../index';

const DataTableBadge = forwardRef<HTMLDivElement, DataTableBadgeProps>(({ cell }, ref) => {
  const componentProps = {
    'Pending': {
      badgeProps: {
        variant: 'dataTable.pending',
      },
      iconProps: {
        icon: CheckIcon,
      },
    },
    'Failed': {
      badgeProps: {
        variant: 'dataTable.failed',
      },
      iconProps: {
        icon: AlertIcon,
        title: {
          name: 'Alert Icon',
        },
      },
    },
    'Rejected': {
      badgeProps: {
        variant: 'dataTable.rejected',
      },
      iconProps: {
        icon: AlertCircleIcon,
        title: {
          name: 'Alert Circle Icon',
        },
      },
    },
    'Approved': {
      badgeProps: {
        variant: 'dataTable.approved',
      },
      iconProps: {
        icon: CheckIcon,
        title: {
          name: 'Check Icon',
        },
      },
    },
  };


  return (
    <Badge
      label={cell}
      ref={ref}
      {...(cell && componentProps[cell].badgeProps)}
    >
      {cell && cell !== 'Pending' && (
        <Icon
          mr="xs"
          size="14px"
          {...(cell && componentProps[cell].iconProps)}
        />
      )}
    </Badge>
  );
});

export default DataTableBadge;
