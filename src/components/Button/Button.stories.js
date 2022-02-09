import React from 'react';
import AddCircleIcon from 'mdi-react/AddCircleIcon';
import CreateIcon from 'mdi-react/CreateIcon';
import Box from '../Box';
import Button from '.';
import Icon from '../Icon';
import Text from '../Text';
import { buttonVariants } from '../../utils/devUtils/constants/variants';

// removing the iconButton variants from this story.
const variants = buttonVariants;
delete variants.ICON;
delete variants.ICON_BUTTON;
delete variants.INVERTED;

// add designer approved variants for devs to use here
const variantOptions = [
  'critical',
  'danger',
  'default',
  'inline',
  'link',
  'primary',
  'success',
  'text',
];

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: variantOptions,
      },
      defaultValue: 'default',
    },
    children: {
      description: 'Button text.',
      defaultValue: 'Button Text',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Default = args => (
  <Button {...args} />
);

export const Disabled = () => (
  <Button isDisabled>
    Button Text
  </Button>
);

export const TextIconButton = () => (
  <Button mb="sm">
    <Box isRow alignItems="center">
      <Icon icon={AddCircleIcon} mr="sm" color="active" size={20} />
      Add a Form
    </Box>
  </Button>
);

export const TextButton = () => (
  <Button mb="sm" variant="text" aria-label="Add option">
    <Text variant="label" color="active"> + Add Option</Text>
  </Button>
);

export const InlineButton = () => (
  <Button mb="sm" variant="inline">
    Inline
  </Button>
);

export const ColorBlockButton = (args) => {
  // Change `isConfigured` property in storybook controls
  const { isConfigured, ...props } = args;

  return (
    <Button {...props} variant="colorBlock" className={isConfigured ? 'is-configured' : ''}>
      <Box>
        <Text variant="buttonTitle">Title</Text>
        <Text variant="buttonSubtitle">Info</Text>
      </Box>
      <Icon icon={CreateIcon} />
    </Button>
  );
};

ColorBlockButton.story = {
  argTypes: {
    isConfigured: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};
