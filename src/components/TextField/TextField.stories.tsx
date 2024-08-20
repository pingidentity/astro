import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import isEmpty from 'lodash/isEmpty';
import { ThemeUICSSObject } from 'theme-ui';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { Box, TextField } from '../../index';
import { TextFieldProps } from '../../types';
import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';
import CopyButton from '../CopyText/CopyButton';

import TextFieldReadme from './TextField.mdx';

export default {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    docs: {
      page: () => (
        <>
          <TextFieldReadme />
          <DocsLayout />
        </>
      ),
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
    },
    label: {
      control: { type: 'text' },
    },
    variant: {
      control: {
        type: 'text',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    labelMode: Object.values(labelModes)[0],
  },
} as Meta;

export const Default: StoryFn<TextFieldProps> = ({ variant, ...args }: TextFieldProps) => (
  <TextField
    id="default-id"
    name="custom-name"
    label="Example Label"
    {...variant && { controlProps: { variant } }}
    {...args}
  />
);

export const SmallVariant: StoryFn<TextFieldProps> = () => (
  <TextField
    id="small-variant-id"
    name="custom-name"
    label="Example Label"
    controlProps={{ variant: 'input.small' }}
  />
);

export const FloatLabel: StoryFn<TextFieldProps> = () => (
  <TextField
    label="Example Label"
    labelMode="float"
  />
);

// Added to bypass color contrast issue
FloatLabel.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const LeftLabel: StoryFn<TextFieldProps> = () => (
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

export const Controlled: StoryFn<TextFieldProps> = () => {
  const [value, setValue] = useState('');

  return (
    <TextField
      label="Example Label"
      onChange={e => setValue((e.target as HTMLInputElement).value)}
      value={value}
    />
  );
};

export const Password: StoryFn<TextFieldProps> = () => (
  <TextField
    label="Example Label"
    type="password"
  />
);

export const Disabled: StoryFn<TextFieldProps> = () => (
  <TextField
    isDisabled
    label="Example Label"
  />
);
export const ReadOnly: StoryFn<TextFieldProps> = () => (
  <TextField
    isReadOnly
    label="Example Label"
    value="This is read only"
  />
);

export const Required: StoryFn<TextFieldProps> = () => (
  <TextField
    isRequired
    label="Example Label"
  />
);

export const DynamicRequired: StoryFn<TextFieldProps> = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      isRequired={isEmpty(value)} // isEmpty from lodash
      label="Example Label"
      onChange={e => setValue((e.target as HTMLInputElement).value)}
    />
  );
};

export const Error: StoryFn<TextFieldProps> = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);

export const Success: StoryFn<TextFieldProps> = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="success"
  />
);

export const Warning: StoryFn<TextFieldProps> = () => (
  <TextField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="warning"
  />
);

export const WithHelpHint: StoryFn<TextFieldProps> = () => (
  <TextField
    id="with-help-hint-id"
    name="custom-name"
    hintText="Example Hint"
    label="Example Label"
  />
);

export const WithHelpHintCustomWidth: StoryFn<TextFieldProps> = () => (
  <TextField
    id="with-help-hint-id"
    name="custom-name"
    hintText="Example Hint"
    label="Example Label"
    helpHintProps={{ width: '300px' }}
  />
);

// Added to bypass color contrast issue
WithHelpHintCustomWidth.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithoutStatusIndicator: StoryFn<TextFieldProps> = () => (
  <TextField
    label="Example Label"
    hasNoStatusIndicator
  />
);

export const MaxLength: StoryFn<TextFieldProps> = () => (
  <TextField
    label="Example label"
    maxLength={9}
  />
);

export const WithSlots: StoryFn<TextFieldProps> = () => {
  const [addressesValue, setAddressesValue] = useState(
    "[{ 'type': 'work', 'streetAddress': 'San Antonio MI 47096' },{ 'type': 'home', 'streetAddress': 'Santa Rosa MN 98804' }]",
  );
  const [jsonValue, setJsonValue] = useState(
    "[{ 'status': 'inactive', 'subject': 'example@pingidentity.com' },{ 'status': 'active', 'subject': 'john@pingidentity.com' }]",
  );
  const copyAddressesToClipboard = useCopyToClipboard(addressesValue);
  const copyJsonToClipboard = useCopyToClipboard(jsonValue);
  const buttonSx: ThemeUICSSObject = {
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
        onChange={e => setAddressesValue((e.target as HTMLInputElement).value)}
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
        onChange={e => setJsonValue((e.target as HTMLInputElement).value)}
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
