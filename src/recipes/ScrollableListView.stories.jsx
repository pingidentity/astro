import React, { useState } from 'react';
import { Item } from 'react-stately';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import {
  Box,
  ListView,
  ListViewItem,
  ListViewItemEditButton,
  ListViewItemMenu,
  ScrollBox,
  SearchField,
} from '../index';

export default {
  title: 'Recipes/Scrollable List View',
};

export const ScrollableListView = () => {
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

  const [value, setValue] = useState('');
  const [scrollableListViewItems, setScrollableListViewItems] = useState(unfilteredItems);

  const filterItems = input => {
    const filtered = unfilteredItems.filter(obj => {
      return obj.name.toLowerCase().includes(input.toLowerCase());
    });
    setScrollableListViewItems(filtered);
  };

  const onChangeInput = input => {
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
        <ListView items={scrollableListViewItems}>
          {item => (
            <Item key={item.name}>
              <ListViewItem
                data={{
                  icon: FormSelectIcon,
                  text: item.name,
                }}
              >
                <ListViewItemEditButton />
                <ListViewItemMenu>
                  <Item key="enable">Enable user</Item>
                  <Item key="disable">Disable user</Item>
                  <Item key="delete">Delete user</Item>
                </ListViewItemMenu>
              </ListViewItem>
            </Item>
          )}
        </ListView>
      </ScrollBox>
    </Box>
  );
};
