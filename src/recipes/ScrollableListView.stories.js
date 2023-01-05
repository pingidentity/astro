import React, { useState } from 'react';
import { Item } from '@react-stately/collections';
import CreateIcon from 'mdi-react/CreateIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';

import { SearchField, ListView, Box, IconButton, ScrollBox, Text, Icon } from '../index';

export default {
  title: 'Recipes/Scrollable List View',
};

const unfilteredItems = [
  { key: 'Aardvark', name: 'Aardvark', id: '1' },
  { key: 'Kangaroo', name: 'Kangaroo', id: '2' },
  { key: 'Snake', name: 'Snake', id: '3' },
  { key: 'Dog', name: 'Dog', id: '4' },
  { key: 'Cat', name: 'Cat', id: '5' },
  { key: 'Mouse', name: 'Mouse', id: '6' },
  { key: 'Jaguar', name: 'Jaguar', id: '7' },
  { key: 'Elephant', name: 'Elephant', id: '7' },
];

export const Default = ({ ...args }) => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState(unfilteredItems);

  const filterItems = (input) => {
    const filtered = unfilteredItems.filter((obj) => {
      return obj.name.toLowerCase().includes(input.toLowerCase());
    });
    setItems(filtered);
  };

  const onChangeInput = (input) => {
    setValue(input);
    filterItems(input);
  };

  return (
    <Box>
      <SearchField
        value={value}
        onChange={onChangeInput}
      />
      <ScrollBox
        maxHeight={450}
        hasShadows
      >
        <ListView {...args} items={items}>
          {item => (
            <Item key={item.name} textValue={item.name} >
              <Box isRow >
                <Box isRow mr="auto" alignSelf="center" >
                  <Icon icon={FormSelectIcon} mr="sm" color="text.primary" size={25} />
                  <Text variant="itemTitle" alignSelf="center">{item.name}</Text>
                </Box>
                <Box isRow alignSelf="center">
                  <IconButton aria-label="create-icon" >
                    <Icon icon={CreateIcon} size="sm" />
                  </IconButton>
                  <IconButton aria-label="create-icon" >
                    <Icon icon={MoreVertIcon} size="sm" />
                  </IconButton>
                </Box>
              </Box>
            </Item>
          )}
        </ListView>
      </ScrollBox>
    </Box>
  );
};
