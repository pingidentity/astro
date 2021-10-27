import React from 'react';
import Clear from 'mdi-react/CloseIcon';
import Welcome from 'mdi-react/EmoticonHappyIcon';
import AddCircleIcon from 'mdi-react/AddCircleIcon';
import CreateIcon from 'mdi-react/CreateIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import PageHeader from '../components/PageHeader/PageHeader';
import List from '../components/List/List';
import ListItem from '../components/ListItem/ListItem';
import Button from '../components/Button/Button';
import Panel from '../components/Panel/Panel';
import Box from '../components/Box/Box';
import Icon from '../components/Icon/Icon';
import Text from '../components/Text/Text';
import Separator from '../components/Separator/Separator';

export default {
  title: 'Layouts/ListLayout',
};

export const Default = () => {
  const [visible, setVisible] = React.useState(false);

  const exampleListItemContent = (
    <ListItem onClick={() => (!visible ? setVisible(!visible) : '')} flexGrow={1}>
      <Box isRow mr="auto" flexBasis="0px" flexGrow="1">
        <Icon icon={FormSelectIcon} alignSelf="center" mr="sm" color="text.primary" size={25} flexShrink={0} />
        <Text variant="itemTitle" alignSelf="center" mr="sm">Form Name</Text>
      </Box>
      <Box isRow alignSelf="center">
        <Button variant="icon" onClick={() => (!visible ? setVisible(!visible) : '')} flexShrink={0} >
          <Icon icon={CreateIcon} size={20} />
        </Button>
        <Button variant="icon" onClick={() => (!visible ? setVisible(!visible) : '')} flexShrink={0} >
          <Icon icon={MoreVertIcon} size={20} />
        </Button>
      </Box>
    </ListItem>
  );

  return (
    <Box isRow bg="accent.99" >
      <Box flexGrow={1} maxWidth="100%">
        <PageHeader title="Forms" p="md">
          <Button mb="sm">
            <Box isRow alignItems="center">
              <Icon icon={AddCircleIcon} mr="sm" color="active" size={20} />
              Add a Form
            </Box>
          </Button>
        </PageHeader>
        <Text variant="itemTitle" mb="md" p="md" color="text.secondary">Registration Forms</Text>
        <List title="Registration Forms">
          <Separator margin="0" />
          {exampleListItemContent}
          <Separator margin="0" />
          {exampleListItemContent}
          <Separator margin="0" />
          {exampleListItemContent}
        </List>
      </Box>
      <Panel isVisible={visible} width="60%">
        <Button variant="icon" ml="sm">
          <Icon icon={Clear} size={15} onClick={() => setVisible(!visible)} />
        </Button>
        <Box p="md">
          <Box isRow p="md">
            <Text mr="auto" variant="itemTitle">Standard Registration</Text>
            <Button variant="icon" ml="sm">
              <Icon icon={MoreVertIcon} size={20} />
            </Button>
          </Box>
          <Box p="md">
            <Text>Standard registration form with required information.</Text>
            <Separator marginTop="md" marginBottom="md" />
            <Icon icon={Welcome} color="active" size={20} />
          </Box>
        </Box>
      </Panel>
    </Box>
  );
};
