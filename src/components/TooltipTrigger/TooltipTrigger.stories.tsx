import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button, Icon, IconButton, Text, Tooltip, TooltipTrigger } from '../../index';
import { TooltipTriggerProps } from '../../types/tooltipTrigger';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import TooltipTriggerReadme from './TooltipTrigger.mdx';

export default {
  title: 'Components/TooltipTrigger',
  component: TooltipTrigger,
  parameters: {
    docs: {
      page: () => (
        <>
          <TooltipTriggerReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

export const Default: StoryFn<TooltipTriggerProps> = args => (
  <TooltipTrigger {...args}>
    {/* First child is the trigger element, second child is the content of tooltip */}
    <Button>Hover Over Me!</Button>
    <Tooltip>Tooltip Content</Tooltip>
  </TooltipTrigger>
);

export const withAlignProp: StoryFn = () => (
  <TooltipTrigger align="end">
    <Button>Hover Over Me!</Button>
    <Tooltip>End aligned</Tooltip>
  </TooltipTrigger>
);

export const withDirectionProp: StoryFn = () => (
  <TooltipTrigger direction="right">
    <Button>Hover Over Me!</Button>
    <Tooltip>Display on the right</Tooltip>
  </TooltipTrigger>
);

export const withArrowCrossOffsetProp: StoryFn = () => (
  <TooltipTrigger arrowCrossOffset="30px" isOpen>
    <Button>Hover Over Me!</Button>
    <Tooltip>With arrowCrossOffset=&quot;30px&quot;</Tooltip>
  </TooltipTrigger>
);

export const isOpen: StoryFn = () => (
  <TooltipTrigger isOpen>
    <Button>Hover Over Me!</Button>
    <Tooltip>Display by default</Tooltip>
  </TooltipTrigger>
);

export const IconWithTooltip: StoryFn = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <IconButton variant="tooltip.button">
        <Icon icon={AccountIcon} title={{ name: 'Account Icon' }} />
      </IconButton>
      <Tooltip>Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);

export const BadgeWithTooltip: StoryFn = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <Button variant="variants.tooltip.badge" bg="neutral.10">
        <Text variant="label" sx={{ textTransform: 'uppercase' }} color="white">
          Some text
        </Text>
      </Button>
      <Tooltip variant="variants.tooltip.badgeTooltipContainer">Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);

BadgeWithTooltip.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.tooltipTrigger.badgeWithTooltip,
  },
};

export const TextWithTooltip: StoryFn = () => (
  <Box pl={50}>
    <TooltipTrigger>
      <Button variant="variants.tooltip.inline">Some text</Button>
      <Tooltip>Useful tooltip</Tooltip>
    </TooltipTrigger>
  </Box>
);

export const Disabled: StoryFn = () => (
  <TooltipTrigger delay={0} isDisabled>
    <IconButton aria-label="Earth Icon">
      <Icon icon={Earth} title={{ name: 'Earth Icon' }} />
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

export const withDelayProp: StoryFn = () => (
  <TooltipTrigger delay={700}>
    <Button>Hover Over Me!</Button>
    <Tooltip>Display with a delay</Tooltip>
  </TooltipTrigger>
);

export const customWidth: StoryFn = () => (
  <TooltipTrigger width="200px">
    <Button>Hover Over Me!</Button>
    <Tooltip>Custom width display</Tooltip>
  </TooltipTrigger>
);
