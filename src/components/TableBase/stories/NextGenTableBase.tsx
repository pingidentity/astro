import React from 'react';

import { Card, Cell, Column, Row, TableBase, TBody, THead } from '../../..';

const NextGenTableBase = () => {
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

export default NextGenTableBase;
