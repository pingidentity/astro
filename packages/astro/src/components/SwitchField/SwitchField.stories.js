import React, { useState } from 'react';
import SwitchField from '.';

export default {
  title: 'SwitchField',
  component: SwitchField,
};

export const Default = () => (
  <SwitchField>
    Example Label
  </SwitchField>
);

export const DefaultSelected = () => (
  <SwitchField controlProps={{ isDefaultSelected: true }}>
    Default selected
  </SwitchField>
);

export const Disabled = () => (
  <SwitchField isDisabled>
    Disabled switch
  </SwitchField>
);

export const Controlled = () => {
  const [isSelected, setIsSelected] = useState(true);
  return (
    <SwitchField controlProps={{ isSelected, onChange: setIsSelected }}>
      Example Label
    </SwitchField>
  );
};

export const NoVisibleLabel = () => (
  <SwitchField controlProps={{ 'aria-label': 'my-label' }} />
);
