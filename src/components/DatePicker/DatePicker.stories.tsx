import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { chain } from '@react-aria/utils';
import { Meta, StoryFn } from '@storybook/react-vite';
import { actions } from 'storybook/actions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button } from '../../index';
import type { DatePickerProps, DateValue } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import DatePicker from './DatePicker';
import DatePickerReadme from './DatePicker.mdx';

type DatePickerStoryArgs = DatePickerProps & Pick<React.AriaAttributes, 'aria-label'>;

export default {
  title: 'Form/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <DatePickerReadme />
          <DocsLayout />
        </>
      ),
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
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
    label: 'Example Label',
    onChange: () => undefined,
    'aria-label': 'Date Picker',
  },
} satisfies Meta<typeof DatePicker>;

export const Default: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker
    {...args}
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.default,
  },
};

export const DefaultValue: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} defaultValue="2030-01-15" />
);

DefaultValue.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.defaultValue,
  },
};

export const Controlled: StoryFn<DatePickerStoryArgs> = args => {
  const [date, setDate] = useState<DateValue | null>(null);

  return (
    <>
      <DatePicker {...args} value={date ?? undefined} onChange={chain(setDate, actions('onChange'))} />
      <Box isRow mt="sm">
        <Button mr="sm" onPress={() => setDate(parseDate('2022-08-10'))}>Change value</Button>
        <Button onPress={() => setDate(null)}>Clear</Button>
      </Box>
    </>
  );
};

export const Disabled: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} isDisabled />
);

Disabled.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.disabled,
  },
};

export const ReadOnly: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} isReadOnly />
);

ReadOnly.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.readOnly,
  },
};

export const UnavailableDates: StoryFn<DatePickerStoryArgs> = args => {
  const unavailableRanges: [string, string][] = [
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

UnavailableDates.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.unavailableDates,
  },
};

export const MinimumDate: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} defaultValue="2030-01-15" minValue="2030-01-15" />
);

MinimumDate.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.minimumDate,
  },
};

export const MaximumDate: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} defaultValue="2030-01-15" maxValue="2030-01-15" />
);

MaximumDate.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.maximumDate,
  },
};

export const Required: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} isRequired />
);

Required.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.required,
  },
};

export const FormatHelperText: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} hasFormatHelpText />
);

FormatHelperText.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.formatHelperText,
  },
};

export const DefaultOpen: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} isDefaultOpen defaultValue="2030-01-15" />
);

DefaultOpen.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.defaultOpen,
  },
};

export const Error: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker {...args} status="error" helperText="Here is some helpful text..." />
);

Error.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.datePicker.error,
  },
};

export const CustomWidth: StoryFn<DatePickerStoryArgs> = args => (
  <DatePicker
    {...args}
    fieldControlProps={{
      sx: {
        width: '500px',
      },
    }}
    calendarWrapperProps={{
      sx: {
        maxWidth: '500px',
        width: '400px',
        '&  tr': {
          gap: '20px',
        },
      },
    }}
  />
);
