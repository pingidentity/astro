import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroupField, RadioField } from '@pingux/astro';

const RadioGroup = props => {
  const { controlProps, options } = props;

  return (
    <RadioGroupField
      {...controlProps}
      {...props}
    >
      {
        options.map(option => (
          <RadioField
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))
      }
    </RadioGroupField>
  );
};

RadioGroup.propTypes = {
  /**
   * Handler that is called when the value changes.
   *
   * `(newValue) => void`
   */
  onChange: PropTypes.func,
  /** The label for the element. */
  label: PropTypes.node,
  /** Whether the control and label are disabled. */
  isDisabled: PropTypes.bool,
  /** The list of options to display. */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.string,
  })),
  controlProps: PropTypes.shape({}),
};

RadioGroup.defaultProps = {
  onChange: undefined,
  options: [],
  label: '',
  isDisabled: false,
  controlProps: {},
};

export default RadioGroup;
