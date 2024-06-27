import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RangeCalendar } from '../../index';
import { RangeCalendarProps, StringOrRangeValue } from '../../types';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import RangeCalendarReadme from './RangeCalendar.mdx';

export default {
  title: 'Experimental/RangeCalendar',
  component: RangeCalendar,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    source: {
      type: 'code',
    },
    docs: {
      page: () => (
        <>
          <RangeCalendarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    defaultFocusedValue: '2030-01-15',
  },
};

export const Default: StoryFn<RangeCalendarProps> = (
  args: RangeCalendarProps,
) => {
  return <RangeCalendar {...args} aria-label="range-calendar" />;
};

export const DefaultValue: StoryFn<RangeCalendarProps> = () => {
  return (
    <RangeCalendar
      aria-label="calendar-with-default-vaue"
      defaultValue={{
        start: '2030-01-15',
        end: '2030-01-22',
      }}
    />
  );
};

export const Disabled: StoryFn<RangeCalendarProps> = (
  args: RangeCalendarProps,
) => (
  <RangeCalendar
    {...args}
    aria-label="calendar--range-component-disabled"
    isDisabled
  />
);

export const UnavailableDates: StoryFn<RangeCalendarProps> = () => {
  const unavailableRanges = [
    ['2030-07-28', '2030-08-03'],
    ['2030-08-11', '2030-08-17'],
    ['2030-08-25', '2030-08-31'],

  ];

  const isDateUnavailable = date => unavailableRanges.some(
    interval => date.compare(parseDate(interval[0]),
    ) >= 0 && date.compare(parseDate(interval[1])) <= 0,
  );

  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: '2030-08-07', end: '2030-08-09' }}
      isDateUnavailable={isDateUnavailable}
    />
  );
};

export const MinimumDate: StoryFn<RangeCalendarProps> = () => {
  return (
    <RangeCalendar
      aria-label="range-calendar-component-min-date"
      minValue="2030-01-15"
      defaultValue={{ start: '2030-01-15', end: '2030-01-20' }}


    />
  );
};

export const MaximumDate: StoryFn<RangeCalendarProps> = () => {
  return (
    <RangeCalendar
      aria-label="range-calendar-component-max-date"
      defaultValue={{ start: '2030-01-12', end: '2030-01-15' }}
      maxValue="2030-01-17"

    />
  );
};

export const Controlled: StoryFn<RangeCalendarProps> = (
  args: RangeCalendarProps,
) => {
  const [range, setRange] = useState<StringOrRangeValue>({
    start: '2030-01-12',
    end: '2030-01-15',
  });

  return (
    <RangeCalendar
      {...args}
      aria-label="calendar-component-controlled"
      value={range}
      onChange={setRange}
    />
  );
};
