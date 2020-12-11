import React, { useState } from 'react';
import { Users } from '@pingux/icons';

import SearchField from '.';

export default {
  title: 'SearchField',
  component: SearchField,
};

export const Default = () => (
  <SearchField
    aria-label="Search Groups"
    placeholder="Search Groups"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);

export const Controlled = () => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      aria-label="Search Groups"
      placeholder="Search Groups"
      onSubmit={text => alert(text)} // eslint-disable-line no-alert
      value={value}
      onChange={setValue}
    />
  );
};

export const CustomIcon = () => (
  <SearchField
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
    icon={Users}
  />
);

export const NoClearButton = () => (
  <SearchField
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
    hasClearButton={false}
  />
);
