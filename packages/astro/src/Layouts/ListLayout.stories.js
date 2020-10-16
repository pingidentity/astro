import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import List from '../components/List/List';
import ListItem from '../components/ListItem/ListItem';
import Button from '../components/Button/Button';

export default {
  title: 'Layouts/ListLayout',
};

export const Default = () => (
  <>
    <PageHeader title="Forms">
      <Button>Add a Form</Button>
    </PageHeader>
    <List title="Registration Forms">
      <ListItem title="Form 1">
        <Button mr="sm"> Button 1 </Button>
        <Button> Button 2 </Button>
      </ListItem>
      <ListItem title="Form 2" />
      <ListItem title="Form 3" />
    </List>
  </>
);
