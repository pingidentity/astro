// TODO: popover-deprecate Remove when popover is deprecated in 1.0.0
import React from 'react';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import { action } from '@storybook/addon-actions';
import Popover from '../Popover/Popover';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Link from '../Link/Link';

export default {
  title: 'Popover',
  component: Popover,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'Hi, I\'m a popover!',
    },
  },
};

export const Default = ({ ...args }) => (
  <Popover {...args}>
    <Button>Hover over button</Button>
  </Popover>
);

export const PopoverMenu = () => (
  <Popover
    delay={[null, 500]}
    trigger="click"
    content={
      // Content will be replaced with Menu component which is still in development
      <>
        <Link onPress={action('onPress')}>Edit</Link><br />
        <Link onPress={action('onPress')}>Duplicate</Link><br />
        <Link onPress={action('onPress')}>Delete</Link><br />
      </>
    }
    placement="bottom"
  >
    <Button variant="icon" ml="sm">
      <Icon icon={MoreVertIcon} size={20} />
    </Button>
  </Popover>
);
