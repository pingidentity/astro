import React from 'react';
import { Item } from '@react-stately/collections';
import CreateIcon from 'mdi-react/CreateIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import { useAsyncList } from '@react-stately/data';
import { action } from '@storybook/addon-actions';
import ListView from '.';
import Box from '../Box/Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';
import loadingStates from '../../utils/devUtils/constants/loadingStates';

export default {
  title: 'ListView',
  component: ListView,
  argTypes: {
    loadingState: {
      control: {
        type: 'select',
        options: loadingStates,
      },
    },
    disabledKeys: {
      defaultValue: ['Snake'],
    },
    items: {
      control: {
        type: 'none',
      },
    },
    onSelectionChange: {
      control: 'none',
      // eslint-disable-next-line no-console
      defaultValue: console.log,
    },
  },
};

const items = [
  { key: 'Aardvark', name: 'Aardvark', id: '1' },
  { key: 'Kangaroo', name: 'Kangaroo', id: '2' },
  { key: 'Snake', name: 'Snake', id: '3' },
];

const props = {
  disabledKeys: ['Snake'],
};


const actions = {
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
  onLoadMore: action('onLoadMore'),
};

const ListElement = ({ item }) => (
  <Box isRow >
    <Box isRow mr="auto" alignSelf="center" >
      <Icon icon={FormSelectIcon} mr="sm" color="text.primary" size={25} />
      <Text variant="itemTitle" alignSelf="center">{item.name}</Text>
    </Box>
    <Box isRow alignSelf="center">
      <IconButton aria-label="create-icon" size={20} >
        <CreateIcon />
      </IconButton>
      <IconButton aria-label="create-icon" size={20} >
        <MoreVertIcon />
      </IconButton>
    </Box>
  </Box>
);

export const Default = ({ ...args }) => (
  <ListView {...props} {...args} items={items} >
    {item => (
      <Item key={item.name} textValue={item.name}>
        <ListElement item={item} />
      </Item>
    )}
  </ListView>
);

export const InfiniteLoadingList = () => {
  const list = useAsyncList({
    async load({ signal, cursor, filterText }) {
      if (cursor) {
        // eslint-disable-next-line
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // If no cursor is available, then we're loading the first page,
      // filtering the results returned via a query string that
      // mirrors the ComboBox input text.
      // Otherwise, the cursor is the next URL to load,
      // as returned from the previous page.
      const res = await fetch(
        cursor || `https://swapi.dev/api/people/?search=${filterText}`,
        { signal },
      );
      const json = await res.json();
      // The API is too fast sometimes, so make it take longer so we can see the loader
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <Box
      sx={{
        maxHeight: '600px',
      }}
    >
      <ListView
        {...actions}
        items={list.items}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {item => (
          <Item key={item.name} textValue={item.name}>
            <ListElement item={item} />
          </Item>
        )}
      </ListView>
    </Box>
  );
};

export const MultipleSelection = ({ ...args }) => (
  <ListView {...props} {...args} items={items} selectionMode="multiple">
    {item => (
      <Item key={item.name} textValue={item.name}>
        <ListElement item={item} />
      </Item>
    )}
  </ListView>
);
