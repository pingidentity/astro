import React from 'react';
import Text from './Text';
import { textVariants } from '../../utils/devUtils/constants/variants.js';
import { flatColorList } from '../../styles/colors.js';

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
    color: {
      control: {
        type: 'select',
        options: [undefined, ...flatColorList.map(([colorName]) => colorName)],
      },
      defaultValue: undefined,
    },
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'white',
    },
  },
};

export const Default = ({ children, bg, ...args }) => (
  <Text bg={bg} {...args} p="xl">
    {children}
  </Text>
);
