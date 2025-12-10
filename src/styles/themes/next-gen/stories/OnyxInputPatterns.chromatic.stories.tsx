import React, { useState } from 'react';
import EyeOffOutlineIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeOutlineIcon from '@pingux/mdi-react/EyeOutlineIcon';

import {
  Box,
  Button,
  IconButtonToggle,
  Item,
  SelectField,
  Text,
} from '../../../..';
import { SelectItemProps } from '../../../../components/SelectField/SelectField.stories';
import TextField from '../../../../components/TextField';

export default {
  title: 'Form/Onyx Input Patterns',
  component: TextField,
};

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];

export const Default = () => {
  return <TextField label="Label" helperText="Help text for this field." />;
};

export const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      label="Password"
      type="password"
      containerProps={{ sx: { '& input': { paddingRight: '60px' } } }}
      slots={{
        inContainer: (
          <IconButtonToggle
            toggledIcon={EyeOutlineIcon}
            defaultIcon={EyeOffOutlineIcon}
            onToggle={handleVisible}
            isToggled={isVisible}
            variant="passwordVisibilityIcon"
            buttonProps={{
              'aria-label': 'eye icon',
            }}
            iconProps={{
              size: 'xs',
            }}
          />
        ),
      }}
    />
  );
};

export const InputGroup = () => {
  return (
    <>
      <TextField
        label="Label"
        helperText="Help text for this field."
        containerProps={{ sx: { '& input': { paddingLeft: '70px' } } }}
        slots={{
          beforeInput: (
            <Box variant="box.inputGroupContentLeft" p="12px 20px">
              <Text>@</Text>
            </Box>
          ),
        }}
      />

      <TextField
        label="Label"
        mt="xl"
        helperText="Help text for this field."
        containerProps={{ sx: { '& input': { paddingRight: '160px' } } }}
        slots={{
          inContainer: (
            <Box variant="box.inputGroupContentRight" p="12px 20px">
              <Text>@example.com</Text>
            </Box>
          ),
        }}
      />
    </>
  );
};

export const ButtonInputGroup = () => {
  return (
    <TextField
      label="Label"
      containerProps={{ sx: { '& input': { paddingRight: '100px' } } }}
      slots={{
        inContainer: (
          <Button variant="ButtonInputGroupContentRight">
            Button
          </Button>
        ),
      }}
    />
  );
};

export const DropdownInputGroup = () => {
  const [selectedKey, setSelectedKey] = useState(items[0].name);
  const handleSelectionChange = key => setSelectedKey(key);
  return (
    <>
      <TextField
        label="Label"
        containerProps={{
          sx: {
            '& > .field-control-wrapper > input': { paddingRight: '160px' },
          },
        }}
        slots={{
          inContainer: (
            <Box variant="box.inputDropDownContentRight" width="150px" mt="-2px">
              <SelectField
                items={items}
                selectedKey={selectedKey}
                onSelectionChange={handleSelectionChange}
                variant="forms.input.dropDownContentRight"
              >
                {(item: SelectItemProps) => (
                  <Item key={item.name} data-id={item.name}>
                    {item.name}
                  </Item>
                )}
              </SelectField>
            </Box>
          ),
        }}
      />

      <TextField
        label="Label"
        mt="xl"
        containerProps={{
          sx: {
            '& > .field-control-wrapper > input': { paddingLeft: '160px' },
          },
        }}
        slots={{
          beforeInput: (
            <Box variant="box.inputDropDownContentLeft" width="150px" mt="-2px">
              <SelectField
                items={items}
                selectedKey={selectedKey}
                onSelectionChange={handleSelectionChange}
                variant="forms.input.dropDownContentLeft"
              >
                {(item: SelectItemProps) => (
                  <Item key={item.name} data-id={item.name}>
                    {item.name}
                  </Item>
                )}
              </SelectField>
            </Box>
          ),
        }}
      />
    </>
  );
};
