import React, { useState } from 'react';
import SwitchField from '.';

export default {
  title: 'Form/SwitchField',
  component: SwitchField,
};

export const Default = () => (
  <SwitchField
    label="Example label"
    value="my-switch"
  />
);

export const Controlled = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SwitchField
      isSelected={isSelected}
      label="Controlled"
      onChange={setIsSelected}
      value="my-switch"
    />
  );
};

export const DefaultSelected = () => (
  <SwitchField
    isDefaultSelected
    label="Default selected"
    value="my-switch"
  />
);

export const Disabled = () => (
  <SwitchField
    isDisabled
    label="Disabled"
    value="my-switch"
  />
);

export const NoVisibleLabel = () => (
  <SwitchField
    aria-label="my-label"
    value="my-switch"
  />
);

export const Required = () => (
  <SwitchField
    isRequired
    label="Required"
    value="my-switch"
  />
);
