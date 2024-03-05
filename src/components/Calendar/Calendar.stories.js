import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import Calendar from './Calendar';
import CalendarReadme from './Calendar.mdx';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [withDesign],
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <CalendarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    customWeekDays: {
      control: {
        type: 'array',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
    defaultValue: {
      control: {
        type: 'text',
      },
    },
    hasAutoFocus: {
      control: {
        type: 'boolean',
      },
    },
    id: {
      control: {
        type: 'text',
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
      control: {
        type: 'func',
      },
      action: 'change',
    },
    onFocusChange: {
      control: {
        type: 'func',
      },
      action: 'focus change',
    },
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    hasAutoFocus: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    onChange: null,
    onFocusChange: null,
    defaultFocusedValue: '2030-01-15',
  },
};

export const Default = args => (
  <Calendar {...args} aria-label="calendar-default" />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.default,
  },
};

export const DefaultValue = () => (
  <Calendar aria-label="calendar-with-default-value" defaultValue="2030-01-15" />
);

DefaultValue.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.defaultValue,
  },
};

export const Disabled = args => (
  <Calendar {...args} aria-label="calendar-component-disabled" isDisabled />
);

Disabled.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.disabled,
  },
};

export const UnavailableDates = () => {
  const unavailableRanges = [
    ['2030-07-28', '2030-08-03'],
    ['2030-08-11', '2030-08-17'],
    ['2030-08-25', '2030-08-31'],

  ];
  // This function is run against each date in the calendar
  const isDateUnavailable = date => unavailableRanges.some(
    interval => date.compare(parseDate(interval[0]),
    ) >= 0 && date.compare(parseDate(interval[1])) <= 0,
  );

  return (
    <Calendar
      aria-label="calendar-component-unavailable-dates"
      defaultValue="2030-08-07"
      isDateUnavailable={isDateUnavailable}
    />
  );
};

UnavailableDates.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.unavailableDates,
  },
};

export const MinimumDate = () => (
  <Calendar
    aria-label="calendar-component-min-date"
    minValue="2030-01-15"
    defaultValue="2030-01-15"
  />
);

MinimumDate.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.minimumDate,
  },
};

export const MaximumDate = () => (
  <Calendar
    aria-label="calendar-component-max-date"
    maxValue="2030-01-15"
    defaultValue="2030-01-15"
  />
);

MaximumDate.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.calendar.maximumDate,
  },
};

export const Controlled = args => {
  const [date, setDate] = useState(null);
  return (
    <Calendar
      {...args}
      aria-label="calendar-component-controlled"
      value={date}
      onChange={setDate}
    />
  );
};
