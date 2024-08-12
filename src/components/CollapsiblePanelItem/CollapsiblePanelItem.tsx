import React, { forwardRef } from 'react';

import { Box, Icon, IconButton, Text } from '../../index';
import { CollapsiblePanelItemProps } from '../../types';

const CollapsiblePanelItem = forwardRef<HTMLDivElement, CollapsiblePanelItemProps>((props, ref) => {
  const { text, icon, isDefaultSelected, onPress, iconProps } = props;

  const iconElement = icon && (
    <Icon
      data-testid="collapsible-panel-data-icon"
      icon={icon}
      color={isDefaultSelected ? 'neutral.10' : 'active'}
      size={13}
      {...iconProps}
    />
  );

  return (
    <Box
      data-testid="collapsible-panel-item"
      isRow
      ref={ref}
    >
      <Text variant="variants.collapsiblePanel.itemText">
        {text}
      </Text>
      {iconElement && (isDefaultSelected
        ? iconElement
        : (
          <IconButton sx={{ width: 20, height: 20, alignSelf: 'auto', '& path': { fill: 'inherit' } }} onPress={onPress} aria-label="icon">
            {iconElement}
          </IconButton>
        )
      )}
    </Box>
  );
});

CollapsiblePanelItem.displayName = 'CollapsiblePanelItem';
export default CollapsiblePanelItem;
