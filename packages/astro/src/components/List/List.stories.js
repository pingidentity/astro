import React from 'react';
import List from '.';
import ListItem from '../ListItem/ListItem';
import Text from '../Text';
import Separator from '../Separator';

export default {
  title: 'List',
  component: List,
};

export const Default = () => (
  <>
    <Text variant="itemTitle" mb="md" color="text.secondary">Registration Forms</Text>
    <List>
      <ListItem>
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 1</Text>
      </ListItem>
      <Separator margin="0" />
      <ListItem title="Form 2">
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 2</Text>
      </ListItem>
      <Separator margin="0" />
      <ListItem title="Form 3">
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 3</Text>
      </ListItem>
      <Separator margin="0" />
    </List>
  </>
);
