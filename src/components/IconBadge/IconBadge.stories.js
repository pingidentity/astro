import React from 'react';
import GroupIcon from 'mdi-react/AccountGroupIcon';
import ArrowIcon from 'mdi-react/ArrowTopRightThickIcon';

import {
  Box,
  Icon,
  IconBadge,
} from '../../index';

export default {
  title: 'Components/IconBadge',
  component: IconBadge,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Default = args => (
  <Box>
    <IconBadge {...args} baseSize={25} circleSize={15}>
      <Icon
        icon={GroupIcon}
        size="25px"
        color="accent.40"
      />
      <Icon
        icon={ArrowIcon}
        size="13px"
        color="accent.40"
      />
    </IconBadge>
  </Box>
);
