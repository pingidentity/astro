/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { useAsyncList } from 'react-stately';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { act as actHooks, renderHook } from '@testing-library/react-hooks';

import {
  DataTableBody,
  DataTableCell,
  DataTableColumn,
  DataTableHeader,
  DataTableRow,
} from '../../index';

import DataTable from './DataTable';


let offsetWidth;
let offsetHeight;

beforeAll(() => {
  offsetWidth = jest
    .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => 1000);
  offsetHeight = jest
    .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => 1000);
  jest.useFakeTimers();
});

afterAll(() => {
  offsetWidth.mockReset();
  offsetHeight.mockReset();
});

const columns = [
  { name: 'Country', key: 'country' },
  { name: 'Population', key: 'population' },
  { name: 'Continent', key: 'continent' },
];

const rows = [
  {
    id: 1,
    country: 'USA',
    population: 320000000,
    continent: 'North America',
  },
  {
    id: 2,
    country: 'Canada',
    population: 37000000,
    continent: 'North America',
  },
  { id: 3, country: 'China', population: 1398000000, continent: 'Asia' },
  { id: 4, country: 'France', population: 67000000, continent: 'Europe' },
];

const getCell = (view, text) => {
  // Find by text, then go up to the element with the cell role.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  let el = view.getByText(text);
  while (
    el
    && !/gridcell|rowheader|columnheader/.test(el.getAttribute('role'))
  ) {
    el = el.parentElement;
  }

  return el;
};

const focusCell = (tree, text) => act(() => getCell(tree, text).focus());
const moveFocus = (key, opts = {}) => {
  fireEvent.keyDown(document.activeElement, { key, ...opts });
};

