import React, { useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { NumberField } from '../../index';
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
      control: {
        type: 'none',
      },
    },
    step: {
      control: {
        type: 'number',
      },
    },
    defaultValue: {
      control: {
        type: 'none',
      },
    },
    formatOptions: {
      control: {
        type: 'none',
      },
    },
    placeholder: {
      control: {
        type: 'string',
      },
    },
    decrementAriaLabel: {
      control: {
        type: 'none',
      },
    },
    incrementAriaLabel: {
      control: {
        type: 'none',
      },
    },
    minValue: {
      control: {
        type: 'none',
      },
    },
    maxValue: {
      control: {
        type: 'none',
      },
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
};

export const Default = args => <NumberField {...args} />;

export const Decimals = args => (
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

export const ControlledState = () => {
  const [value, setValue] = useState(12);

  return <NumberField label="Controlled State" value={value} onChange={setValue} />;
};

export const CurrencyValues = args => (
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

export const DisabledAndReadOnly = args => (
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

export const MinimumAndMaximumValues = args => (
  <NumberField {...args} label="Enter your age" minValue={0} />
);

export const StepValues = args => (
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

export const WithHelperText = args => (
  <NumberField {...args} label="Helper Text" defaultValue={88} helperText="Useful Text" />
);

export const Units = args => (
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
