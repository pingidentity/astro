/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';

import { Badge, DataTableBadgeProps } from '../../index';

const DataTableBadge = forwardRef<HTMLDivElement, DataTableBadgeProps>(({ cell }, ref) => {
  const componentProps = {
    'Pending': {
      badgeProps: {
        variant: 'activeStatusBadge',
      },
    },
    'Failed': {
      badgeProps: {
        variant: 'warningStatusBadge',
      },
    },
    'Rejected': {
      badgeProps: {
        variant: 'criticalStatusBadge',
      },
    },
    'Approved': {
      badgeProps: {
        variant: 'healthyStatusBadge',
      },
    },
  };


  return (
    <Badge
      label={cell}
      ref={ref}
      {...(cell && componentProps[cell].badgeProps)}
    />
  );
});

export default DataTableBadge;
