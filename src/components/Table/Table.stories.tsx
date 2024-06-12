import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';
import { TableProps } from '../../types';

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
} as Meta;

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

export const Default: StoryFn<TableProps> = () => {
  return (
    <Table>
      <TableCaption>
        <Text fontWeight={3} fontSize="lg">{caption}</Text>
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
  );
};
