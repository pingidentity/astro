import React, { useState } from 'react';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';
import { Meta } from '@storybook/react';

import usePaginationState from '../../hooks/usePaginationState';
import { Box, Button, Item, ListView, ListViewItem, Pagination, PaginationProvider, ScrollBox } from '../../index';
import animals from '../../utils/devUtils/constants/animals';
import { ExampleItemProps } from '../ListView/ListView.stories';

import PaginationReadme from './Pagination.mdx';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => <PaginationReadme />,
    },
    codesandbox: false,
  },
  argTypes: {
    totalCount: {
      control: {
        type: 'number',
      },
    },
    currentPageIndex: {
      control: {
        type: 'number',
      },
    },
    offsetCount: {
      control: {
        type: 'number',
      },
    },
    offsetOptions: {
      control: {
        type: 'array',
      },
    },
    onPageIndexChange: {},
    onOffsetCountChange: {},
  },
} as Meta;

const ExampleComponent = () => {
  const { paginationState } = usePaginationState();
  return (
    <ScrollBox maxHeight="400px">
      <ListView
        items={animals.slice(paginationState.firstRenderedIndex,
          paginationState.lastRenderedIndex + 1).map(_item => (
          {
            name: _item.name,
            key: _item.name,
            id: _item.name,
          }
        ))}
      >
        {(item: ExampleItemProps) => (
          <Item key={item.name}>
            <ListViewItem
              data={{
                text: item.name,
                icon: FormSelectIcon,
              }}
              iconProps={{
                color: 'text.secondary',
              }}
            />
          </Item>
        )}
      </ListView>
    </ScrollBox>
  );
};


export const Default = args => {
  return (
    <Box sx={{ maxWidth: '350px', gap: 'sm' }}>
      <Pagination totalCount={250} {...args} />
    </Box>
  );
};

export const WithListView = () => {
  return (
    <PaginationProvider>
      <Box gap="sm">
        <ExampleComponent />
        <Pagination totalCount={animals.length} />
      </Box>
    </PaginationProvider>
  );
};

export const Controlled = () => {
  const [index, setIndex] = useState(24);
  const [offsetCount, setOffsetCount] = useState(10);

  return (
    <Box sx={{ maxWidth: '350px', gap: 'sm' }}>
      <Button onPress={() => setIndex(0)}>Reset Index</Button>
      <Pagination
        totalCount={250}
        currentPageIndex={index}
        offsetCount={offsetCount}
        onOffsetCountChange={setOffsetCount}
        onPageIndexChange={i => { setIndex(i); }}
      />
    </Box>
  );
};

export const CustomOptions = () => {
  const [index, setIndex] = useState(24);

  const testFunc = key => {
    setIndex(key);
  };
  return (
    <Box sx={{ maxWidth: '350px', gap: 'sm' }}>
      <Pagination
        totalCount={250}
        currentPageIndex={index}
        offsetOptions={[10, 15, 25, 50, 100]}
        onPageIndexChange={key => { testFunc(key); }}
      />
    </Box>
  );
};
