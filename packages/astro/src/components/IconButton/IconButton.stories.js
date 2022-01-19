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
        type: 'select',
        options: ['iconButton', 'inverted', 'square', 'invertedSquare'],
      },
      defaultValue: 'iconButton',
    },
  },
};

export const Default = args => (
  <IconButton aria-label="default icon button" {...args}>
    <Icon icon={CreateIcon} />
  </IconButton>
);

export const WithTooltip = () => (
  <IconButton aria-label="icon button with tooltip" title="Edit">
    <Icon icon={CreateIcon} />
  </IconButton>
);
export const Disabled = () => (
  <IconButton aria-label="disabled icon button" isDisabled>
    <Icon icon={CreateIcon} />
  </IconButton>
);
