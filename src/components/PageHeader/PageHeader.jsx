import React, { forwardRef } from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import PropTypes from 'prop-types';

import { useGetTheme } from '../../hooks';
import { Box, Icon, IconButton, Text } from '../../index';

const PageHeader = forwardRef(({
  buttonProps,
  children,
  slots,
  title,
  ...other
}, ref) => {
  const linkStyles = {
    ' > a': { fontSize: 'sm' },
  };

  const { pageHeaderTitleMargin, pageHeaderAddIconMargin, pageHeaderAddIconSize } = useGetTheme();

  const renderButton = buttonProps && (
    <IconButton
      aria-label="icon button"
      mx={pageHeaderAddIconMargin}
      variant="inverted"
      {...buttonProps}
    >
      <Icon icon={PlusIcon} size={pageHeaderAddIconSize} />
    </IconButton>
  );

  return (
    <Box ref={ref} {...other}>
      <Box isRow mb={pageHeaderTitleMargin} alignItems="center">
        <Text as="h1" variant="pageHeaderTitle">
          {title}
        </Text>
        {renderButton}
        {slots?.rightOfTitle}
      </Box>
      <Text variant="pageHeaderBody" sx={linkStyles}>{children}</Text>
    </Box>
  );
});

PageHeader.propTypes = {
  /** If present, this string will be rendered as the title */
  title: PropTypes.string,
  /** Props object that is spread into the Button element. */
  buttonProps: PropTypes.shape({}),
  /** Slots for rendering custom elements within the PageHeader. */
  slots: PropTypes.shape({
    rightOfTitle: PropTypes.node,
  }),
};

export default PageHeader;
