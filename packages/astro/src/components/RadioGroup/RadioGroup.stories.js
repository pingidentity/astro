import React from 'react';
import RadioGroup from '.';
import RadioField from '../RadioField';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Default = args => (
  <RadioGroup label="Pick one" {...args}>
    <RadioField value="A">
      The first choice
    </RadioField>
    <RadioField value="B">
      The second choice
    </RadioField>
    <RadioField value="C">
      The third choice
    </RadioField>
  </RadioGroup>
);

export const Required = args => (
  <RadioGroup label="Pick one" isRequired {...args}>
    <RadioField value="A">
      The first choice
    </RadioField>
    <RadioField value="B">
      The second choice
    </RadioField>
    <RadioField value="C">
      The third choice
    </RadioField>
  </RadioGroup>
);

export const CheckedContent = args => (
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

export const HelperText = args => (
  <RadioGroup
    label="Pick one"
    helperText="Here is some helpful text..."
    status="error"
    {...args}
  >
    <RadioField value="A">
      The first choice
    </RadioField>
    <RadioField value="B">
      The second choice
    </RadioField>
    <RadioField value="C">
      The third choice
    </RadioField>
  </RadioGroup>
);
