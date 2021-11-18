import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import IconButton from '.';
import Icon from '../Icon';

export default {
  title: 'Icon Button',
  component: IconButton,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      defaultValue: CreateIcon,
      description: 'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    title: {
      control: {
        type: 'text',
      },
    },
    'aria-label': {
      control: {
        type: 'text',
      },
    },
    isDisabled: {},
    variant: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = args => (
  <IconButton aria-label="my-label" {...args}>
    <Icon icon={CreateIcon} />
  </IconButton>
);
export const Inverted = () => (
  <IconButton aria-label="my-label" variant="inverted" >
    <Icon icon={CreateIcon} />
  </IconButton>
);

export const WithTooltip = () => (
  <IconButton aria-label="my-label" title="Edit">
    <Icon icon={CreateIcon} />
  </IconButton>
);
export const Disabled = () => (
  <IconButton aria-label="my-label" isDisabled>
    <Icon icon={CreateIcon} />
  </IconButton>
);
