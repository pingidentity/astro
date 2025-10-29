import React from 'react';
import { useAsyncList } from 'react-stately';
import { act as actHooks, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Cell, Column, Row, TBody, THead } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import TableBase from './TableBase';

const testId = 'test-table';

const defaultProps = {
  'aria-label': 'table',
  'data-testid': testId,
  caption: 'Populations of Countries',
};

const headers = [
  {
    key: 'country',
    name: 'Country',
  },
  {
    key: 'population',
    name: 'Population',
  },
  {
    key: 'continent',
    name: 'Continent',
  },
];

const objects = [
  {
    key: '1',
    country: 'USA',
    population: '320,000,000',
    continent: 'South America',
  },
  {
    key: '2',
    country: 'Canada',
    population: '37,000,000',
    continent: 'North America',
  },
  {
    key: '3',
    country: 'China',
    population: '1,398,000,000',
    continent: 'Asia',
  },
  {
    key: '4',
    country: 'France',
    population: '67,000,000',
    continent: 'Europe',
  },
];

const getComponent = (props = {}) => render(
  <TableBase {...defaultProps} {...props}>
    <THead columns={headers}>
      {head => (
        <Column key={head.key}>
          {head.name}
        </Column>
      )}
    </THead>
    <TBody items={objects}>
      {row => (
        <Row key={row.key}>
          {columnKey => (
            <Cell>
              {row[columnKey]}
            </Cell>
          )}
        </Row>
      )}
    </TBody>
  </TableBase>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <TableBase {...defaultProps} {...props}>
      <THead columns={headers}>
        {head => (
          <Column key={head.key}>
            {head.name}
          </Column>
        )}
      </THead>
      <TBody items={objects}>
        {row => (
          <Row key={row.key}>
            {columnKey => (
              <Cell>
                {row[columnKey]}
              </Cell>
            )}
          </Row>
        )}
      </TBody>
    </TableBase>
  ),
});

test('default table', () => {
  getComponent();
  const table = screen.getByTestId(testId);
  expect(table).toBeInTheDocument();
});

test('renders caption', () => {
  getComponent();
  const caption = screen.getByText(defaultProps.caption as string);
  expect(caption).toBeInTheDocument();
});

test('renders table headers', () => {
  getComponent();
  const headerCells = screen.getAllByRole('columnheader');
  expect(headerCells).toHaveLength(headers.length);
  headers.forEach(header => {
    expect(screen.getByText(header.name)).toBeInTheDocument();
  });
});

test('renders table rows', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(objects.length + 1);
  objects.forEach(object => {
    expect(screen.getByText(object.country)).toBeInTheDocument();
    expect(screen.getByText(object.population)).toBeInTheDocument();
    expect(screen.getByText(object.continent)).toBeInTheDocument();
  });
});

test('renders sticky header', () => {
  getComponent({ isStickyHeader: true });
  const stickyHeader = screen.getAllByRole('rowgroup');
  expect(stickyHeader[0]).toHaveClass('is-sticky');
});

test('renders checkbox in case of multi selection', () => {
  getComponent({ selectionMode: 'multiple' });
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(objects.length + 1);
});

test('should change selection on mouse press', () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');

  expect(rows[1]).not.toHaveClass('is-selected');
  userEvent.click(rows[1]);
  expect(rows[1]).toHaveClass('is-selected');
});

test('should change select all checkbox on mouse press', () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');
  rows.forEach(element => {
    userEvent.click(element);
  });
  const headerCheckbox = screen.getByTestId('select-all-checkbox');
  expect(headerCheckbox).toBeChecked();
});

test('should checked checkboxes if selected keys are provided', () => {
  getComponent({ selectionMode: 'multiple', selectedKeys: ['1', '3'] });
  const checkboxes = screen.getAllByRole('checkbox');
  const rows = screen.getAllByRole('row');

  expect(checkboxes[1]).toBeChecked();
  expect(rows[1]).toHaveClass('is-selected');

  expect(checkboxes[2]).not.toBeChecked();
  expect(rows[2]).not.toHaveClass('is-selected');

  expect(checkboxes[3]).toBeChecked();
  expect(rows[3]).toHaveClass('is-selected');

  const headerCheckbox = screen.getByTestId('select-all-checkbox');
  expect(headerCheckbox).toBePartiallyChecked();
});

test('tab key should focus on the first cell of the first row', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  userEvent.tab();
  expect(rows[1]).toHaveFocus();
});

test('Arrow Down key should focus the next row', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowDown' });
  fireEvent.keyUp(rows[1], { key: 'ArrowDown' });
  expect(rows[2]).toHaveFocus();

  fireEvent.keyDown(rows[2], { key: 'ArrowDown' });
  fireEvent.keyUp(rows[2], { key: 'ArrowDown' });
  expect(rows[3]).toHaveFocus();
});

test('Arrow Up key should focus the next row', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowUp' });
  fireEvent.keyUp(rows[1], { key: 'ArrowUp' });

  const columnheader = screen.getAllByRole('columnheader');
  expect(columnheader[0]).toHaveFocus();
});

test('Arrow Right move the focus to next cell', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  const firstRow = screen.getAllByRole('row')[1];
  const tableCells = firstRow.querySelectorAll('td');

  userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowRight' });
  fireEvent.keyUp(rows[1], { key: 'ArrowRight' });
  expect(tableCells[0]).toHaveFocus();

  fireEvent.keyDown(tableCells[0], { key: 'ArrowRight' });
  fireEvent.keyUp(tableCells[0], { key: 'ArrowRight' });
  expect(tableCells[1]).toHaveFocus();

  fireEvent.keyDown(tableCells[1], { key: 'ArrowRight' });
  fireEvent.keyUp(tableCells[1], { key: 'ArrowRight' });
  expect(tableCells[2]).toHaveFocus();

  fireEvent.keyDown(tableCells[2], { key: 'ArrowRight' });
  fireEvent.keyUp(tableCells[2], { key: 'ArrowRight' });
  expect(rows[1]).toHaveFocus();
});

