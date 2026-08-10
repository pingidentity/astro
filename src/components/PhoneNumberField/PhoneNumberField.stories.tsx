import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { PhoneNumberField } from '../../index';
import { PhoneNumberFieldProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import PhoneNumberFieldReadme from './PhoneNumberField.mdx';

export default {
  title: 'Form/PhoneNumberField',
  component: PhoneNumberField,
  parameters: {
    docs: {
      page: () => (
        <>
          <PhoneNumberFieldReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
} as Meta;

export const Default: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    defaultCountryValue="US"
    value="2025550177"
    {...args}
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.phoneNumberField.default,
  },
};

export const Controlled: StoryFn<PhoneNumberFieldProps> = () => {
  const [value, setValue] = useState('2025550177');
  const [countryValue, setCountryValue] = useState<string | undefined>('US');

  return (
    <PhoneNumberField
      label="Phone Number"
      value={value}
      onChange={e => setValue((e.target as HTMLInputElement).value)}
      countryValue={countryValue}
      onCountryChange={key => setCountryValue(key)}
    />
  );
};

export const Disabled: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    isDisabled
    {...args}
  />
);

export const ReadOnly: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    isReadOnly
    defaultCountryValue="US"
    value="2025550177"
    {...args}
  />
);

export const Required: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    isRequired
    {...args}
  />
);

export const Error: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    status="error"
    helperText="Please enter a valid phone number."
    {...args}
  />
);

export const Warning: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    status="warning"
    helperText="Double-check the country code."
    {...args}
  />
);
Warning.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Success: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    status="success"
    helperText="Phone number verified."
    {...args}
  />
);

export const WithHelpHint: StoryFn<PhoneNumberFieldProps> = args => (
  <PhoneNumberField
    label="Phone Number"
    hintText="Include country code for international numbers."
    helpHintProps={{ direction: 'right' }}
    {...args}
  />
);
