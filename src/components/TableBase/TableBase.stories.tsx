import React, { useEffect, useState } from 'react';
import type { Selection } from 'react-stately';
import { useCollator } from '@react-aria/i18n';
import { useAsyncList } from '@react-stately/data';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  Cell,
  Column,
  Pagination,
  PaginationProvider,
  Row,
  TableBase,
  TBody,
  Text,
  THead,
} from '../..';
import { usePaginationState } from '../../hooks';
import { TableBaseProps } from '../../types/tableBase';
import { items as listData } from '../../utils/devUtils/constants/items';

import TableReadme from './TableBase.mdx';

export default {
  title: 'Experimental/Table',
  component: TableBase,
  parameters: {
    docs: {
      page: () => (
        <>
          <TableReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

const headers = [
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'date',
    name: 'Date',
  },
  {
    key: 'additional_grant',
    name: 'Additional Grant',
  },
  {
    key: 'total_grant',
    name: 'Total Grant',
  },
];

const objects = [
  {
    id: 1,
    type: 'Lorem ipsum',
    date: '2020-06-12',
    additional_grant: '+25,000',
    total_grant: '25,000',
  },
  {
    id: 2,
    type: 'Lorem ipsum',
    date: '2020-10-01',
    additional_grant: '+25,000',
    total_grant: '50,000',
  },
  {
    id: 3,
    type: 'Lorem ipsum',
    date: '2021-01-01',
    additional_grant: '+25,000',
    total_grant: '75,000',
  },
];

const statusVariant = {
  Pending: 'warningStatusBadge',
  Failed: 'criticalStatusBadge',
  Rejected: 'criticalStatusBadge',
  Active: 'healthyStatusBadge',
  Inactive: 'secondaryStatusBadge',
};

export const Default: StoryFn<TableBaseProps<object>> = () => {
  return (
    <TableBase caption="Lorem ipsum" aria-label="table">
      <THead columns={headers}>
        {column => <Column key={column.key}>{column.name}</Column>}
      </THead>
      <TBody items={objects}>
        {item => (
          <Row key={item.id}>
            {columnKey => <Cell>{item[columnKey]}</Cell>}
          </Row>
        )}
      </TBody>
    </TableBase>
  );
};

export const MultiSelection: StoryFn<TableBaseProps<object>> = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(['1', '3']));

  return (
    <TableBase
      caption="Lorem ipsum"
      aria-label="table"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <THead columns={headers}>
        {column => <Column key={column.key}>{column.name}</Column>}
      </THead>
      <TBody items={objects}>
        {item => (
          <Row key={item.id}>
            {columnKey => <Cell>{item[columnKey]}</Cell>}
          </Row>
        )}
      </TBody>
    </TableBase>
  );
};

export const WithStickyHeader: StoryFn<TableBaseProps<object>> = () => {
  return (
    <TableBase
      aria-label="table"
      isStickyHeader
      selectionMode="single"
      defaultSelectedKeys={['2']}
      disabledKeys={['3']}
      tableBodyProps={{ style: { height: '300px' } }}
    >
      <THead>
        <Column width={200}>Name</Column>
        <Column width={300}>Email</Column>
        <Column width={150}>Status</Column>
        <Column width="1fr">Bio</Column>
      </THead>
      <TBody items={listData}>
        {item => (
          <Row key={item.id}>
            <Cell>
              {`${item.firstName} ${item.lastName}`}
              {' '}
              {item.id}
            </Cell>
            <Cell>{item.email}</Cell>
            <Cell>
              <Badge
                variant={statusVariant[item.status]}
                label={item.status}
              />
            </Cell>
            <Cell>
              <Text variant="textEllipsis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                quidem accusantium architecto tempore facere!
              </Text>
            </Cell>
          </Row>
        )}
      </TBody>
    </TableBase>
  );
};

WithStickyHeader.parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast', enabled: false,
        },
        {
          id: 'scrollable-region-focusable', enabled: false,
        },
      ],
    },
  },

};

