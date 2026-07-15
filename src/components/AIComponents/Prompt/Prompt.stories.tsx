import React from 'react';
import { Meta } from '@storybook/react-vite';

import { Text } from '../../../index';

import Prompt from './Prompt';

export default {
  title: 'AI Components/Prompt',
  component: Prompt,
  argTypes: {
    children: {
      description: 'Content rendered inside the prompt container.',
      control: false,
    },
  },
} satisfies Meta<typeof Prompt>;

export const Default = () => (
  <Prompt>
    <Text>
      Did my number of registrations go up or down in the last month?
    </Text>
  </Prompt>
);
