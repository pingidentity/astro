import React from 'react';
import List from '.';
import ListItem from '../ListItem/ListItem';

export default {
  title: 'List',
  component: List,
};

export const Default = () => (
  <List title="Registration Forms">
    <ListItem title="Form 1" />
    <ListItem title="Form 2" />
    <ListItem title="Form 3" />
  </List>
);
