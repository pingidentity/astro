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
