import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { NumberField } from '../../index';
import { NumberFieldProps } from '../../types';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import NumberFieldReadme from './NumberField.mdx';

export default {
  title: 'Form/NumberField',
  component: NumberField,
  parameters: {
    docs: {
      page: () => (
        <>
          <NumberFieldReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    hintText: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: false,
    },
    step: {
      control: {
        type: 'number',
      },
    },
    defaultValue: {
      control: false,
    },
    formatOptions: {
      control: false,
    },
    placeholder: {
      control: {
        type: 'string',
      },
    },
    decrementAriaLabel: {
      control: false,
    },
    incrementAriaLabel: {
      control: false,
    },
    minValue: {
      control: false,
    },
    maxValue: {
      control: false,
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'Example Label',
    step: 1,
    defaultValue: 17,
    decrementAriaLabel: 'decrement-button',
    incrementAriaLabel: 'increment-button',
  },
} satisfies Meta<typeof NumberField>;

export const Default: StoryFn<NumberFieldProps> = args => <NumberField {...args} />;

export const Decimals: StoryFn<NumberFieldProps> = args => (
  <NumberField
    {...args}
    label="Adjust exposure"
    defaultValue={0}
    formatOptions={{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }}
  />
);

export const ControlledState: StoryFn<NumberFieldProps> = () => {
  const [value, setValue] = useState(12);

  return <NumberField label="Controlled State" value={value} onChange={setValue} />;
};

export const CurrencyValues: StoryFn<NumberFieldProps> = args => (
  <NumberField
    {...args}
    label="Transaction amount"
    defaultValue={45}
    formatOptions={{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }}
  />
);

export const DisabledAndReadOnly: StoryFn<NumberFieldProps> = args => (
  <>
    <NumberField {...args} label="Disabled" isDisabled value={25} />
    <NumberField
      {...args}
      label="Read only"
      isReadOnly
      value={32}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
  </>
);

export const MinimumAndMaximumValues: StoryFn<NumberFieldProps> = args => (
  <NumberField {...args} label="Enter your age" minValue={0} />
);

export const StepValues: StoryFn<NumberFieldProps> = args => (
  <>
    <NumberField {...args} label="Step" step={10} />
    <NumberField
      {...args}
      label="Step + minValue"
      minValue={2}
      step={3}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
    <NumberField
      {...args}
      label="Step + minValue + maxValue"
      minValue={2}
      maxValue={21}
      step={3}
      sx={{ marginTop: '5px' }}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
  </>
);

export const WithHelperText: StoryFn<NumberFieldProps> = args => (
  <NumberField {...args} label="Helper Text" defaultValue={88} helperText="Useful Text" />
);

export const Units: StoryFn<NumberFieldProps> = args => (
  <NumberField
    {...args}
    label="Package width"
    defaultValue={4}
    formatOptions={{
      style: 'unit',
      unit: 'inch',
      unitDisplay: 'long',
    }}
  />
);
