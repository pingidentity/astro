import React, { useState } from 'react';
import EyeOffIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeIcon from '@pingux/mdi-react/EyeOutlineIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { IconButtonToggle } from '../../index';

import IconButtonToggleReadme from './IconButtonToggle.mdx';

export default {
  title: 'Components/IconButtonToggle',
  component: IconButtonToggle,
  parameters: {
    docs: {
      page: () => (
        <>
          <IconButtonToggleReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = args => (
  <IconButtonToggle {...args} toggledIcon={EyeIcon} defaultIcon={EyeOffIcon} buttonProps={{ 'aria-label': 'eye icon' }} />
);

export const Controlled = args => {
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
