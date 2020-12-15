import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Box from '../Box/Box';

const PageHeader = forwardRef((props, ref) => {
  const {
    title,
    children,
    ...others
  } = props;

  return (
    <Box isRow justifyContent="space-between" role="heading" aria-level="1" ref={ref} {...others}>
      <Text variant="title" mb="md">
        {title}
      </Text>
      {children}
    </Box>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;

PageHeader.propTypes = {
  /** Title for the Page Header */
  title: PropTypes.string,
};
