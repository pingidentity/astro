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
      defaultValue: false,
    },
    hasFormatHelpText: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isReadOnly: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example label',
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
      defaultValue: null,
      action: 'handleChange',
    },
    ...ariaAttributeBaseArgTypes,
  },
};

export const Default = args => (
  <DatePicker
    {...args}
  />
);

export const DefaultValue = args => (
  <DatePicker {...args} defaultValue="2022-08-10" />
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
    ['2022-07-29', '2022-08-05'],
    ['2022-08-15', '2022-08-20'],
    ['2022-08-25', '2022-08-26'],
  ];

  return (
    <DatePicker
      {...args}
      unavailableRanges={unavailableRanges}
      defaultValue="2022-08-10"
    />
  );
};

export const MinimumDate = args => (
  <DatePicker {...args} defaultValue="2022-08-17" minValue="2022-08-10" />
);

export const MaximumDate = args => (
  <DatePicker {...args} defaultValue="2022-08-03" maxValue="2022-08-10" />
);

export const Required = args => (
  <DatePicker {...args} isRequired />
);

export const FormatHelperText = args => (
  <DatePicker {...args} hasFormatHelpText />
);

export const DefaultOpen = args => (
  <DatePicker {...args} isDefaultOpen />
);

export const Error = args => (
  <DatePicker {...args} status="error" helperText="Here is some helpful text..." />
);

export const Success = args => (
  <DatePicker {...args} status="success" helperText="Here is some helpful text..." />
);
