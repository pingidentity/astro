import React from 'react';
import DropdownField from '.';

export default {
  title: 'DropdownField',
  component: DropdownField,
};

export const Default = args => (
  <DropdownField {...args} label="Select one">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </DropdownField>
);

export const NoneOption = args => (
  <DropdownField {...args} label="Select one" controlProps={{ hasNoneOption: true }} >
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </DropdownField>
);

export const IsDisabled = args => (
  <DropdownField {...args} label="Select one" isDisabled >
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </DropdownField>
);
