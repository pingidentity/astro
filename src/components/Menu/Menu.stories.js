import React from 'react';
import { Item } from '@react-stately/collections';
import Menu from '../Menu';
import Text from '../Text';


export default {
  title: 'Menu',
  component: Menu,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const Default = () => {
  return (
    <Menu aria-label="Example Menu">
      <Item key="edit" textValue="Edit">
        <Text>Edit</Text>
      </Item>
      <Item key="duplicate" textValue="Duplicate">
        <Text>Duplicate</Text>
      </Item>
      <Item key="delete" textValue="Delete">
        <Text color="critical.bright">Delete</Text>
      </Item>
    </Menu>
  );
};
