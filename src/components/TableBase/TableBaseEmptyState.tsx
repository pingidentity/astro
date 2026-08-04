import React, { forwardRef } from 'react';
import ControlPointDuplicateIcon from '@pingux/mdi-react/ControlPointDuplicateIcon';

import { Box, Button, Icon, Text } from '../..';
import { TableBaseEmptyStateProps } from '../../types/tableBase';

const TableBaseEmptyState = forwardRef<HTMLDivElement, TableBaseEmptyStateProps>((props, ref) => {
  const {
    defaultIcon = ControlPointDuplicateIcon,
    headerLabel = 'No items exist',
    descriptionLabel = 'Take action by doing x, y, z',
    addButtonLabel,
    onAddButtonPress,
    ...others
  } = props;

  return (
    <Box
      ref={ref}
      isRow={false}
      alignItems="center"
      justifyContent="center"
      gap="sm"
      py="lg"
      {...others}
    >
      <Icon
        icon={defaultIcon}
        color="text.secondary"
        size={60}
        title={{ name: 'Empty state icon' }}
        sx={{ opacity: 0.2 }}
      />
      <Text variant="H4" as="h4" textAlign="center">
        {headerLabel}
      </Text>
      <Text textAlign="center" color="font.base">
        {descriptionLabel}
      </Text>
      {addButtonLabel && onAddButtonPress && (
        <Button
          variant="primaryWithIcon"
          mt="sm"
          sx={{ borderRadius: '50px' }}
          onPress={onAddButtonPress}
        >
          <Icon
            icon="add"
            color="white"
            size="sm"
            title={{ name: 'Plus Icon' }}
            mr="xs"
          />
          {addButtonLabel}
        </Button>
      )}
    </Box>
  );
});

TableBaseEmptyState.displayName = 'TableBaseEmptyState';

export default TableBaseEmptyState;
