import React from 'react';
import { render, screen } from '@testing-library/react';

import axeTest from '../../utils/testUtils/testAxe';
import Table from '../Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';

import TableCell from './TableCell';

const testId = 'test-cell';

const defaultProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render(
  <Table>
    <TableBody>
      <TableRow>
        <TableCell {...props} {...defaultProps}>
          Here is text.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('isHeading = true', () => {
  const props = {
    isHeading: true,
  };
  getComponent(props);
  const header = screen.getByRole('columnheader');
  expect(header).toBeInTheDocument();
});

test('isHeading = false', () => {
  const props = {
    isHeading: false,
  };
  getComponent(props);
  const cell = screen.getByRole('cell');
  expect(cell).toBeInTheDocument();
});
