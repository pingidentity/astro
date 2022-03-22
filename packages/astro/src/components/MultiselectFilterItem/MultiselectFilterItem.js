import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, Text } from '../../index';

const MultiselectFilterItem = forwardRef((props, ref) => {
  const { text, icon } = props;

  return (
    <Box
      data-testid="multiselect-filter-item"
      isRow
      justifyContent="space-between"
      ref={ref}
    >
      <Text variant="multiselectFilterItem">
        {text}
      </Text>
      { icon &&
        <Icon
          data-testid="multiselect-filter-data-icon"
          icon={icon}
          mr="md"
          color="neutral.10"
          size={13}
          flexShrink={0}
        />
        }
    </Box>
  );
});

MultiselectFilterItem.propTypes = {
  /**
     * Display text.
     */
  text: PropTypes.string,
  /**
     * List icon.
     */
  icon: PropTypes.shape({}),
};

MultiselectFilterItem.displayName = 'MultiselectFilterItem';
export default MultiselectFilterItem;
