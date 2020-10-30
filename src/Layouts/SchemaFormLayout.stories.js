import React from 'react';
import { Earth } from '@pingux/icons';
import Button from '../components/Button/Button';
import Panel from '../components/Panel/Panel';
import Box from '../components/Box/Box';
import Icon from '../components/Icon/Icon';
import Text from '../components/Text/Text';
import Separator from '../components/Separator/Separator';
import TextField from '../components/TextField/TextField';
import TextAreaField from '../components/TextAreaField/TextAreaField';
import DropdownField from '../components/DropdownField/DropdownField';
import RadioGroup from '../components/RadioGroup/RadioGroup';
import RadioField from '../components/RadioField/RadioField';

export default {
  title: 'Layouts/SchemaForms',
};

const FormSelectIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M15 5H18L16.5 7L15 5M5 2H19C20.11 2 21 2.9 21 4V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V4C3 2.9 3.9 2 5 2M5 4V8H19V4H5M5 20H19V10H5V20M7 12H17V14H7V12M7 16H17V18H7V16Z" />
  </svg>
);

export const Default = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Box bg="accent.99">
      <Separator margin="0" />
      <Box isRow p="sm">
        <Box isRow mr="auto">
          <Box mr="sm">
            <Text variant="label">Form Builder</Text>
            <Text variant="title">Standard Registration</Text>
          </Box>
          <Button variant="inline" alignContent="center">Preview</Button>
        </Box>
        <Box isRow alignItem="center">
          <Text variant="base" mr="lg" color="active" alignSelf="center">Cancel</Text>
          <Button bg="active" color="white"> Save and Close</Button>
        </Box>
      </Box>
      <Separator margin="0" />
      <Box isRow bg="white">
        <Box flexGrow={1} p="md">
          <Box onClick={() => (!visible ? setVisible(!visible) : '')}>
            {/* Will be replaced with tabs component */}
            <Box isRow justifyContent="center">
              <Box alignItems="center" mr="md">
                <Icon icon={FormSelectIcon} size={20} color="active" mb="xs" />
              </Box>
              <Box alignItems="center">
                <Icon icon={Earth} size={20} color="grey" mb="xs" />
              </Box>
            </Box>
            <Text variant="label" textAlign="center">[Tabbed component still in development]</Text>
            <Separator />
            <TextField
              mt="lg"
              mb="lg"
              label="Form Name"
            />
            <TextAreaField
              mb="lg"
              label="Description"
            />
            <DropdownField
              label="Category"
              mb="lg"
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </DropdownField>
            <RadioGroup label="Required Fields" variant="radioGroupBasic">
              <RadioField value="A">
                The first choice
              </RadioField>
              <RadioField value="B">
                The second choice
              </RadioField>
            </RadioGroup>
          </Box>
        </Box>
        <Panel isVisible={visible} width="70%" bg="accent.99">
          <Box p="lg" onClick={() => setVisible(!visible)}>
            <Box p="lg" bg="white">
              Ope, form will go here
            </Box>
          </Box>
        </Panel>
      </Box>
    </Box>
  );
};
