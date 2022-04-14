import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, IconButton, Text } from '../../index';

const MultiselectFilterItem = forwardRef((props, ref) => {
  const { text, icon, isDefaultSelected, onPress } = props;

  const iconElement = icon && (
    <Icon
      data-testid="multiselect-filter-data-icon"
      icon={icon}
      color={isDefaultSelected ? 'neutral.10' : 'active'}
      size={13}
    />
  );

  return (
    <Box
      data-testid="multiselect-filter-item"
      isRow
      ref={ref}
    >
      <Text variant="multiselectFilterItem">
        {text}
      </Text>
      {iconElement && (isDefaultSelected
        ? iconElement
        : (
          <IconButton sx={{ width: 13, height: 13, alignSelf: 'auto', '& path': { fill: 'inherit' } }} onPress={onPress}>
            {iconElement}
          </IconButton>
        )
      )}
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
  /**
   * Whether the element is default selected
   * and has to use Icon element instead of IconButton
   */
  isDefaultSelected: PropTypes.bool,
  /**
   * Handler that is called at the press on icon button
   */
  onPress: PropTypes.func,
};

MultiselectFilterItem.displayName = 'MultiselectFilterItem';
export default MultiselectFilterItem;
