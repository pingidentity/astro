import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import TextField from '.';

export default {
  title: 'TextField',
  component: TextField,
};

export const Default = () => (
  <TextField
    label="Example Label"
  />
);

export const Password = () => (
  <TextField
    label="Example Label"
    labelProps={{ color: 'red' }}
    controlProps={{ type: 'password' }}
  />
);

export const Required = () => (
  <TextField
    isRequired
    label="Example Label"
  />
);

export const DynamicRequired = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      isRequired={isEmpty(value)} // isEmpty from lodash
      label="Example Label"
      controlProps={{ onChange: e => setValue(e.target.value) }}
    />
  );
};

export const Disabled = () => (
  <TextField
    isDisabled
    label="Example Label"
  />
);

export const HelperText = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);
