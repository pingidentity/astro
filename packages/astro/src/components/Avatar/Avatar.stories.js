import React from 'react';
import Avatar from '.';
import { pingImg } from '../../utils/devUtils/constants/images';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
      defaultValue: pingImg,
    },
  },
};

export const Default = ({ ...args }) => (
  <Avatar {...args} />
);
