import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';
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
      defaultValue: false,
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
      defaultValue: null,
      action: 'change',
    },
    onFocusChange: {
      control: {
        type: 'func',
      },
      defaultValue: null,
      action: 'focus change',
    },
    ...ariaAttributeBaseArgTypes,
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

export const DefaultValue = args => (
  <Calendar {...args} aria-label="calendar-with-default-value" defaultValue="2022-08-10" />
);

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

export const Disabled = args => (
  <Calendar {...args} aria-label="calendar-component-disabled" isDisabled />
);

export const ReadOnly = args => (
  <Calendar {...args} aria-label="calendar-component-readonly" isReadOnly />
);

export const UnavailableDates = args => {
  const unavailableRanges = [
    ['2022-07-29', '2022-08-05'],
    ['2022-08-15', '2022-08-20'],
    ['2022-08-25', '2022-08-26'],
  ];
  // This function is run against each date in the calendar
  const isDateUnavailable = date => unavailableRanges.some(
    interval => date.compare(parseDate(interval[0]),
    ) >= 0 && date.compare(parseDate(interval[1])) <= 0,
  );

  return (
    <Calendar
      {...args}
      aria-label="calendar-component-unavailable-dates"
      defaultValue="2022-08-10"
      isDateUnavailable={isDateUnavailable}
    />
  );
};

export const MinimumDate = args => (
  <Calendar
    {...args}
    aria-label="calendar-component-min-date"
    minValue="2022-09-10"
    defaultDate="2022-09-14"
  />
);

export const MaximumDate = args => (
  <Calendar
    {...args}
    aria-label="calendar-component-max-date"
    maxValue="2022-10-10"
    defaultValue="2022-10-05"
  />
);

export const Autofocus = args => (
  <Calendar {...args} aria-label="calendar-component" hasAutoFocus />
);
