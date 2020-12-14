import React from 'react';
import Text from './Text';
import { textVariants } from '../../utils/devUtils/constants/variants.js';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(textVariants),
      },
      defaultValue: Object.values(textVariants)[0],
    },
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'Hi, this is some text!',
    },
  },
};

export const Default = ({ children, ...args }) => (
  <Text {...args}>
    {children}
  </Text>
);
