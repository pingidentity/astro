import React from 'react';
import PropTypes from 'prop-types';
import Heading from '@pingux/end-user/components/Heading';

const FieldLabel = (props) => {
  const { children } = props;

  return (
    <Heading level={4}>
      {children}
    </Heading>
  );
};

FieldLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

FieldLabel.defaultProps = {
  children: undefined,
};

export default FieldLabel;
