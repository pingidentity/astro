import React from 'react';
import { render, screen } from '@testing-library/react';

import Table from './Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableHead from '../TableHead';

import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-table';

const defaultProps = {
  'data-testid': testId,
};

const headers = [
  'Country', 'Population', 'Continent',
];

const objects = [
  {
    country: 'USA',
    population: '320,000,000',
    continent: 'North America',
  },
  {
    country: 'Canada',
    population: '37,000,000',
    continent: 'North America',
  },
  {
    country: 'China',
    population: '1,398,000,000',
    continent: 'Asia',
  },
  {
    country: 'France',
    population: '67,000,000',
    continent: 'Europe',
  },
];

const getComponent = () => render(
  <Table {...defaultProps}>
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
        <TableRow key={object.country}>
          {Object.values(object).map(value => (
            <TableCell key={value}>
              {value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default table', () => {
  getComponent();
  const table = screen.getByTestId(testId);
  expect(table).toBeInstanceOf(HTMLTableElement);
  expect(table).toBeInTheDocument();
});
