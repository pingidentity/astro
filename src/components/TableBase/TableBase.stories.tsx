import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Card,
  Cell,
  Column,
  Row,
  TableBase,
  TBody,
  THead,
} from '../..';
import { TableProps } from '../../types';
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

export const Default: StoryFn<TableProps> = () => {
  return (
    <Card variant="cards.tableWrapper">
      <TableBase
        caption="Lorem ipsum"
        aria-label="table"
      >
        <THead columns={headers}>
          {column => (
            <Column key={column.key}>
              {column.name}
            </Column>
          )}
        </THead>
        <TBody items={objects}>
          {item => (
            <Row key={item.id}>
              {columnKey => (
                <Cell>
                  {item[columnKey]}
                </Cell>
              )}
            </Row>
          )}
        </TBody>
      </TableBase>
    </Card>
  );
};

export const Customization: StoryFn<TableProps> = () => {
  const statusVariant = {
    'Pending': 'warningStatusBadge',
    'Failed': 'criticalStatusBadge',
    'Rejected': 'criticalStatusBadge',
    'Active': 'healthyStatusBadge',
    'Inactive': 'secondaryStatusBadge',
  };

  return (
    <Card variant="cards.tableWrapper">
      <TableBase
        aria-label="table"
      >
        <THead>
          <Column width={70}>
            #
          </Column>
          <Column>
            Name
          </Column>
          <Column>
            Email
          </Column>
          <Column>
            Status
          </Column>
          <Column>
            Bio
          </Column>
        </THead>
        <TBody items={items}>
          {item => (
            <Row key={item.email}>
              <Cell>
                {item.id}
              </Cell>
              <Cell {...{ noWrap: true }}>
                {item.firstName}
                {' '}
                {item.lastName}
              </Cell>
              <Cell {...{ noWrap: true }}>
                {item.email}
              </Cell>
              <Cell>
                <Badge variant={statusVariant[item.status]} label={item.status} />
              </Cell>
              <Cell>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quo quidem accusantium architecto tempore facere!
              </Cell>
            </Row>
          )}
        </TBody>
      </TableBase>
    </Card>
  );
};
