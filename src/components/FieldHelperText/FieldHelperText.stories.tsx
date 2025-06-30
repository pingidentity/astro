import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { FieldHelperText } from '../../index';
import { FieldHelperTextProps } from '../../types';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export default {
  title: 'Form/Base Components/FieldHelperText',
  component: FieldHelperText,
  argTypes: {
    ...statusArgTypes,
  },
} as Meta;

export const Default: StoryFn<FieldHelperTextProps> = (args: FieldHelperTextProps) => (
  <FieldHelperText {...args}>
    Look at me!
  </FieldHelperText>
);

export const Error = args => (
  <FieldHelperText {...args} status="error">
    Look at me!
  </FieldHelperText>
);

export const Success = args => (
  <FieldHelperText {...args} status="success">
    Look at me!
  </FieldHelperText>
);

export const Warning = args => (
  <FieldHelperText {...args} status="warning">
    Look at me!
  </FieldHelperText>
);
