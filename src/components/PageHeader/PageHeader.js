import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useDeprecationWarning } from '../../hooks';
import Box from '../Box/Box';
import Text from '../Text/Text';

/**
 * A `Page Header` is a composed component using text and icon button.
 * The component is separated from the body and appears at the top.
 * For customization,
 * please see [Page Header](./?path=/story/recipes-page-header--default) recipe docs.
 */


const PageHeader = forwardRef((props, ref) => {
  const {
    title,
    children,
    ...others
  } = props;

  useDeprecationWarning(
    'The Page Header component will be deprecated in Astro-UI 2.0.0. Use Page Header recipe instead.',
  );

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
  /** Title for the Page Header. */
  title: PropTypes.string,
};
