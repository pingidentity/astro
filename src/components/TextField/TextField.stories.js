import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import TextField from '.';
import Box from '../Box';

export default {
  title: 'Form/TextField',
  component: TextField,
};

export const Default = () => (
  <TextField
    id="custom-id"
    name="custom-name"
    label="Example Label"
  />
);

export const SmallVariant = () => (
  <TextField
    id="custom-id"
    name="custom-name"
    label="Example Label"
    controlProps={{ variant: 'input.small' }}
  />
);

export const FloatLabel = () => (
  <TextField
    label="Example Label"
    labelMode="float"
  />
);

export const LeftLabel = () => (
  <Box gap="xl" width="fit-content">
    <TextField
      label="Example Label"
      labelMode="left"
    />

    <TextField
      status="error"
      helperText="Here is some helpful text..."
      label="Example Label"
      labelMode="left"
    />
  </Box>
);

export const Controlled = () => {
  const [value, setValue] = useState('');

  return (
    <TextField
      label="Example Label"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Password = () => (
  <TextField
    label="Example Label"
    type="password"
  />
);

export const Disabled = () => (
  <TextField
    isDisabled
    label="Example Label"
  />
);
export const ReadOnly = () => (
  <TextField
    isReadOnly
    label="Example Label"
    value="This is read only"
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
      onChange={e => setValue(e.target.value)}
    />
  );
};

export const Error = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);

export const Success = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="success"
  />
);

export const Warning = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="warning"
  />
);
