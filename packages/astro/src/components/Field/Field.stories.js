import React from 'react';
import Field from '.';
import Input from '../Input';

export default {
  title: 'Field',
  component: Field,
};

export const WithInput = () => (
  <Field
    id="test"
    label="Hi, this is a label"
    render={props => <Input {...props} />}
  />
);

export const WithSelect = () => (
  <Field
    label="Hi, this is a label"
    render={props => (
      <select {...props}>
        <option value="">Select an option</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    )}
  />
);
