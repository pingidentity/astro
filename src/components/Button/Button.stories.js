import React from 'react';
import AddCircleIcon from 'mdi-react/AddCircleIcon';
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

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(variants),
      },
      defaultValue: Object.values(variants)[0],
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
  <Button mb="sm" variant="text">
    <Text variant="label" color="active"> + Add Option</Text>
  </Button>
);

export const InlineButton = () => (
  <Button mb="sm" variant="inline">
    Inline
  </Button>
);
