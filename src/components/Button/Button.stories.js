import React from 'react';
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

const PlusIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

export const TextIconButton = () => (
  <Button mb="sm">
    <Box isRow alignItems="center">
      <Icon icon={PlusIcon} mr="sm" color="active" size={20} />
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
