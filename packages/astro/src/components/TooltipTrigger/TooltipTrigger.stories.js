import React from 'react';
import { Earth } from '@pingux/icons';
import { Button, Icon, Tooltip, TooltipTrigger } from '../../index';
import IconButton from '../IconButton';

export default {
  title: 'TooltipTrigger',
  component: TooltipTrigger,
};

export const Default = args => (
  <TooltipTrigger {...args}>
    {/* First child is the trigger element, second child is the content of tooltip */}
    <Button>Hover Over Me!</Button>
    <Tooltip>Tooltip Content</Tooltip>
  </TooltipTrigger>
);

export const withAlignProp = () => (
  <TooltipTrigger align="end">
    <Button>Hover Over Me!</Button>
    <Tooltip>End aligned</Tooltip>
  </TooltipTrigger>
);

export const withDirectionProp = () => (
  <TooltipTrigger direction="right">
    <Button>Hover Over Me!</Button>
    <Tooltip>Display on the right</Tooltip>
  </TooltipTrigger>
);

export const withDelayProp = () => (
  <TooltipTrigger delay={700}>
    <Button>Hover Over Me!</Button>
    <Tooltip>Display with a delay</Tooltip>
  </TooltipTrigger>
);

export const isOpen = () => (
  <TooltipTrigger isOpen>
    <Button>Hover Over Me!</Button>
    <Tooltip>Display by default</Tooltip>
  </TooltipTrigger>
);

export const Disabled = () => (
  <TooltipTrigger delay={0} isDisabled>
    <IconButton>
      <Icon icon={Earth} />
    </IconButton>
    <Tooltip>
      Hello World
    </Tooltip>
  </TooltipTrigger>
);
Disabled.parameters = {
  docs: {
    description: {
      story: 'The tooltip can be disabled without disabling the button press events.',
    },
  },
};
