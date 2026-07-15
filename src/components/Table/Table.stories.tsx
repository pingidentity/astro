import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Card,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '../../index';
import { TableProps } from '../../types';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import TableReadme from './Table.mdx';

export default {
  title: 'Components/Table',
  component: Table,
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
  args: {
    id: 'table',
  },
  argTypes: {
    id: {
      description: 'Unique HTML id attribute applied to the table element.',
      control: { type: 'text' },
    },
    ...ariaAttributeBaseArgTypes,
  } as unknown as Meta<typeof Table>['argTypes'],
} satisfies Meta<typeof Table>;

const caption = 'Lorem Ipsum';

const headers = [
  'Type', 'Date', 'Additional Grant', 'Total Grant',
];

const objects = [
  {
    type: 'Lorem ipsum',
    date: '2020-06-12',
    additional_grant: '+25,000',
    total_grant: '25,000',
  },
  {
    type: 'Lorem ipsum',
    date: '2020-10-01',
    additional_grant: '+25,000',
    total_grant: '50,000',
  },
  {
    type: 'Lorem ipsum',
    date: '2021-01-01',
    additional_grant: '+25,000',
    total_grant: '75,000',
  },
];

export const Default: StoryFn<TableProps> = args => {
  return (
    <Card variant="cards.tableWrapper">
      <Table {...args}>
        <TableCaption>
          {caption}
        </TableCaption>
        <TableHead>
          <TableRow key="head">
            {headers.map(head => (
              <TableCell isHeading key={head}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map(object => (
            <TableRow key={object.date}>
              {Object.values(object).map(value => (
                <TableCell key={value}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