test('Arrow Left move the focus to next cell', () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  const firstRow = screen.getAllByRole('row')[1];
  const tableCells = firstRow.querySelectorAll('td');

  userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowLeft' });
  fireEvent.keyUp(rows[1], { key: 'ArrowLeft' });
  expect(tableCells[2]).toHaveFocus();

  fireEvent.keyDown(tableCells[2], { key: 'ArrowLeft' });
  fireEvent.keyUp(tableCells[2], { key: 'ArrowLeft' });
  expect(tableCells[1]).toHaveFocus();

  fireEvent.keyDown(tableCells[1], { key: 'ArrowLeft' });
  fireEvent.keyUp(tableCells[1], { key: 'ArrowLeft' });
  expect(tableCells[0]).toHaveFocus();

  fireEvent.keyDown(tableCells[0], { key: 'ArrowLeft' });
  fireEvent.keyUp(tableCells[0], { key: 'ArrowLeft' });
  expect(rows[1]).toHaveFocus();
});

describe('Sortable Table with useAsyncList', () => {
  const dataTestId = 'sortableTable';

  const defaultTableProps = {
    'aria-label': 'Custom table with sortable content',
    width: '100%',
    height: '100%',
    'data-testid': dataTestId,
  };

  async function load() {
    return {
      items: objects,
    };
  }

  async function sort(list) {
    // eslint-disable-next-line no-param-reassign
    list.items = list.items.sort((a, b) => {
      const first = a[list.sortDescriptor.column];
      const second = b[list.sortDescriptor.column];
      let cmp = (parseInt(first) || first) < (parseInt(second) || second) // eslint-disable-line
        ? -1
        : 1;
      if (list.sortDescriptor.direction === 'descending') {
        cmp *= -1;
      }
      return cmp;
    });
    return list;
  }

  const sortableDataTable = ({ result }) => render(
    <TableBase {...defaultTableProps} sortDescriptor={result.current.sortDescriptor}>
      <THead columns={headers}>
        {column => (
          <Column allowsSorting>
            {column.name}
          </Column>
        )}
      </THead>
      <TBody items={result.current.items}>
        {(item: object) => (
          <Row>
            {columnKey => (
              <Cell>{item[columnKey]}</Cell>
            )}
          </Row>
        )}
      </TBody>
    </TableBase>,
  );

  test('sort by country column A => Z', async () => {
    const { result } = renderHook(() => useAsyncList({
      load,
      sort,
      initialSortDescriptor: { column: 'country', direction: 'ascending' },
    }));

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    await actHooks(async () => {
      result.current.sort({ column: 'country', direction: 'ascending' });
    });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    const sortableTable = screen.getByTestId(dataTestId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    expect(sortableTable).toHaveAttribute(
      'aria-label',
      'Custom table with sortable content',
    );
    expect(sortableTable).toHaveAttribute('data-testid', dataTestId);

    const rowgroups = within(sortableTable).getAllByRole('rowgroup');

    // verify first header column is sorted a -> z
    const thead = within(rowgroups[0]).getByRole('row');
    const headerCells = within(thead).getAllByRole('columnheader');

    expect(headerCells[0]).toHaveTextContent('Country');
    expect(headerCells[0]).toHaveAttribute('aria-sort', 'ascending');

    const tRows = within(rowgroups[1]).getAllByRole('row');

    // verify country column is sorted a -> z
    expect(tRows).toHaveLength(4);
    expect(tRows[0]).toHaveAttribute('data-key', '2');
    expect(tRows[0]).toHaveTextContent('Canada');

    expect(tRows[1]).toHaveAttribute('data-key', '3');
    expect(tRows[1]).toHaveTextContent('China');

    expect(tRows[2]).toHaveAttribute('data-key', '4');
    expect(tRows[2]).toHaveTextContent('France');

    expect(tRows[3]).toHaveAttribute('data-key', '1');
    expect(tRows[3]).toHaveTextContent('USA');
  });

  test('sort by country column Z => A', async () => {
    const { result } = renderHook(() => useAsyncList({
      load,
      sort,
      initialSortDescriptor: { column: 'country', direction: 'descending' },
    }));

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    await actHooks(async () => {
      result.current.sort({ column: 'country', direction: 'descending' });
    });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    const sortableTable = screen.getByTestId(dataTestId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    expect(sortableTable).toHaveAttribute(
      'aria-label',
      'Custom table with sortable content',
    );
    expect(sortableTable).toHaveAttribute('data-testid', dataTestId);

    const rowgroups = within(sortableTable).getAllByRole('rowgroup');
    const tRows = within(rowgroups[1]).getAllByRole('row');

    // verify country column is sorted z -> a
    expect(tRows).toHaveLength(4);
    expect(tRows[0]).toHaveAttribute('data-key', '1');
    expect(tRows[0]).toHaveTextContent('USA');

    expect(tRows[1]).toHaveAttribute('data-key', '4');
    expect(tRows[1]).toHaveTextContent('France');

    expect(tRows[2]).toHaveAttribute('data-key', '3');
    expect(tRows[2]).toHaveTextContent('China');

    expect(tRows[3]).toHaveAttribute('data-key', '2');
    expect(tRows[3]).toHaveTextContent('Canada');
  });
});