describe('Static DataTable', () => {
  const testId = 'staticTable';
  const defaultProps = {
    'aria-label': 'Default table with static content',
    width: '100%',
    height: '100%',
    density: 'spacious',
    'data-testid': testId,
  };

  const staticDataTable = () => render(
    <DataTable {...defaultProps}>
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn align="center">{column.name}</DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={rows}>
        {item => (
          <DataTableRow>
            {columnKey => <DataTableCell>{item[columnKey]}</DataTableCell>}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>,
  );

  test('renders DataTable component with static content', () => {
    staticDataTable();

    const staticTable = screen.getByTestId(testId);
    expect(staticTable).toBeInTheDocument();
    expect(staticTable).toBeVisible();

    expect(staticTable).toHaveAttribute(
      'aria-label',
      'Default table with static content',
    );
    expect(staticTable).toHaveAttribute('data-testid', testId);
    expect(staticTable).toHaveAttribute('aria-rowcount', '5');
    expect(staticTable).toHaveAttribute('aria-colcount', '3');

    const rowgroups = within(staticTable).getAllByRole('rowgroup');
    expect(rowgroups).toHaveLength(2);

    const headers = within(staticTable).getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveAttribute('aria-colindex', '1');
    expect(headers[1]).toHaveAttribute('aria-colindex', '2');
    expect(headers[2]).toHaveAttribute('aria-colindex', '3');

    // eslint-disable-next-line no-unused-vars, no-restricted-syntax
    for (const header of headers) {
      expect(header).not.toHaveAttribute('aria-sort');
      expect(header).not.toHaveAttribute('aria-describedby');
    }

    expect(headers[0]).toHaveTextContent(columns[0].name);
    expect(headers[1]).toHaveTextContent(columns[1].name);
    expect(headers[2]).toHaveTextContent(columns[2].name);

    const tRows = within(rowgroups[1]).getAllByRole('row');
    expect(tRows).toHaveLength(4);
    expect(tRows[0]).toHaveAttribute('aria-rowindex', '2');
    expect(tRows[1]).toHaveAttribute('aria-rowindex', '3');
    expect(tRows[2]).toHaveAttribute('aria-rowindex', '4');
    expect(tRows[3]).toHaveAttribute('aria-rowindex', '5');

    let rowheader = within(tRows[0]).getByRole('rowheader');
    expect(rowheader).toHaveTextContent(rows[0].country);
    expect(rowheader).toHaveAttribute('aria-colindex', '1');

    rowheader = within(tRows[1]).getByRole('rowheader');
    expect(rowheader).toHaveTextContent(rows[1].country);
    expect(rowheader).toHaveAttribute('aria-colindex', '1');

    rowheader = within(tRows[2]).getByRole('rowheader');
    expect(rowheader).toHaveTextContent(rows[2].country);
    expect(rowheader).toHaveAttribute('aria-colindex', '1');

    rowheader = within(tRows[3]).getByRole('rowheader');
    expect(rowheader).toHaveTextContent(rows[3].country);
    expect(rowheader).toHaveAttribute('aria-colindex', '1');

    const cells = within(rowgroups[1]).getAllByRole('gridcell');
    expect(cells).toHaveLength(8);

    expect(cells[0]).toHaveAttribute('aria-colindex', '2');
    expect(cells[1]).toHaveAttribute('aria-colindex', '3');
    expect(cells[2]).toHaveAttribute('aria-colindex', '2');
    expect(cells[3]).toHaveAttribute('aria-colindex', '3');
    expect(cells[4]).toHaveAttribute('aria-colindex', '2');
    expect(cells[5]).toHaveAttribute('aria-colindex', '3');
    expect(cells[6]).toHaveAttribute('aria-colindex', '2');
    expect(cells[7]).toHaveAttribute('aria-colindex', '3');
  });

  test('should move focus to the next cell in a row with ArrowRight', () => {
    const view = staticDataTable();
    focusCell(view, 'USA');
    moveFocus('ArrowRight');
    // eslint-disable-next-line jest-dom/prefer-focus
    expect(document.activeElement).toBe(getCell(view, 320000000));
  });

  test('should move focus to the previous cell in a row with ArrowLeft', () => {
    const view = staticDataTable();
    focusCell(view, 'Asia');
    moveFocus('ArrowLeft');
    expect(getCell(view, 1398000000)).toHaveFocus();
  });

  test('should move focus to the next cell in a row with ArrowUp', () => {
    const view = staticDataTable();
    focusCell(view, 'China');
    moveFocus('ArrowUp');
    // eslint-disable-next-line jest-dom/prefer-focus
    expect(document.activeElement).toBe(getCell(view, 'Canada'));
  });

  test('should move focus to the previous cell in a row with ArrowDown', () => {
    const view = staticDataTable();
    focusCell(view, 'Asia');
    moveFocus('ArrowDown');
    expect(getCell(view, 'Europe')).toHaveFocus();
  });
});

describe('Async DataTable', () => {
  test('renders a spinner when loading', () => {
    const testId = 'loadingTable';
    const defaultProps = {
      'aria-label': 'Custom table with loading content',
      width: '100%',
      height: 565,
      density: 'spacious',
      'data-testid': testId,
    };

    render(
      <DataTable {...defaultProps}>
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn align="center">{column.name}</DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody loadingState="loading">{[]}</DataTableBody>
      </DataTable>,
    );

    const asyncTable = screen.getByTestId(testId);
    expect(asyncTable).toBeInTheDocument();
    expect(asyncTable).toBeVisible();

    expect(asyncTable).toHaveAttribute(
      'aria-label',
      'Custom table with loading content',
    );
    expect(asyncTable).toHaveAttribute('data-testid', testId);

    const tRows = within(asyncTable).getAllByRole('row');
    expect(tRows).toHaveLength(2);
    expect(tRows[1]).toHaveAttribute('aria-rowindex', '2');

    const cell = within(tRows[1]).getByRole('rowheader');
    expect(cell).toHaveAttribute('aria-colspan', '3');

    const spinner = within(cell).getByRole('alert');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toBeVisible();
    expect(spinner).toHaveAttribute('aria-label', 'loading');
    expect(spinner).toHaveAttribute('aria-live', 'assertive');
    expect(spinner).not.toHaveAttribute('aria-valuenow');
  });

  test('calls onLoadMore when scrolling near the bottom', () => {
    const testId = 'onLoadMoreTable';
    const defaultProps = {
      'aria-label': 'Custom table with onLoadMore',
      width: '100%',
      height: 565,
      density: 'spacious',
      'data-testid': testId,
    };

    const items = [];
    for (let i = 1; i <= 100; i += 1) {
      items.push({
        id: i,
        country: `Country ${i}`,
        population: `${i}`,
        continent: `Continent ${i}`,
      });
    }

    const onLoadMore = jest.fn();

    render(
      <DataTable {...defaultProps}>
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn align="center">{column.name}</DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody items={items} onLoadMore={onLoadMore}>
          {item => (
            <DataTableRow>
              {columnKey => (
                <DataTableCell>{item[columnKey]}</DataTableCell>
              )}
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>,
    );

    const asyncTable = screen.getByTestId(testId);
    expect(asyncTable).toBeInTheDocument();
    expect(asyncTable).toBeVisible();
    expect(asyncTable).toHaveAttribute(
      'aria-label',
      'Custom table with onLoadMore',
    );

    const body = screen.getAllByRole('rowgroup')[1];
    const scrollView = body.parentNode.parentNode;

    scrollView.scrollTop = 250;
    fireEvent.scroll(scrollView);
    act(() => {
      jest.runAllTimers();
    });

    scrollView.scrollTop = 1500;
    fireEvent.scroll(scrollView);
    act(() => {
      jest.runAllTimers();
    });

    scrollView.scrollTop = 2800;
    fireEvent.scroll(scrollView);
    act(() => {
      jest.runAllTimers();
    });

    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  test('renders a spinner at the bottom when loading more', () => {
    const testId = 'loadingMoreTable';
    const defaultProps = {
      'aria-label': 'Custom table with loadingMore',
      width: '100%',
      height: '100%',
      density: 'spacious',
      'data-testid': testId,
    };

    render(
      <DataTable {...defaultProps}>
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn align="center">{column.name}</DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody items={rows} loadingState="loadingMore">
          {item => (
            <DataTableRow>
              {columnKey => (
                <DataTableCell>{item[columnKey]}</DataTableCell>
              )}
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>,
    );

    const asyncTable = screen.getByTestId(testId);
    expect(asyncTable).toBeInTheDocument();
    expect(asyncTable).toBeVisible();
    expect(asyncTable).toHaveAttribute(
      'aria-label',
      'Custom table with loadingMore',
    );

    expect(asyncTable).toHaveAttribute('data-testid', testId);
    expect(asyncTable).toHaveAttribute('aria-rowcount', '5');
    expect(asyncTable).toHaveAttribute('aria-colcount', '3');

    const rowgroups = within(asyncTable).getAllByRole('rowgroup');
    expect(rowgroups).toHaveLength(2);

    const tRows = within(asyncTable).getAllByRole('row');
    expect(tRows).toHaveLength(6);
    expect(tRows[5]).toHaveAttribute('aria-rowindex', '6');

    const cell = within(tRows[5]).getByRole('rowheader');
    expect(cell).toHaveAttribute('aria-colspan', '3');

    const spinner = within(cell).getByRole('alert');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toBeVisible();
    expect(spinner).toHaveAttribute('aria-label', 'loadingMore');
    expect(spinner).toHaveAttribute('aria-live', 'assertive');
    expect(spinner).not.toHaveAttribute('aria-valuenow');
  });
});

describe('Sortable DataTable', () => {
  const testId = 'sortableTable';
  const defaultProps = {
    'aria-label': 'Custom table with sortable content',
    width: '100%',
    height: '100%',
    density: 'spacious',
    'data-testid': testId,
  };

  test('sorting', () => {
    render(
      <DataTable {...defaultProps}>
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn align="center" allowsSorting>
              {column.name}
            </DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody items={rows}>
          {item => (
            <DataTableRow>
              {columnKey => (
                <DataTableCell>{item[columnKey]}</DataTableCell>
              )}
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>,
    );

    const sortableTable = screen.getByTestId(testId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    expect(sortableTable).toHaveAttribute(
      'aria-label',
      'Custom table with sortable content',
    );
    expect(sortableTable).toHaveAttribute('data-testid', testId);
    expect(sortableTable).toHaveAttribute('aria-rowcount', '5');
    expect(sortableTable).toHaveAttribute('aria-colcount', '3');

    const sortableGrid = screen.getByRole('grid');
    const columnheaders = within(sortableGrid).getAllByRole('columnheader');

    expect(columnheaders).toHaveLength(3);
    expect(columnheaders[0]).toHaveAttribute('aria-sort', 'none');
    expect(columnheaders[1]).toHaveAttribute('aria-sort', 'none');
    expect(columnheaders[2]).toHaveAttribute('aria-sort', 'none');
    expect(columnheaders[0]).toHaveAttribute('aria-describedby');
    expect(
      document.getElementById(columnheaders[0].getAttribute('aria-describedby')),
    ).toHaveTextContent('sortable column');
    expect(columnheaders[1]).toHaveAttribute('aria-describedby');
    expect(
      document.getElementById(columnheaders[1].getAttribute('aria-describedby')),
    ).toHaveTextContent('sortable column');
    expect(columnheaders[1]).toHaveAttribute('aria-describedby');
    expect(
      document.getElementById(columnheaders[1].getAttribute('aria-describedby')),
    ).toHaveTextContent('sortable column');
  });
});

describe('Sortable with useAsyncList', () => {
  const ITEMS = [{ id: 1, name: '1' }, { id: 2, name: '2' }];
  const ITEMS2 = [{ id: 2, name: '1' }, { id: 1, name: '2' }];

  function getItems() {
    return new Promise(resolve => {
      setTimeout(() => resolve({ items: ITEMS }));
    });
  }

  function getItems2() {
    return new Promise(resolve => {
      setTimeout(() => resolve({ items: ITEMS2 }));
    });
  }

  test('should call load function', async () => {
    const load = jest.fn().mockImplementation(getItems);
    const { result } = renderHook(() => useAsyncList({ load }));

    expect(load).toHaveBeenCalledTimes(1);
    expect(result.current.items).toEqual([]);

    await actHooks(async () => {
      jest.runAllTimers();
    });

    expect(result.current.items).toEqual(ITEMS);
  });

  test('should call sort function', async () => {
    const load = jest.fn().mockImplementation(getItems);
    const sort = jest.fn().mockImplementation(getItems2);
    const { result } = renderHook(() => useAsyncList({
      load,
      sort,
      initialSortDescriptor: { direction: 'ASC' },
    }));

    expect(load).toHaveBeenCalledTimes(1);
    let args = load.mock.calls[0][0];
    expect(args.sortDescriptor).toEqual({ direction: 'ASC' });
    expect(result.current.items).toEqual([]);

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.items).toEqual(ITEMS);

    await actHooks(async () => {
      result.current.sort({ column: 'name' });
    });

    expect(result.current.items).toEqual(ITEMS);
    expect(sort).toHaveBeenCalledTimes(1);
    args = sort.mock.calls[0][0];
    expect(args.items).toStrictEqual(ITEMS);

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.items).toEqual(ITEMS2);
  });
});

describe('Sortable DataTable with useAsyncList', () => {
  const testId = 'sortableTable';
  const defaultProps = {
    'aria-label': 'Custom table with sortable content',
    width: '100%',
    height: '100%',
    density: 'spacious',
    'data-testid': testId,
  };

  async function load() {
    return {
      items: rows,
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
    <DataTable {...defaultProps}>
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn align="center" allowsSorting>
            {column.name}
          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={result.current.items}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell>{item[columnKey]}</DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>,
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
      result.current.sort();
    });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    const sortableTable = screen.getByTestId(testId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    expect(sortableTable).toHaveAttribute(
      'aria-label',
      'Custom table with sortable content',
    );
    expect(sortableTable).toHaveAttribute('data-testid', testId);
    expect(sortableTable).toHaveAttribute('aria-rowcount', '5');
    expect(sortableTable).toHaveAttribute('aria-colcount', '3');

    const rowgroups = within(sortableTable).getAllByRole('rowgroup');
    const tRows = within(rowgroups[1]).getAllByRole('row');

    // verify country column is sorted a -> z
    expect(tRows).toHaveLength(4);
    expect(tRows[0]).toHaveAttribute('aria-rowindex', '2');
    expect(tRows[0]).toHaveTextContent('Canada');

    expect(tRows[1]).toHaveAttribute('aria-rowindex', '3');
    expect(tRows[1]).toHaveTextContent('China');

    expect(tRows[2]).toHaveAttribute('aria-rowindex', '4');
    expect(tRows[2]).toHaveTextContent('France');

    expect(tRows[3]).toHaveAttribute('aria-rowindex', '5');
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
      result.current.sort();
    });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    const sortableTable = screen.getByTestId(testId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    expect(sortableTable).toHaveAttribute(
      'aria-label',
      'Custom table with sortable content',
    );
    expect(sortableTable).toHaveAttribute('data-testid', testId);
    expect(sortableTable).toHaveAttribute('aria-rowcount', '5');
    expect(sortableTable).toHaveAttribute('aria-colcount', '3');

    const rowgroups = within(sortableTable).getAllByRole('rowgroup');
    const tRows = within(rowgroups[1]).getAllByRole('row');

    // verify country column is sorted z -> a
    expect(tRows).toHaveLength(4);
    expect(tRows[0]).toHaveAttribute('aria-rowindex', '2');
    expect(tRows[0]).toHaveTextContent('USA');

    expect(tRows[1]).toHaveAttribute('aria-rowindex', '3');
    expect(tRows[1]).toHaveTextContent('France');

    expect(tRows[2]).toHaveAttribute('aria-rowindex', '4');
    expect(tRows[2]).toHaveTextContent('China');

    expect(tRows[3]).toHaveAttribute('aria-rowindex', '5');
    expect(tRows[3]).toHaveTextContent('Canada');
  });
});

describe('Sortable DataTable with useAsyncList', () => {
  const testId = 'sortableTable';
  const defaultProps = {
    'aria-label': 'Custom table with sortable content',
    width: '100%',
    height: '100%',
    density: 'spacious',
    'data-testid': testId,
  };

  const sortableDataTable = ({ result }) => render(
    <DataTable
      {...defaultProps}
      sortDescriptor={result.current.sortDescriptor.direction}
      onSortChange={result.current.sort}
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn align="center" allowsSorting>
            {column.name}
          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={result.current.items}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell>{item[columnKey]}</DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>,
  );

  test('click on column header should sort column A => Z', async () => {
    const { result } = renderHook(() => useAsyncList({
      async load() {
        return {
          items: rows,
        };
      },
      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            // eslint-disable-next-line radix
            let cmp = (parseInt(first) || first) < (parseInt(second) || second)
              ? -1
              : 1;
            if (sortDescriptor.direction === 'descending') {
              cmp *= -1;
            }
            return cmp;
          }),
        };
      },

      initialSortDescriptor: { column: 'country', direction: 'descending' },
    }));

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    const sortableTable = screen.getByTestId(testId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    const headers = within(sortableTable).getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveAttribute('aria-colindex', '1');
    expect(headers[1]).toHaveAttribute('aria-colindex', '2');
    expect(headers[2]).toHaveAttribute('aria-colindex', '3');
    expect(headers[0]).toHaveTextContent(columns[0].name);
    expect(headers[1]).toHaveTextContent(columns[1].name);
    expect(headers[2]).toHaveTextContent(columns[2].name);

    expect(result.current.items[0].country).toBe('USA');
    expect(result.current.items[1].country).toBe('Canada');
    expect(result.current.items[2].country).toBe('China');
    expect(result.current.items[3].country).toBe('France');

    expect(result.current.items[0].population).toBe(320000000);
    expect(result.current.items[1].population).toBe(37000000);
    expect(result.current.items[2].population).toBe(1398000000);
    expect(result.current.items[3].population).toBe(67000000);

    expect(result.current.items[0].continent).toBe('North America');
    expect(result.current.items[1].continent).toBe('North America');
    expect(result.current.items[2].continent).toBe('Asia');
    expect(result.current.items[3].continent).toBe('Europe');

    await actHooks(async () => {
      fireEvent.click(headers[0]);
    });

    expect(result.current.items[0].country).toBe('Canada');
    expect(result.current.items[1].country).toBe('China');
    expect(result.current.items[2].country).toBe('France');
    expect(result.current.items[3].country).toBe('USA');

    await actHooks(async () => {
      fireEvent.click(headers[1]);
    });

    expect(result.current.items[0].population).toBe(37000000);
    expect(result.current.items[1].population).toBe(67000000);
    expect(result.current.items[2].population).toBe(320000000);
    expect(result.current.items[3].population).toBe(1398000000);

    await actHooks(async () => {
      fireEvent.click(headers[2]);
    });

    expect(result.current.items[0].continent).toBe('Asia');
    expect(result.current.items[1].continent).toBe('Europe');
    expect(result.current.items[2].continent).toBe('North America');
    expect(result.current.items[3].continent).toBe('North America');
  });

  test('click on column header should sort column Z => A', async () => {
    const { result } = renderHook(() => useAsyncList({
      async load() {
        return {
          items: rows,
        };
      },
      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            // eslint-disable-next-line radix
            let cmp = (parseInt(first) || first) < (parseInt(second) || second)
              ? -1
              : 1;
            if (sortDescriptor.direction === 'descending') {
              cmp *= -1;
            }
            return cmp;
          }),
        };
      },

      initialSortDescriptor: { column: 'country', direction: 'ascending' },
    }));

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    sortableDataTable({ result });

    await actHooks(async () => {
      jest.runOnlyPendingTimers();
    });

    const sortableTable = screen.getByTestId(testId);
    expect(sortableTable).toBeInTheDocument();
    expect(sortableTable).toBeVisible();

    const headers = within(sortableTable).getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveAttribute('aria-colindex', '1');
    expect(headers[1]).toHaveAttribute('aria-colindex', '2');
    expect(headers[2]).toHaveAttribute('aria-colindex', '3');
    expect(headers[0]).toHaveTextContent(columns[0].name);
    expect(headers[1]).toHaveTextContent(columns[1].name);
    expect(headers[2]).toHaveTextContent(columns[2].name);

    expect(result.current.items[0].country).toBe('USA');
    expect(result.current.items[1].country).toBe('Canada');
    expect(result.current.items[2].country).toBe('China');
    expect(result.current.items[3].country).toBe('France');

    expect(result.current.items[0].population).toBe(320000000);
    expect(result.current.items[1].population).toBe(37000000);
    expect(result.current.items[2].population).toBe(1398000000);
    expect(result.current.items[3].population).toBe(67000000);

    expect(result.current.items[0].continent).toBe('North America');
    expect(result.current.items[1].continent).toBe('North America');
    expect(result.current.items[2].continent).toBe('Asia');
    expect(result.current.items[3].continent).toBe('Europe');

    await actHooks(async () => {
      fireEvent.click(headers[0]);
    });

    expect(result.current.items[0].country).toBe('Canada');
    expect(result.current.items[1].country).toBe('China');
    expect(result.current.items[2].country).toBe('France');
    expect(result.current.items[3].country).toBe('USA');

    expect(result.current.items[0].continent).toBe('North America');
    expect(result.current.items[1].continent).toBe('Asia');
    expect(result.current.items[2].continent).toBe('Europe');
    expect(result.current.items[3].continent).toBe('North America');

    expect(result.current.items[0].population).toBe(37000000);
    expect(result.current.items[1].population).toBe(1398000000);
    expect(result.current.items[2].population).toBe(67000000);
    expect(result.current.items[3].population).toBe(320000000);
  });
});

describe('Empty DataTable', () => {
  const staticDataTable = () => render(
    <DataTable aria-label="Table">
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn align="center">{column.name}</DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody>
        {[]}
      </DataTableBody>
    </DataTable>,
  );

  it('should display header row only when there are no items', () => {
    staticDataTable();
    const staticTable = screen.getByRole('grid');
    const tRows = within(staticTable).getByRole('row');

    expect(staticTable).toBeInTheDocument();
    expect(staticTable).toBeVisible();
    expect(tRows).toBeInTheDocument();
  });
});
