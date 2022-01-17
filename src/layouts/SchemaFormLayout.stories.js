import React from 'react';
import Earth from 'mdi-react/EarthIcon';
import Cog from 'mdi-react/CogOutlineIcon';
import Button from '../components/Button/Button';
import Box from '../components/Box/Box';
import Icon from '../components/Icon/Icon';
import Text from '../components/Text/Text';
import Separator from '../components/Separator/Separator';
import TextField from '../components/TextField/TextField';
import TextAreaField from '../components/TextAreaField/TextAreaField';
import RadioGroupField from '../components/RadioGroupField/RadioGroupField';
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
          <Button bg="active" color="white">Save and Close</Button>
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
            <RadioGroupField label="Required Fields" variant="radioGroupBasic">
              <RadioField value="A" label="Option A" />
              <RadioField value="B" label="Option B" />
            </RadioGroupField>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
