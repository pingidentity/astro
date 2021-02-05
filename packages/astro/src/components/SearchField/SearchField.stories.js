import React, { useState } from 'react';
import { Users } from '@pingux/icons';

import SearchField from '.';

export default {
  title: 'Form/SearchField',
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
      value={value}
      onChange={setValue}
      aria-label="Search Groups"
      placeholder="Search Groups"
      onSubmit={text => alert(text)} // eslint-disable-line no-alert
    />
  );
};

export const CustomIcon = () => (
  <SearchField
    icon={Users}
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);

export const NoClearButton = () => (
  <SearchField
    hasNoClearButton
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);
