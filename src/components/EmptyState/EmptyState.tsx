import React, { forwardRef } from 'react';
import ControlPointDuplicateIcon from '@pingux/mdi-react/ControlPointDuplicateIcon';

import { Box, Button, Icon, Text } from '../..';
import { EmptyStateProps } from '../../types';

const displayName = 'EmptyState';

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>((props, ref) => {
  const {
    icon = ControlPointDuplicateIcon,
    heading = 'No items exist',
    description,
    children,
    buttonLabel,
    onButtonPress,
    buttonProps,
    headerProps,
    iconProps,
    ...others
  } = props;

  return (
    <Box
      ref={ref}
      variant="emptyState.container"
      {...others}
    >
      <Icon
        icon={icon}
        size="icon-600"
        title={{ name: 'Empty state icon' }}
        sx={{
          color: 'font-light',
          opacity: '20%',
        }}
        {...iconProps}
      />
      <Text
        as="h4"
        variant="h4"
        {...headerProps}
      >
        {heading}
      </Text>
      {description && (
        <Text>{description}</Text>
      )}
      {children || (buttonLabel && onButtonPress && (
        <Button
          variant="primaryWithIcon"
          onPress={onButtonPress}
          sx={{ mt: 'md' }}
          {...buttonProps}
        >
          <Icon
            icon="add"
            size="sm"
            title={{ name: 'Plus Icon' }}
            mr="sm"
          />
          {buttonLabel}
        </Button>
      ))}
    </Box>
  );
});

EmptyState.displayName = displayName;

export default EmptyState;
