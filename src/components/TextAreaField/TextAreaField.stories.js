import React, { useState } from 'react';
import TextAreaField from '.';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
};

export const Default = () => (
  <TextAreaField
    label="Example label"
  />
);

export const FloatLabel = () => (
  <TextAreaField
    label="Example label"
    labelMode="float"
  />
);

export const LeftLabel = () => (
  <TextAreaField
    label="Example label"
    labelMode="left"
  />
);

export const Controlled = () => {
  const [value, setValue] = useState();

  return (
    <TextAreaField
      label="Example Label"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Disabled = () => (
  <TextAreaField
    isDisabled
    label="Example Label"
    value="This is disabled"
  />
);
export const ReadOnly = () => (
  <TextAreaField
    isReadOnly
    label="Example Label"
    value="This is read only"
  />
);

export const Required = () => (
  <TextAreaField
    isRequired
    label="Example Label"
  />
);

export const Rows = () => (
  <TextAreaField
    label="Example label"
    rows={5}
  />
);

export const Unresizable = () => (
  <TextAreaField
    isUnresizable
    label="Example label"
  />
);

export const Error = () => (
  <TextAreaField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);

export const Success = () => (
  <TextAreaField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="success"
  />
);

export const Warning = () => (
  <TextAreaField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="warning"
  />
);
