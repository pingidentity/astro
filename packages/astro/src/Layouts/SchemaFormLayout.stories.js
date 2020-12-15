import React from 'react';
import { Earth, Cog } from '@pingux/icons';
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
import Tabs from '../components/Tabs/Tabs';
import Tab from '../components/Tab/Tab';

export default {
  title: 'Layouts/SchemaForms',
};

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
            <Tabs tabListProps={{ justifyContent: 'center' }}>
              <Tab
                key="Tab 1"
                title="Tab 1"
                icon={<Icon icon={Earth} size={20} color="active" mb={10} />}
              />
              <Tab
                key="Tab 2"
                title="Tab 2"
                icon={<Icon icon={Cog} size={20} color="active" mb={10} />}
              />
            </Tabs>
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
              <Text> Your content here.</Text>
            </Box>
          </Box>
        </Panel>
      </Box>
    </Box>
  );
};
