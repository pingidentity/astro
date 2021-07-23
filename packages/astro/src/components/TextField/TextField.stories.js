import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import TextField from '.';
import { modes as labelModes } from '../Label/constants';
import statuses from '../../utils/devUtils/constants/statuses.js';

export default {
  title: 'Form/TextField',
  component: TextField,
  argTypes: {
    labelMode: {
      control: {
        type: 'select',
        options: Object.values(labelModes),
      },
      defaultValue: Object.values(labelModes)[0],
    },
    variant: {
      control: {
        type: 'text',
      },
    },
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
  },
};

export const Default = ({ variant, ...args }) => (
  <TextField
    id="custom-id"
    name="custom-name"
    label="Example Label"
    {...variant && { controlProps: { variant } }}
    {...args}
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
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    labelMode="left"
  />
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

export const WithoutStatusIndicator = () => (
  <TextField
    label="Example Label"
    hasNoStatusIndicator
  />
);
