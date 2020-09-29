import React from 'react';
import Text from './Text';

export default {
  title: 'Text',
  component: Text,
};

export const Default = args => (
  <Text {...args}>
    Hi, this is some text!
  </Text>
);
