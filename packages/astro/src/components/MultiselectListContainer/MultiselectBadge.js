import React from 'react';
import PropTypes from 'prop-types';
import Chip from '../Chip';

/**
 * The MultiselectBadge serves as a badge to display selected count.
 */

const MultiselectBadge = (props) => {
  const { selectedFilterCount, ...others } = props;
  return (
    <Chip
      as="span"
      bg="neutral.90"
      label={selectedFilterCount.toString()}
      textColor="neutral.30"
      variant="multiselectListContainer.multiselectListBadge"
      isUppercase
      {...others}
    />
  );
};

MultiselectBadge.propTypes = {
  selectedFilterCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  margin: PropTypes.string,
};

MultiselectBadge.displayName = 'MultiselectBadge';
export default MultiselectBadge;
