import React from 'react';
import Earth from 'mdi-react/EarthIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import { Box, Button, Icon, Tooltip, TooltipTrigger } from '../../index';
import IconButton from '../IconButton';
import Text from '../Text';

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

export const withWidthProp = () => (
  <TooltipTrigger width="200px">
    <Button>Hover Over Me!</Button>
    <Tooltip>Custom width display</Tooltip>
  </TooltipTrigger>
);

export const withArrowCrossOffsetProp = () => (
  <TooltipTrigger arrowCrossOffset="30px" isOpen >
    <Button>Hover Over Me!</Button>
    <Tooltip>Display with a delay</Tooltip>
  </TooltipTrigger>
);

export const isOpen = () => (
  <TooltipTrigger isOpen >
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

export const IconWithTooltip = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <IconButton variant="tooltipIconButton">
        <Icon icon={AccountIcon} />
      </IconButton>
      <Tooltip>Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);

export const ChipWithTooltip = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <Button variant="tooltipChip" bg="neutral.10">
        <Text variant="label" sx={{ textTransform: 'uppercase' }} color="white">
          Some text
        </Text>
      </Button>
      <Tooltip>Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);

export const TextWithTooltip = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <Button variant="tooltipInline">Some text</Button>
      <Tooltip>Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);
