import React from 'react';
import PropTypes from 'prop-types';
import { SelectField, Item } from '@pingux/astro';
import _ from 'lodash';

const Dropdown = ({ options, onChange, ...props }) => {
  const items = options.map(option => (
    <Item key={option.value}>{option.label}</Item>
  ));

  return (
    <SelectField {...props} onSelectionChange={onChange}>
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
  /** Callback triggered on each change to the form data. */
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  options: [],
  onChange: _.noop,
};

export default Dropdown;
