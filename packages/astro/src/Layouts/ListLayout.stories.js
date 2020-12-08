import React from 'react';
import { Clear, Welcome } from '@pingux/icons';
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

const PlusIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

const FormSelectIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M15 5H18L16.5 7L15 5M5 2H19C20.11 2 21 2.9 21 4V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V4C3 2.9 3.9 2 5 2M5 4V8H19V4H5M5 20H19V10H5V20M7 12H17V14H7V12M7 16H17V18H7V16Z" />
  </svg>
);

const EditIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  </svg>
);

const DotsVerticalIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
  </svg>
);


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
          <Icon icon={EditIcon} size={20} />
        </Button>
        <Button variant="icon" onClick={() => (!visible ? setVisible(!visible) : '')} flexShrink={0} >
          <Icon icon={DotsVerticalIcon} size={20} />
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
              <Icon icon={PlusIcon} mr="sm" color="active" size={20} />
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
              <Icon icon={DotsVerticalIcon} size={20} />
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
