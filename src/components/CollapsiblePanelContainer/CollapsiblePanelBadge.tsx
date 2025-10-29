import React, { forwardRef } from 'react';

import { CollapsiblePanelBadgeProps } from '../../types';
import Badge from '../Badge';

/**
 * The CollapsiblePanelBadge serves as a badge to display selected count.
 */
const CollapsiblePanelBadge = forwardRef<HTMLDivElement, CollapsiblePanelBadgeProps>(
  (props, ref) => {
    const { selectedFilterCount, ...others } = props;
    return (
      <Badge
        ref={ref}
        as="span"
        bg="neutral.90"
        label={(selectedFilterCount && selectedFilterCount.toString()) ?? ''}
        textColor="neutral.30"
        variant="variants.collapsiblePanel.badge"
        isUppercase
        {...others}
      />
    );
  });

CollapsiblePanelBadge.displayName = 'CollapsiblePanelBadge';
export default CollapsiblePanelBadge;
