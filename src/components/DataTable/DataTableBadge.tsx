/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';

import { Badge, DataTableBadgeProps } from '../../index';

const DataTableBadge = forwardRef<HTMLDivElement, DataTableBadgeProps>((props, ref) => {
  const { cell, ...others } = props;

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
    'Inactive': {
      badgeProps: {
        variant: 'secondaryStatusBadge',
      },
    },
  };

  return (
    <Badge
      label={cell}
      ref={ref}
      {...(cell && componentProps[cell].badgeProps)}
      {...others}
    />
  );
});

export default DataTableBadge;
