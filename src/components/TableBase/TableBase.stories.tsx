import React, { useState } from 'react';
import type { Selection } from 'react-stately';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Card,
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
import { items } from '../../utils/devUtils/constants/items';

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
      tableBodyProps={{ style: { height: '300px' } }}
    >
      <THead>
        <Column width={200}>Name</Column>
        <Column width={300}>Email</Column>
        <Column width={150}>Status</Column>
        <Column width="1fr">Bio</Column>
      </THead>
      <TBody items={items}>
        {item => (
          <Row key={item.email}>
            <Cell>
              {`${item.firstName} ${item.lastName}`}
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

const ExampleTable = () => {
  const { paginationState } = usePaginationState();
  const renderItems = items.slice(
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
      <ExampleTable />
      <Pagination
        totalCount={items.length}
        offsetCount={offsetCount}
        onOffsetCountChange={setOffsetCount}
        offsetOptions={[10, 20, 50, 100]}
      />
    </PaginationProvider>
  );
};
