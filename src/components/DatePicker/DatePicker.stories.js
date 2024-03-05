import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { chain } from '@react-aria/utils';
import { actions } from '@storybook/addon-actions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button } from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import DatePicker from './DatePicker';
import DatePickerReadme from './DatePicker.mdx';

export default {
  title: 'Form/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <DatePickerReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    defaultValue: {
      control: {
        type: 'text',
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    hasAutoFocus: {
      control: {
        type: 'boolean',
      },
    },
    hasFormatHelpText: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isReadOnly: {
      control: {
        type: 'boolean',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    maxValue: {
      control: {
        type: 'text',
      },
    },
    minValue: {
      control: {
        type: 'text',
      },
    },
    onChange: {
      action: 'handleChange',
    },
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    hasAutoFocus: false,
    hasFormatHelpText: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Example label',
    onChange: null,
  },
};

export const Default = args => (
  <DatePicker
    {...args}
  />
);

export const DefaultValue = args => (
  <DatePicker {...args} defaultValue="2030-01-15" />
);

export const Controlled = args => {
  const [date, setDate] = useState(null);

  return (
    <>
      <DatePicker {...args} value={date} onChange={chain(setDate, actions('onChange'))} />
      <Box isRow mt="sm">
        <Button mr="sm" onPress={() => setDate(parseDate('2022-08-10'))}>Change value</Button>
        <Button onPress={() => setDate(null)}>Clear</Button>
      </Box>
    </>
  );
};

export const Disabled = args => (
  <DatePicker {...args} isDisabled />
);

export const ReadOnly = args => (
  <DatePicker {...args} isReadOnly />
);

export const UnavailableDates = args => {
  const unavailableRanges = [
    ['2030-07-28', '2030-08-03'],
    ['2030-08-11', '2030-08-17'],
    ['2030-08-25', '2030-08-31'],
  ];

  return (
    <DatePicker
      {...args}
      unavailableRanges={unavailableRanges}
      defaultValue="2030-08-07"
    />
  );
};

export const MinimumDate = args => (
  <DatePicker {...args} defaultValue="2030-01-15" minValue="2030-01-15" />
);

export const MaximumDate = args => (
  <DatePicker {...args} defaultValue="2030-01-15" maxValue="2030-01-15" />
);

export const Required = args => (
  <DatePicker {...args} isRequired />
);

export const FormatHelperText = args => (
  <DatePicker {...args} hasFormatHelpText />
);

export const DefaultOpen = args => (
  <DatePicker {...args} isDefaultOpen defaultValue="2030-01-15" />
);

export const Error = args => (
  <DatePicker {...args} status="error" helperText="Here is some helpful text..." />
);

export const Success = args => (
  <DatePicker {...args} status="success" helperText="Here is some helpful text..." />
);
