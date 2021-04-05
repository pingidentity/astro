import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxField } from '@pingux/astro';

const Checkbox = ({
  controlProps,
  label,
  isDisabled,
  ...props
}) => (
  <CheckboxField
    {...props}
    onChange={controlProps.onChange}
    isSelected={controlProps.isSelected}
    isDisabled={isDisabled}
    label={label}
  />
);

Checkbox.propTypes = {
  controlProps: PropTypes.shape({
    onChange: PropTypes.func,
    isSelected: PropTypes.bool,
  }),
  labelProps: PropTypes.shape({
    variant: PropTypes.string,
  }),
  /** The label for the element. */
  label: PropTypes.node,
  /** Whether the control and label are disabled. */
  isDisabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  controlProps: {},
  labelProps: {},
  label: '',
  isDisabled: false,
};

export default Checkbox;
