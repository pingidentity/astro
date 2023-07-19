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

export const Default = () => <TimeZonePicker label="Default Example" />;

export const WithCustomTimeZone = () => {
  const customTimeZone = {
    '(GMT+02:00) Africa/Juba': 'Africa/Juba',
  };

  return (
    <TimeZonePicker
      additionalTimeZones={customTimeZone}
      label="With Custom Time Zone (Africa/Juba)"
    />
  );
};
