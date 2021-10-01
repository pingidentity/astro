import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@pingux/astro';

const FieldTemplate = (props) => {
  const {
    children,
  } = props;

  return (
    <Box mt="md">
      {children}
    </Box>
  );
};

FieldTemplate.propTypes = {
  children: PropTypes.node,
};

FieldTemplate.defaultProps = {
  children: undefined,
};

export default FieldTemplate;
