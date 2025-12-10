import React from 'react';
import { render, screen } from '@testing-library/react';

import { TableCellProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Table from '../Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';

import TableCell from './TableCell';

const testId = 'test-cell';

const defaultProps: TableCellProps = {
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

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell {...props}>
            Here is text.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
});

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