const ExampleTable = () => {
  const { paginationState } = usePaginationState();
  const renderItems = listData.slice(
    paginationState.firstRenderedIndex,
    paginationState.lastRenderedIndex + 1,
  );

  return (
    <TableBase aria-label="table">
      <THead>
        <Column width={200}>Name</Column>
        <Column width={300}>Email</Column>
        <Column width={150}>Status</Column>
        <Column width="1fr">Bio</Column>
      </THead>
      <TBody items={renderItems}>
        {item => (
          <Row key={item.email}>
            <Cell>
              {`${item.firstName} ${item.lastName}`}
            </Cell>
            <Cell>{item.email}</Cell>
            <Cell>
              <Badge variant={statusVariant[item.status]} label={item.status} />
            </Cell>
            <Cell>
              <Text variant="textEllipsis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                quidem accusantium architecto tempore facere!
              </Text>
            </Cell>
          </Row>
        )}
      </TBody>
    </TableBase>
  );
};

export const WithPagination: StoryFn<TableBaseProps<object>> = () => {
  const [offsetCount, setOffsetCount] = useState(10);

  return (
    <PaginationProvider>
      <Box gap="sm">
        <ExampleTable />
        <Pagination
          totalCount={listData.length}
          offsetCount={offsetCount}
          onOffsetCountChange={setOffsetCount}
          offsetOptions={[10, 20, 50, 100]}
        />
      </Box>
    </PaginationProvider>
  );
};

WithPagination.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const DynamicWithSorting = () => {
  interface ColumnProp {
    key: React.Key;
    name: string;
    isSortable?: boolean;
  }

  const columns: ColumnProp[] = [
    { name: 'Country', key: 'country', isSortable: true },
    { name: 'Population', key: 'population', isSortable: true },
    { name: 'Continent', key: 'continent', isSortable: true },
  ];

  const rows = [
    { id: 1, country: 'Austria', population: '25,000,000', continent: 'Oceania' },
    { id: 2, country: 'Canada', population: '37,000,000', continent: 'North America' },
    { id: 3, country: 'China', population: '1,398,000,000', continent: 'Asia' },
    { id: 4, country: 'Ethiopia', population: '120,000,000', continent: 'Africa' },
    { id: 5, country: 'France', population: '67,000,000', continent: 'Europe' },
    { id: 6, country: 'Mexico', population: '126,000,000', continent: 'North America' },
    { id: 7, country: 'USA', population: '320,000,000', continent: 'North America' },
  ];

  const collator = useCollator({ numeric: true });

  const list = useAsyncList({
    async load() {
      return {
        items: rows,
      };
    },
    async sort({ items, sortDescriptor }) {
      const getNumericValue = str => {
        return !Number.isNaN(str) && parseFloat(str.replace(/,/g, ''));
      };
      return {
        items: items.sort((a, b) => {
          if (sortDescriptor.column) {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];

            const firstNumericValue = getNumericValue(first);
            const secondNumericValue = getNumericValue(second);

            const cmp = (firstNumericValue && secondNumericValue)
              ? firstNumericValue - secondNumericValue
              : collator.compare(first, second);

            return (sortDescriptor.direction === 'descending') ? -cmp : cmp;
          }
          return 1;
        }),
      };
    },
    initialSortDescriptor: { column: 'country', direction: 'ascending' },
  });

  return (
    <TableBase
      aria-label="Dynamic table"
      onSortChange={descriptor => {
        if (descriptor.column) {
          list.sort(descriptor as { column: React.Key; direction: 'ascending' | 'descending' });
        }
      }}
      sortDescriptor={list.sortDescriptor}
    >
      <THead columns={columns}>
        {column => (
          <Column
            minWidth={155}
            allowsSorting
          >
            {column.name}
          </Column>
        )}
      </THead>
      <TBody
        items={list.items as Iterable<{ name: string }>}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {(item: { name: string }) => (
          <Row key={item.name}>
            {columnKey => (
              <Cell>
                {item[columnKey]}
              </Cell>
            )}
          </Row>
        )}
      </TBody>
    </TableBase>
  );
};

// Added to bypass color contrast issue due to virtualizer
DynamicWithSorting.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
