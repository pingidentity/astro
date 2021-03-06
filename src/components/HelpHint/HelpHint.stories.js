import React from 'react';
import HelpHint from '.';
import Box from '../Box';

export default {
  title: 'HelpHint',
  component: HelpHint,
  argTypes: {
    children: {
      description: 'Tooltip content',
      defaultValue: 'Text of the tooltip right here...',
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = args => (
  <Box p={50}>
    <HelpHint {...args} />
  </Box>
);

export const WithTooltipAndIconButtonProps = () => (
  <Box p={50}>
    <HelpHint tooltipProps={{ direction: 'bottom' }} iconButtonProps={{ 'aria-label': 'Help hint' }}>
      Text of the tooltip right here...
    </HelpHint>
  </Box>
);
