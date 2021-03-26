import React from 'react';
import PropTypes from 'prop-types';
import CheckboxField from '@pingux/end-user/components/Checkbox';
import { noop } from 'lodash';

const Checkbox = ({
  onChange,
  isSelected,
  label,
  ...props
}) => (
  <CheckboxField
    {...props}
    onChange={onChange}
    checked={isSelected}
    label={label}
  />
);

Checkbox.propTypes = {
  onChange: PropTypes.func,
  isSelected: PropTypes.bool,
  /** The label for the element. */
  label: PropTypes.node,
};

Checkbox.defaultProps = {
  onChange: noop,
  isSelected: false,
  label: '',
};

export default Checkbox;
