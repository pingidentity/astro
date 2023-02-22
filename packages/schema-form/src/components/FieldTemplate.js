import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@pingux/astro';

/* istanbul ignore next */
const FieldTemplate = props => {
  const {
    children,
    hidden,
  } = props;

  return (
    <Box mt={`${hidden ? '0' : 'md'}`}>
      {children}
    </Box>
  );
};

FieldTemplate.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
};

FieldTemplate.defaultProps = {
  children: undefined,
  hidden: false,
};

export default FieldTemplate;
