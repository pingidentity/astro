import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import TextField from '.';
import { Box } from '../../';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { modes as labelModes } from '../Label/constants';
import CopyButton from '../CopyText/CopyButton';
import statuses from '../../utils/devUtils/constants/statuses.js';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
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
    ...ariaAttributeBaseArgTypes,
  },
};

export const Default = ({ variant, ...args }) => (
  <TextField
    id="default-id"
    name="custom-name"
    label="Example Label"
    {...variant && { controlProps: { variant } }}
    {...args}
  />
);

export const SmallVariant = () => (
  <TextField
    id="small-variant-id"
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
  <Box gap="xl" width="100%">
    <TextField
      helperText="Here is some helpful text..."
      label="Example Label"
      labelMode="left"
    />
    <TextField
      label="Example Label that is much longer than the previous one"
      labelMode="left"
    />
    <TextField
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

export const WithHelpHint = () => (
  <TextField
    id="with-help-hint-id"
    name="custom-name"
    hintText="Example Hint"
    label="Example Label"
  />
);

export const WithoutStatusIndicator = () => (
  <TextField
    label="Example Label"
    hasNoStatusIndicator
  />
);

export const MaxLength = () => (
  <TextField
    label="Example label"
    maxLength={9}
  />
);

export const WithSlots = () => {
  const [addressesValue, setAddressesValue] = useState(
    "[{ 'type': 'work', 'streetAddress': 'San Antonio MI 47096' },{ 'type': 'home', 'streetAddress': 'Santa Rosa MN 98804' }]",
  );
  const [jsonValue, setJsonValue] = useState(
    "[{ 'status': 'inactive', 'subject': 'example@pingidentity.com' },{ 'status': 'active', 'subject': 'john@pingidentity.com' }]",
  );
  const copyAddressesToClipboard = useCopyToClipboard(addressesValue);
  const copyJsonToClipboard = useCopyToClipboard(jsonValue);
  const buttonSx = {
    position: 'absolute',
    right: 0,
    top: '5px',
    height: '32px',
  };
  const containerSx = { sx: { '& input': { paddingRight: '40px' } } };

  return (
    <>
      <TextField
        label="Multiple Addresses"
        labelMode="float"
        onChange={e => setAddressesValue(e.target.value)}
        value={addressesValue}
        containerProps={containerSx}
        slots={{
          inContainer: (
            <CopyButton
              onPress={copyAddressesToClipboard}
              sx={buttonSx}
              iconProps={{ sx: { path: { fill: 'active' } } }}
            />
          ),
        }}
        mb={30}
      />
      <TextField
        label="Example JSON"
        labelMode="float"
        onChange={e => setJsonValue(e.target.value)}
        value={jsonValue}
        containerProps={containerSx}
        slots={{
          inContainer: (
            <CopyButton
              onPress={copyJsonToClipboard}
              sx={buttonSx}
              iconProps={{ sx: { path: { fill: 'active' } } }}
            />
          ),
        }}
      />
    </>
  );
};
