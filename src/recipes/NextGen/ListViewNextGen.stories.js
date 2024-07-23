import React from 'react';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import {
  AstroProvider,
  Box,
  Item,
  ListView,
  ListViewItem,
  NextGenTheme,
  Text,
} from '../../index';

const items = Array.from({ length: 300 }, (_, index) => {
  const id = (index + 1).toString();
  return {
    key: `Animal${id}`,
    name: `Animal${id}`,
    id,
  };
});

const iconStyles = [
  {
    backgroundColor: 'cyan-100',
    fill: 'cyan-800',
    color: 'cyan-800',
  },
  {
    backgroundColor: 'pink-100',
    color: 'pink-800',
    fill: 'pink-800',
  },
  {
    backgroundColor: 'green-100',
    color: 'green-800',
    fill: 'green-800',
  },
  {
    backgroundColor: 'orange-100',
    color: 'orange-800',
    fill: 'orange-800',
  },
  {
    backgroundColor: 'blue-100',
    color: 'blue-800',
    fill: 'blue-800',
  },
  {
    backgroundColor: 'red-100',
    color: 'red-800',
    fill: 'red-800',
  },
  {
    backgroundColor: 'teal-100',
    color: 'teal-800',
    fill: 'teal-800',
  },
  {
    backgroundColor: 'yellow-100',
    color: 'yellow-800',
    fill: 'yellow-800',
  },
  {
    backgroundColor: 'indigo-100',
    color: 'indigo-800',
    fill: 'indigo-800',
  },
  {
    backgroundColor: 'purple-100',
    color: 'purple-800',
    fill: 'purple-800',
  },
];

const createIcons = index => {
  const lastDigit = index % 10;

  return {
    size: '32px',
    sx: {
      borderRadius: '50%',
      padding: '6px',
      ...iconStyles[lastDigit],
    },
  };
};

export default {
  title: 'Next Gen Recipes/ListView',
};

export const Default = () => {
  return (
    <Box backgroundColor="white">
      <AstroProvider themeOverrides={[NextGenTheme]}>
        <Box
          height="400px"
          backgroundColor="white"
        >
          <ListView
            items={items}
            selectionMode="single"
          >
            {items.map((item, index) => (
              <Item
                key={item.name}
                {...item}
                index={index}
              >
                <ListViewItem
                  sx={{
                  }}
                  data={{
                    text: item.name,
                    icon: FormSelectIcon,
                  }}
                  iconProps={{ ...createIcons(index) }}
                  hasSeparator={false}
                  index={index}
                  items={items}
                />
              </Item>
            ),
            )}
          </ListView>
        </Box>
      </AstroProvider>
    </Box>
  );
};

export const Expandable = () => {
  return (
    <Box backgroundColor="white">
      <AstroProvider themeOverrides={[NextGenTheme]}>
        <Box
          height="400px"
          backgroundColor="white"
        >
          <ListView
            items={items}
            selectionMode="expansion"
          >
            {items.map((item, index) => (
              <Item
                key={item.name}
                {...item}
                index={index}
              >
                <ListViewItem
                  data={{
                    text: item.name,
                    icon: FormSelectIcon,
                  }}
                  iconProps={{ ...createIcons(index) }}
                  hasSeparator={false}
                  index={index}
                  items={items}
                />
                <Box py="lg" px="sm">
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque vitae lacinia diam, nec ullamcorper neque.
                    In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.

                  </Text>
                </Box>
              </Item>
            ),
            )}
          </ListView>
        </Box>
      </AstroProvider>
    </Box>
  );
};
