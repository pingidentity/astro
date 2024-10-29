import React from 'react';
import TrashCanOutlineIcon from '@pingux/mdi-react/TrashCanOutlineIcon';

import { Box,
  IconWrapper,
  Item,
  ListView,
  ListViewItem } from '../../../../index';

import { TextSlot } from './ListViewItemNextGen';


const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const items = Array.from({ length: 300 }, (_, index) => {
  const id = (index + 1).toString();
  return {
    key: `Animal${id}`,
    name: `Animal${id}`,
    id,
  };
});

const colors = [
  'cyan',
  'orange',
  'red',
  'green',
  'purple',
  'yellow',
  'teal',
  'pink',
  'yellow',
  'green',
];

const getColor = index => {
  const lastDigit = index % 10;
  return colors[lastDigit];
};

export const ListViewNextGen = () => {
  return (
    <Box backgroundColor="background.base" p="lg">
      <Box
        height="400px"
        backgroundColor="background.base"
      >
        <ListView
          items={items}
          selectionMode="single"
        >
          {items.map((item, index) => (
            <Item
              {...item}
            >
              <ListViewItem
                data={{
                  icon: null,
                }}
                slots={{
                  leftOfData: <IconWrapper color={getColor(index)} icon={TrashCanOutlineIcon} size="md" title={{ name: 'trash can' }} isCircle />,
                  rightOfData: <TextSlot
                    title={item.name}
                    key={item.key}
                    description={loremText}
                  />,
                }}
                hasSeparator={false}
              />
            </Item>
          ),
          )}
        </ListView>
      </Box>

    </Box>
  );
};
