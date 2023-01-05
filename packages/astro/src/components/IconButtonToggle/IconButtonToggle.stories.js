import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeOutlineIcon';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';
import IconButtonToggle from '.';

export default {
  title: 'Components/IconButtonToggle',
  component: IconButtonToggle,
};

export const Default = args => (
  <IconButtonToggle {...args} toggledIcon={EyeIcon} defaultIcon={EyeOffIcon} buttonProps={{ 'aria-label': 'eye icon' }} />
);

export const Controlled = (args) => {
  const [isToggled, onToggledChange] = useState(false);
  const handleToggleChange = () => {
    onToggledChange(!isToggled);
  };
  return (
    <IconButtonToggle
      {...args}
      toggledIcon={EyeIcon}
      defaultIcon={EyeOffIcon}
      onToggle={handleToggleChange}
      isToggled={isToggled}
      buttonProps={{
        'aria-label': 'eye icon',
      }}
      iconProps={{
        size: 'sm',
      }}
    />
  );
};
