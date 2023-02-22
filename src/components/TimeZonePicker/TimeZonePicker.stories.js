import React from 'react';

import TimeZonePicker from './TimeZonePicker';

export default {
  title: 'Form/TimeZonePicker',
  component: TimeZonePicker,
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
