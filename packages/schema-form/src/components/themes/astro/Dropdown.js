import React from 'react';
import PropTypes from 'prop-types';
import { SelectField, Item } from '@pingux/astro';

const Dropdown = ({ options, ...props }) => {
  const items = options.map((option) => (
    <Item key={option.value}>{option.label}</Item>
  ));

  return (
    <SelectField {...props}>
      {items}
    </SelectField>
  );
};

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
