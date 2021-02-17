import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@pingux/astro';

const FieldLabel = (props) => {
  const { children } = props;

  return (
    <Label>
      {children}
    </Label>
  );
};

FieldLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

FieldLabel.defaultProps = {
  children: undefined,
};

export default FieldLabel;
