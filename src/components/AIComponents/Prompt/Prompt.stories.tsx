import React from 'react';
import { Meta } from '@storybook/react';

import { Text } from '../../../index';

import Prompt from './Prompt';

export default {
  title: 'AI Components/Prompt',
  component: Prompt,
} as Meta;

export const Default = () => (
  <Prompt>
    <Text>
      Did my number of registrations go up or down in the last month?
    </Text>
  </Prompt>
);
