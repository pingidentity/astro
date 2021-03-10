import React from 'react';
import PropTypes from 'prop-types';
import { DropdownField } from '@pingux/astro';

const Dropdown = ({ options, ...props }) => (
  <DropdownField {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </DropdownField>
);

Dropdown.propTypes = {
  controlProps: PropTypes.shape({
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.string,
  })),
};

Dropdown.defaultProps = {
  options: [],
};

export default Dropdown;
