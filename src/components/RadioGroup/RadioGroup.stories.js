import React from 'react';
import RadioGroup from '.';
import RadioField from '../RadioField';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Default = args => (
  <RadioGroup label="Pick one" {...args}>
    <RadioField value="A" checkedContent="First choice content...">
      The first choice
    </RadioField>
    <RadioField value="B" checkedContent="Second choice content...">
      The second choice
    </RadioField>
    <RadioField value="C" checkedContent="Third choice content...">
      The third choice
    </RadioField>
  </RadioGroup>
);
