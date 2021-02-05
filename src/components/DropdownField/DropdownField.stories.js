import React, { useState } from 'react';
import DropdownField from '.';
import Box from '../Box/Box';

export default {
  title: 'Form/DropdownField',
  component: DropdownField,
};

export const Default = args => (
  <DropdownField {...args} label="Select one" helperText="buutss">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </DropdownField>
);

export const DefaultSelected = args => (
  <DropdownField {...args} label="Select one" defaultValue="2">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </DropdownField>
);

export const Controlled = () => {
  const [value, setValue] = useState('1');

  return (
    <DropdownField label="Select one" value={value} onChange={e => setValue(e.target.value)}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DropdownField>
  );
};

export const WithOptionGroups = args => (
  <DropdownField {...args} label="Select one">
    <optgroup label="Cheeses">
      <option value="brie">Brie</option>
      <option value="gouda">Gouda</option>
      <option value="swiss">Swiss</option>
    </optgroup>
    <optgroup label="Breads">
      <option value="sourdough">Sourdough</option>
      <option value="rye">Rye</option>
      <option value="focaccia">Focaccia</option>
    </optgroup>
  </DropdownField>
);

export const NoneOption = args => (
  <DropdownField {...args} label="Select one" hasNoneOption>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </DropdownField>
);

export const IsDisabled = args => (
  <DropdownField {...args} label="Select one" isDisabled>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </DropdownField>
);

export const HelperText = args => (
  <DropdownField
    label="Select one"
    helperText="Here is some helpful text..."
    status="error"
    {...args}
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </DropdownField>
);

export const Transparent = args => (
  <Box bg="neutral.90" p={20}>
    <DropdownField
      {...args}
      label="Select one"
      variant="forms.select.transparent"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DropdownField>
  </Box>
);
