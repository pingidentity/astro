import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxField } from '@pingux/astro';

const Checkbox = ({
  controlProps,
  labelProps,
  label,
  isDisabled,
  ...props
}) => (
  <CheckboxField
    controlProps={controlProps}
    labelProps={labelProps}
    label={label}
    isDisabled={isDisabled}
    {...props}
  >
    {label}
  </CheckboxField>
);

Checkbox.propTypes = {
  controlProps: PropTypes.shape({}),
  labelProps: PropTypes.shape({
    variant: PropTypes.string,
  }),
  /** The label for the element. */
  label: PropTypes.node.isRequired,
  /** Whether the control and label are disabled. */
  isDisabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  controlProps: {},
  labelProps: {},
  isDisabled: false,
};

export default Checkbox;
