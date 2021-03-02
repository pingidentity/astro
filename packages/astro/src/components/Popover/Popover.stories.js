// TODO: popover-deprecate Remove when popover is deprecated in 1.0.0
import React from 'react';
import { action } from '@storybook/addon-actions';
import Popover from '../Popover/Popover';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Link from '../Link/Link';


export default {
  title: 'Popover',
  component: Popover,
  argTypes: { onPress: { action: 'clicked' } },
};

export const Default = () => (
  <Popover content="Hello">
    <Button>Hover over button</Button>
  </Popover>
);

const DotsVerticalIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
  </svg>
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
      <Icon icon={DotsVerticalIcon} size={20} />
    </Button>
  </Popover>
);
