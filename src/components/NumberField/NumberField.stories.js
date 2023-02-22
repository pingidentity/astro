import React, { useState } from 'react';

import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/devUtils/props/fieldAttributes';

import NumberField from './NumberField';

export default {
  title: 'Form/NumberField',
  component: NumberField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example Label',
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
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
      defaultValue: 1,
    },
    defaultValue: {
      control: {
        type: 'none',
      },
      defaultValue: 17,
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
      defaultValue: 'decrement-button',
    },
    incrementAriaLabel: {
      control: {
        type: 'none',
      },
      defaultValue: 'increment-button',
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
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
};

export const Default = args => <NumberField {...args} />;

export const Decimals = () => (
  <NumberField
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

export const CurrencyValues = () => (
  <NumberField
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

export const DisabledAndReadOnly = () => (
  <>
    <NumberField label="Disabled" isDisabled value={25} />
    <NumberField
      label="Read only"
      isReadOnly
      value={32}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
  </>
);

export const MinimumAndMaximumValues = () => (
  <NumberField label="Enter your age" minValue={0} />
);

export const StepValues = () => (
  <>
    <NumberField label="Step" step={10} />
    <NumberField
      label="Step + minValue"
      minValue={2}
      step={3}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
    <NumberField
      label="Step + minValue + maxValue"
      minValue={2}
      maxValue={21}
      step={3}
      sx={{ marginTop: '5px' }}
      containerProps={{ sx: { marginTop: '15px' } }}
    />
  </>
);

export const WithHelperText = () => (
  <NumberField label="Helper Text" defaultValue={88} helperText="Useful Text" />
);

export const Units = () => (
  <NumberField
    label="Package width"
    defaultValue={4}
    formatOptions={{
      style: 'unit',
      unit: 'inch',
      unitDisplay: 'long',
    }}
  />
);
