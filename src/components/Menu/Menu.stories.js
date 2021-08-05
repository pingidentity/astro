import React from 'react';
import { Item } from '@react-stately/collections';
import Menu from '../Menu';
import Text from '../Text';


export default {
  title: 'Menu',
  component: Menu,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    selectionMode: {},
    isDisabled: {},
    'aria-label': {
      control: {
        type: 'text',
      },
    },
    'aria-labelledby': {
      control: {
        type: 'text',
      },
    },
    'aria-describedby': {
      control: {
        type: 'text',
      },
    },
    'aria-details': {
      control: {
        type: 'text',
      },
    },
    isSelected: {
      control: {
        type: 'none',
      },
    },
    disabledKeys: {
      control: {
        type: 'none',
      },
    },
    defaultSelectedKeys: {
      control: {
        type: 'none',
      },
    },
    selectedKeys: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = ({ ...args }) => {
  return (
    <Menu aria-label="Example Menu" {...args}>
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
