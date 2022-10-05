import React from 'react';
import ArrowIcon from 'mdi-react/ArrowTopRightThickIcon';
import GroupIcon from 'mdi-react/AccountGroupIcon';
import IconBadge from '.';
import {
  Icon,
  Box,
} from '../../index';

export default {
  title: 'IconBadge',
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
    <IconBadge {...args} baseSize={25} circleSize={15} >
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
