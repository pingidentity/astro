import React, { forwardRef } from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import PropTypes from 'prop-types';

import { Box, Icon, IconButton, Text } from '../..';

const PageHeader = forwardRef(({
  buttonProps,
  children,
  title,
  ...other
}, ref) => {
  const sx = {
    wrapper: {
      align: 'center',
      mb: 'xs',
    },

    titleText: {
      fontSize: 'xx',
      fontWeight: '3',
      fontColor: 'text.primary',
    },

    description: {
      fontSize: 'sm',
      color: 'text.secondary',
      fontWeight: '0',
      width: '800px',
      ' > a': {
        fontSize: 'sm',
      },
    },
  };

  const renderButton = buttonProps && (
    <IconButton
      aria-label="icon button"
      ml="sm"
      variant="inverted"
      {...buttonProps}
    >
      <Icon
        icon={PlusIcon}
        size="sm"
      />
    </IconButton>
  );

  return (
    <>
      <Box
        isRow
        sx={sx.wrapper}
        role="heading"
        aria-level="1"
        {...other}
        ref={ref}
      >
        <Text
          sx={sx.titleText}
          as="h1"
        >
          {title}
        </Text>
        {renderButton}
      </Box>
      <Text sx={sx.description}>{children}</Text>
    </>
  );
});

PageHeader.propTypes = {
  /** If present, this string will render at the top of the section */
  title: PropTypes.string,
  /** Props object that is spread into the Button element. */
  buttonProps: PropTypes.shape({}),
};

export default PageHeader;
