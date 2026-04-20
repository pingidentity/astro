import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { TimeZonePicker } from '../../index';

import TimeZonePickerReadme from './TimeZonePicker.mdx';

export default {
  title: 'Form/TimeZonePicker',
  component: TimeZonePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <TimeZonePickerReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = args => <TimeZonePicker {...args} label="Default Example" />;

export const Controlled = args => {
  const [selectedTimeZone, setSelectedTimeZone] = React.useState('Pacific/Apia GMT+13:00');

  return (
    <TimeZonePicker
      {...args}
      label="Controlled Example"
      selectedKey={selectedTimeZone}
      onSelectionChange={key => setSelectedTimeZone(key)}
    />
  );
};

export const WithCustomTimeZone = args => {
  const customTimeZone = {
    '(GMT+02:00) Africa/Juba': 'Africa/Juba',
  };

  return (
    <TimeZonePicker
      {...args}
      additionalTimeZones={customTimeZone}
      label="With Custom Time Zone (Africa/Juba)"
    />
  );
};

export const UTCFormat = args => (
  <TimeZonePicker {...args} timezoneFormat="utc" label="UTC Format Example" />
);

export const CustomFormat = args => {
  /**
   * When timezoneFormat="custom", provide your own items array.
   * Each item must have the following shape:
   * - key: Unique key for the item (e.g., "America/New York UTC-05:00")
   * - id: IANA timezone string (e.g., "America/New_York")
   * - label: Display label (e.g., "Eastern Time")
   * - timeZone: Display timezone name (e.g., "America/New York")
   * - gmt: Offset string to display (e.g., "UTC-05:00" or any custom prefix)
   * - numericOffset: Numeric offset in hours for sorting (e.g., -5)
   * - searchTags: Uppercase string used for filtering (e.g., "UTC-05:00 AMERICA/NEW_YORK EASTERN TIME")
   */
  const customItems = [
    {
      key: 'America/New York UTC-05:00',
      id: 'America/New_York',
      label: 'Eastern Time',
      timeZone: 'America/New York',
      gmt: 'UTC-05:00',
      numericOffset: -5,
      searchTags: 'UTC-05:00 AMERICA/NEW_YORK AMERICA/NEW YORK EASTERN TIME',
    },
    {
      key: 'America/Chicago UTC-06:00',
      id: 'America/Chicago',
      label: 'Central Time',
      timeZone: 'America/Chicago',
      gmt: 'UTC-06:00',
      numericOffset: -6,
      searchTags: 'UTC-06:00 AMERICA/CHICAGO CENTRAL TIME',
    },
    {
      key: 'America/Los Angeles UTC-08:00',
      id: 'America/Los_Angeles',
      label: 'Pacific Time',
      timeZone: 'America/Los Angeles',
      gmt: 'UTC-08:00',
      numericOffset: -8,
      searchTags: 'UTC-08:00 AMERICA/LOS_ANGELES AMERICA/LOS ANGELES PACIFIC TIME',
    },
  ];

  return (
    <TimeZonePicker
      {...args}
      items={customItems}
      label="Custom Format Example"
    />
  );
};
