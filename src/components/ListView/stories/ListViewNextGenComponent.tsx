import React, { useRef } from 'react';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';
import TrashCanOutlineIcon from '@pingux/mdi-react/TrashCanOutlineIcon';

import {
  Box,
  Item,
  ListView,
  ListViewItem,
  ListViewItemChart,
  ListViewItemMenu,
  ListViewItemSwitchField,
  SearchField,
  Text,
} from '../../..';
import { chartData } from '../../ListViewItem/controls/chart/chartData';

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const items = Array.from({ length: 10 }, (_, index) => {
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
  const chartContainerRef = useRef();

  const Controls = () => (
    <>
      <ListViewItemSwitchField />
      <ListViewItemMenu>
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListViewItemMenu>
    </>
  );

  return (
    <Box backgroundColor="background.base" p="lg">
      <Box height="400px" mb="xl">
        <Text as="h2" mb="md">ListView</Text>
        <ListView items={items} selectionMode="single">
          {items.map((item, index) => (
            <Item {...item}>
              <ListViewItem
                data={{
                  icon: TrashCanOutlineIcon,
                  text: item.name,
                  subtext: loremText,
                }}
                iconWrapperProps={{
                  size: 'md',
                  color: getColor(index),
                }}
                hasSeparator={false}
              />
            </Item>
          ))}
        </ListView>
      </Box>

      <Box height="400px" mb="xl">
        <Text as="h2" mb="md">ListView with Expanded Items</Text>
        <ListView
          items={items}
          selectionMode="expansion"
          expandedKeys={['Animal1']}
        >
          {item => (
            <Item key={item.name} textValue={item.name}>
              <Box isRow sx={{ alignItems: 'center' }}>
                <Text variant="itemTitle">{item.name}</Text>
              </Box>
              <Box sx={{ my: 'lg' }}>
                <SearchField
                  value="Animal1"
                  maxWidth="400px"
                  aria-label="Search"
                  placeholder="Search"
                />
                <Text sx={{ mt: 'md', fontWeight: '1' }}>
                  Lorem ipsum dolor sit amet consectetur. Viverra nulla nec
                  velit sollicitudin sed nisi mi gravida. Maecenas vestibulum
                  pretium dictum dictum tempus. Sit et rutrum hendrerit facilisi
                  turpis tellus elementum. Egestas consectetur in ac id. Sit
                  aliquam et ut pellentesque in at blandit sed. Sapien morbi
                  cras eleifend lectus.
                </Text>
              </Box>
            </Item>
          )}
        </ListView>
      </Box>

      <Box height="400px">
        <Text as="h2" mb="md">ListView with Charts</Text>
        <ListView items={items}>
          {item => (
            <Item key={item.name}>
              <ListViewItem
                ref={chartContainerRef}
                data={{
                  text: item.name,
                  subtext: item.subtext,
                  icon: FormSelectIcon,
                }}
                iconProps={{
                  color: 'text.secondary',
                }}
              >
                <ListViewItemChart
                  containerRef={chartContainerRef}
                  chartData={chartData}
                  chartDataKey="fullData"
                  title="Avg daily sign-ons:"
                  contentCount="31"
                  contentCountLabel="Past 7 days"
                  chartLabel="12 wk trend"
                  trend="+115.0%"
                  tooltipText="See Contributing Data"
                  ariaLabel={item.name}
                />
                <Controls />
              </ListViewItem>
            </Item>
          )}
        </ListView>
      </Box>
    </Box>
  );
};
