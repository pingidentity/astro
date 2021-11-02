import React, { useState } from 'react';
import TextAreaField from '.';
import Box from '../Box';
import statuses from '../../utils/devUtils/constants/statuses';
import { modes as labelModes } from '../Label/constants';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example Label',
    },
    labelMode: {
      control: {
        type: 'select',
        options: Object.values(labelModes),
      },
      defaultValue: Object.values(labelModes)[0],
    },
    defaultValue: {},
    placeholder: {},
    name: {},
    helperText: {
      control: {
        type: 'text',
      },
    },
    hintText: {
      control: {
        type: 'text',
      },
    },
    rows: {},
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    isDisabled: {},
    isRequired: {},
    isReadOnly: {},
    hasAutoFocus: {},
    isUnresizable: {},
    id: {},
    autocomplete: {},
    className: {},
    containerProps: {},
    labelProps: {},
    controlProps: {},
    value: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = args => (
  <TextAreaField
    {...args}
  />
);

export const FloatLabel = () => (
  <TextAreaField
    label="Example label"
    labelMode="float"
  />
);

export const LeftLabel = () => (
  <Box gap="xl" width="fit-content">
    <TextAreaField
      label="Example label"
      labelMode="left"
    />

    <TextAreaField
      label="Example label that is much longer than the previous one"
      labelMode="left"
      status="error"
    />

    <TextAreaField
      label="Example label with set width"
      labelMode="left"
      containerProps={{ sx: { gridTemplateColumns: '120px auto' } }}
    />
  </Box>
);

LeftLabel.parameters = {
  docs: {
    description: {
      story: 'Users are able to override the default 40% column width when using left label by providing a new gridTemplatesColumn value, as shown in the example below.',
    },
  },
};

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

export const WithoutStatusIndicator = () => (
  <TextAreaField
    label="Example Label"
    hasNoStatusIndicator
  />
);

export const MaxLength = () => (
  <TextAreaField
    label="Example label"
    maxLength={9}
  />
);
