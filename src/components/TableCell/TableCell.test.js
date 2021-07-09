import React from 'react';
import { render, screen } from '@testing-library/react';

import TableCell from './TableCell';
import Table from '../Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';

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
