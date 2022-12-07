import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../Badge';

/**
 * The CollapsiblePanelBadge serves as a badge to display selected count.
 */

const CollapsiblePanelBadge = (props) => {
  const { selectedFilterCount, ...others } = props;
  return (
    <Badge
      as="span"
      bg="neutral.90"
      label={selectedFilterCount.toString()}
      textColor="neutral.30"
      variant="variants.collapsiblePanel.badge"
      isUppercase
      {...others}
    />
  );
};

CollapsiblePanelBadge.propTypes = {
  selectedFilterCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  margin: PropTypes.string,
};

CollapsiblePanelBadge.displayName = 'CollapsiblePanelBadge';
export default CollapsiblePanelBadge;
