import React, { forwardRef } from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import PropTypes from 'prop-types';

import { Box, Icon, IconButton, Text } from '../../index';

const PageHeader = forwardRef(({
  buttonProps,
  children,
  title,
  ...other
}, ref) => {
  const linkStyles = {
    ' > a': { fontSize: 'sm' },
  };

  const renderButton = buttonProps && (
    <IconButton
      aria-label="icon button"
      ml="sm"
      variant="inverted"
      {...buttonProps}
    >
      <Icon icon={PlusIcon} size="sm" />
    </IconButton>
  );

  return (
    <Box ref={ref} {...other}>
      <Box isRow mb="xs">
        <Text as="h1" variant="H1">
          {title}
        </Text>
        {renderButton}
      </Box>
      <Text variant="bodyWeak" sx={linkStyles}>{children}</Text>
    </Box>
  );
});

PageHeader.propTypes = {
  /** If present, this string will be rendered as the title */
  title: PropTypes.string,
  /** Props object that is spread into the Button element. */
  buttonProps: PropTypes.shape({}),
};

export default PageHeader;
