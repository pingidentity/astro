import React from 'react';
import { useAsyncList } from 'react-stately';
import { act as actHooks, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

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

test('should change selection on mouse press', async () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');

  expect(rows[1]).not.toHaveClass('is-selected');
  await userEvent.click(rows[1]);
  expect(rows[1]).toHaveClass('is-selected');
});

test('should NOT change selection on row body click when hasSelectionCheckboxes is true', async () => {
  getComponent({ selectionMode: 'multiple', hasSelectionCheckboxes: true });
  const rows = screen.getAllByRole('row');
  // Click on a cell (the actual user target) — cell-level stopPropagation prevents
  // the row's press handler from firing, so no selection is triggered.
  const firstBodyRowCells = rows[1].querySelectorAll('td');

  expect(rows[1]).not.toHaveClass('is-selected');
  await userEvent.click(firstBodyRowCells[1]);
  expect(rows[1]).not.toHaveClass('is-selected');
});

test('should change selection via checkbox when hasSelectionCheckboxes is true', async () => {
  getComponent({ selectionMode: 'multiple', hasSelectionCheckboxes: true });
  const rows = screen.getAllByRole('row');
  const firstRowCheckbox = within(rows[1]).getByRole('checkbox');

  expect(rows[1]).not.toHaveClass('is-selected');
  await userEvent.click(firstRowCheckbox);
  expect(rows[1]).toHaveClass('is-selected');
});

test('mousedown on a cell does not bubble to row via React synthetic event', () => {
  // Verify that the cell-level stopPropagation approach prevents the row's React
  // onMouseDown handler from firing. We test this with a simple isolated component
  // that matches the structure used in TableCell (mergeProps with stopPropagation).
  // The full integration is covered by the hasSelectionCheckboxes test above.
  const rowSpy = jest.fn();
  render(
    <table>
      <tbody>
        <tr data-testid="test-row" onMouseDown={rowSpy}>
          <td
            data-testid="test-cell"
            {...{ onMouseDown: (e: React.MouseEvent) => e.stopPropagation() }}
          >
            cell content
          </td>
        </tr>
      </tbody>
    </table>,
  );
  fireEvent.mouseDown(screen.getByTestId('test-cell'));
  // The row's React onMouseDown should not have fired because stopPropagation
  // was called on the td's synthetic onMouseDown handler.
  expect(rowSpy).not.toHaveBeenCalled();
});

test('should toggle selection on Enter key when row is focused', async () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');

  await userEvent.tab();
  expect(rows[1]).toHaveFocus();
  expect(rows[1]).not.toHaveClass('is-selected');

  fireEvent.keyDown(rows[1], { key: 'Enter' });
  expect(rows[1]).toHaveClass('is-selected');

  fireEvent.keyDown(rows[1], { key: 'Enter' });
  expect(rows[1]).not.toHaveClass('is-selected');
});

test('Enter key should toggle selection on focused row with checkboxes', async () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');

  await userEvent.tab();
  expect(rows[1]).toHaveFocus();
  expect(rows[1]).not.toHaveClass('is-selected');

  fireEvent.keyDown(rows[1], { key: 'Enter' });
  expect(rows[1]).toHaveClass('is-selected');
});

test('Enter key should not change selection when selectionMode is none', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');

  await userEvent.tab();
  expect(rows[1]).toHaveFocus();
  expect(rows[1]).not.toHaveClass('is-selected');

  fireEvent.keyDown(rows[1], { key: 'Enter' });
  expect(rows[1]).not.toHaveClass('is-selected');
});

test('Enter key should toggle a row checkbox when the checkbox input is focused', () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');
  const checkboxes = screen.getAllByRole('checkbox');

  expect(rows[1]).not.toHaveClass('is-selected');
  // focus() triggers React Aria focus state updates and must be wrapped in act
  actHooks(() => { checkboxes[1].focus(); });
  fireEvent.keyDown(checkboxes[1], { key: 'Enter' });
  expect(rows[1]).toHaveClass('is-selected');

  fireEvent.keyDown(checkboxes[1], { key: 'Enter' });
  expect(rows[1]).not.toHaveClass('is-selected');
});

test('Enter key should toggle select-all checkbox when it is focused', () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');
  const selectAllCheckbox = screen.getByTestId('select-all-checkbox');

  rows.slice(1).forEach(row => expect(row).not.toHaveClass('is-selected'));
  actHooks(() => { selectAllCheckbox.focus(); });
  fireEvent.keyDown(selectAllCheckbox, { key: 'Enter' });
  rows.slice(1).forEach(row => expect(row).toHaveClass('is-selected'));
});

test('should change select all checkbox on mouse press', () => {
  getComponent({ selectionMode: 'multiple' });
  const rows = screen.getAllByRole('row');
  rows.forEach(async element => {
    await userEvent.click(element);
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

test('tab key should focus on the first cell of the first row', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  await userEvent.tab();
  expect(rows[1]).toHaveFocus();
});

test('Arrow Down key should focus the next row', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  await userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowDown' });
  fireEvent.keyUp(rows[1], { key: 'ArrowDown' });
  expect(rows[2]).toHaveFocus();

  fireEvent.keyDown(rows[2], { key: 'ArrowDown' });
  fireEvent.keyUp(rows[2], { key: 'ArrowDown' });
  expect(rows[3]).toHaveFocus();
});

test('Arrow Up key should focus the next row', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  await userEvent.tab();
  expect(rows[1]).toHaveFocus();

  fireEvent.keyDown(rows[1], { key: 'ArrowUp' });
  fireEvent.keyUp(rows[1], { key: 'ArrowUp' });

  const columnheader = screen.getAllByRole('columnheader');
  expect(columnheader[0]).toHaveFocus();
});

test('Arrow Right move the focus to next cell', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  const firstRow = screen.getAllByRole('row')[1];
  const tableCells = firstRow.querySelectorAll('td');

  await userEvent.tab();
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

test('Arrow Left move the focus to next cell', async () => {
  getComponent();
  const rows = screen.getAllByRole('row');
  const firstRow = screen.getAllByRole('row')[1];
  const tableCells = firstRow.querySelectorAll('td');

  await userEvent.tab();
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

describe('Resizable columns', () => {
  const resizableHeaders = [
    { key: 'name', name: 'Name' },
    { key: 'value', name: 'Value' },
  ];

  const resizableObjects = [
    { key: '1', name: 'Alpha', value: '10' },
    { key: '2', name: 'Beta', value: '20' },
  ];

  test('renders resize slider input for a resizable column', () => {
    render(
      <TableBase aria-label="resizable table">
        <THead columns={resizableHeaders}>
          {head => (
            <Column key={head.key} allowsResizing>
              {head.name}
            </Column>
          )}
        </THead>
        <TBody items={resizableObjects}>
          {row => (
            <Row key={row.key}>
              {columnKey => <Cell>{row[columnKey]}</Cell>}
            </Row>
          )}
        </TBody>
      </TableBase>,
    );

    // Each resizable column renders a visually-hidden <input type="range">
    // accessible as role="slider" with an aria-label containing the column name
    const slider = screen.getByRole('slider', { name: /Name column width/i });
    expect(slider).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /Value column width/i })).toBeInTheDocument();
  });

  test('resizable table has no accessibility violations', async () => {
    jest.useRealTimers();
    const { container } = render(
      <TableBase aria-label="resizable table">
        <THead columns={resizableHeaders}>
          {head => (
            <Column key={head.key} allowsResizing>
              {head.name}
            </Column>
          )}
        </THead>
        <TBody items={resizableObjects}>
          {row => (
            <Row key={row.key}>
              {columnKey => <Cell>{row[columnKey]}</Cell>}
            </Row>
          )}
        </TBody>
      </TableBase>,
    );
    const results = await axe(container);
    jest.useFakeTimers();
    expect(results).toHaveNoViolations();
  });

  test('does not render resize slider input for a non-resizable column', () => {
    render(
      <TableBase aria-label="non-resizable table">
        <THead columns={resizableHeaders}>
          {head => (
            <Column key={head.key}>
              {head.name}
            </Column>
          )}
        </THead>
        <TBody items={resizableObjects}>
          {row => (
            <Row key={row.key}>
              {columnKey => <Cell>{row[columnKey]}</Cell>}
            </Row>
          )}
        </TBody>
      </TableBase>,
    );

    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  describe('keyboard resizing', () => {
    const getResizableWithCallbacks = (props = {}) => render(
      <TableBase aria-label="resizable table" {...props}>
        <THead columns={resizableHeaders}>
          {head => (
            <Column key={head.key} allowsResizing>
              {head.name}
            </Column>
          )}
        </THead>
        <TBody items={resizableObjects}>
          {row => (
            <Row key={row.key}>
              {columnKey => <Cell>{row[columnKey]}</Cell>}
            </Row>
          )}
        </TBody>
      </TableBase>,
    );

    test('Enter on resizer input starts resize and calls onResizeStart', () => {
      const onResizeStart = jest.fn();
      getResizableWithCallbacks({ onResizeStart });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
    });

    test('ArrowRight during active resize calls onResize', () => {
      const onResize = jest.fn();
      getResizableWithCallbacks({ onResize });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onResize).toHaveBeenCalledTimes(1);
    });

    test('ArrowLeft during active resize calls onResize', () => {
      const onResize = jest.fn();
      getResizableWithCallbacks({ onResize });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
      expect(onResize).toHaveBeenCalledTimes(1);
    });

    test('multiple ArrowRight presses each call onResize', () => {
      const onResize = jest.fn();
      getResizableWithCallbacks({ onResize });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onResize).toHaveBeenCalledTimes(3);
    });

    test('Escape ends resize and calls onResizeEnd', () => {
      const onResizeEnd = jest.fn();
      getResizableWithCallbacks({ onResizeEnd });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'Escape' });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
    });

    test('Space ends resize and calls onResizeEnd', () => {
      const onResizeEnd = jest.fn();
      getResizableWithCallbacks({ onResizeEnd });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: ' ' });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
    });

    test('second Enter ends resize and calls onResizeEnd', () => {
      const onResizeEnd = jest.fn();
      getResizableWithCallbacks({ onResizeEnd });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'Enter' });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
    });

    test('ArrowRight before resize starts does not call onResize', () => {
      const onResize = jest.fn();
      getResizableWithCallbacks({ onResize });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onResize).not.toHaveBeenCalled();
    });

    test('onResize is not called after resize ends', () => {
      const onResize = jest.fn();
      getResizableWithCallbacks({ onResize });

      const slider = screen.getByRole('slider', { name: /Name column width/i });
      actHooks(() => { slider.focus(); });

      fireEvent.keyDown(slider, { key: 'Enter' });
      fireEvent.keyDown(slider, { key: 'Escape' });
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(onResize).not.toHaveBeenCalled();
    });
  });
});

describe('onRowAction behavior', () => {
  test('clicking a cell fires onRowAction with the correct row key', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');
    const firstBodyRowCells = rows[1].querySelectorAll('td');

    await userEvent.click(firstBodyRowCells[0]);
    expect(onRowAction).toHaveBeenCalledTimes(1);
    expect(onRowAction).toHaveBeenCalledWith('1');
  });

  test('rows receive has-actions class when onRowAction is provided', () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // All body rows (skip the header row at index 0) should have the has-actions class
    rows.slice(1).forEach(row => {
      expect(row).toHaveClass('has-actions');
    });
  });

  test('rows do not receive has-actions class when onRowAction is absent', () => {
    getComponent();
    const rows = screen.getAllByRole('row');

    rows.slice(1).forEach(row => {
      expect(row).not.toHaveClass('has-actions');
    });
  });

  test('pressing Enter on a focused row fires onRowAction when selectionMode is none', async () => {
    const onRowAction = jest.fn();
    getComponent({ selectionMode: 'none', onRowAction });
    const rows = screen.getAllByRole('row');

    await userEvent.tab();
    expect(rows[1]).toHaveFocus();

    // React Aria's usePress fires the action on keyUp (press completion),
    // so both keyDown and keyUp must be fired.
    fireEvent.keyDown(rows[1], { key: 'Enter' });
    fireEvent.keyUp(rows[1], { key: 'Enter' });
    expect(onRowAction).toHaveBeenCalledTimes(1);
    expect(onRowAction).toHaveBeenCalledWith('1');
  });

  test('clicking an action row applies is-focused class to that row', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // Click a cell in the first body row (rows[0] is the header row)
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);

    // First body row should have is-focused; all other body rows should not
    expect(rows[1]).toHaveClass('is-focused');
    expect(rows[2]).not.toHaveClass('is-focused');
    expect(rows[3]).not.toHaveClass('is-focused');
    expect(rows[4]).not.toHaveClass('is-focused');

    // Click a cell in the second body row — highlight should move
    const secondBodyRowCells = rows[2].querySelectorAll('td');
    await userEvent.click(secondBodyRowCells[0]);

    expect(rows[2]).toHaveClass('is-focused');
    expect(rows[1]).not.toHaveClass('is-focused');
  });

  test('no row has is-focused before any click with onRowAction', () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // At mount time, no body row should have is-focused from active-row state
    rows.slice(1).forEach(row => {
      expect(row).not.toHaveClass('is-focused');
    });
  });

  test('clicking a row without onRowAction does not apply is-focused', async () => {
    getComponent();
    const rows = screen.getAllByRole('row');
    const firstBodyRowCells = rows[1].querySelectorAll('td');

    await userEvent.click(firstBodyRowCells[0]);

    // Without onRowAction the active-row path is not triggered
    expect(rows[1]).not.toHaveClass('is-focused');
  });

  test('keyboard-focused row receives is-focused when onRowAction is present (AC4)', async () => {
    const onRowAction = jest.fn();
    getComponent({ selectionMode: 'none', onRowAction });
    const rows = screen.getAllByRole('row');

    // Tab into the table so the first body row has keyboard focus
    await userEvent.tab();
    expect(rows[1]).toHaveFocus();

    // The row must have is-focused from keyboard focus (isFocusVisible path unchanged)
    expect(rows[1]).toHaveClass('is-focused');
  });

  test('is-focused class appears only once when keyboard-focused row is also the active row (AC5)', async () => {
    const onRowAction = jest.fn();
    getComponent({ selectionMode: 'none', onRowAction });
    const rows = screen.getAllByRole('row');

    // Click the first body row to set activeRowKey
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);
    expect(rows[1]).toHaveClass('is-focused');

    // Count occurrences of the class — must be exactly 1
    const isFocusedCount = rows[1].className
      .split(/\s+/)
      .filter(cls => cls === 'is-focused').length;
    expect(isFocusedCount).toBe(1);
  });

  test('clicking a row focuses the row <tr> so arrow keys work via React Aria', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // Click a cell in the first body row
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);

    // The <tr> for the clicked row should now have DOM focus
    expect(rows[1]).toHaveFocus();

    // Arrow keys should then navigate via React Aria
    fireEvent.keyDown(rows[1], { key: 'ArrowDown' });
    fireEvent.keyUp(rows[1], { key: 'ArrowDown' });
    expect(rows[2]).toHaveFocus();
  });

  test('is-focused (active border) clears when focus leaves the table', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // Click a cell in the first body row to set activeRowKey
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);
    expect(rows[1]).toHaveClass('is-focused');

    // Flush the setTimeout(0) that resets actionJustFired so the blur handler
    // can proceed normally for genuine focus-out events.
    actHooks(() => { jest.runAllTimers(); });

    // Use focusOut (which bubbles) to reach the onBlur handler on the scroll
    // container, simulating focus leaving the table entirely.
    fireEvent.focusOut(rows[1], { relatedTarget: null });

    // is-focused should be cleared
    expect(rows[1]).not.toHaveClass('is-focused');
  });

  test('clicking an already-active row toggles activeRowKey off (clears is-focused)', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    const firstBodyRowCells = rows[1].querySelectorAll('td');

    // First click sets the row as active
    await userEvent.click(firstBodyRowCells[0]);
    expect(rows[1]).toHaveClass('is-focused');

    // Second click on the same row should toggle it off
    await userEvent.click(firstBodyRowCells[0]);
    expect(rows[1]).not.toHaveClass('is-focused');
  });

  test('active-row highlight does not clear when focus moves to an overlay panel', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // Click the first body row — sets activeRowKey and fires onRowAction
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);
    expect(rows[1]).toHaveClass('is-focused');

    // Simulate OverlayPanel FocusScope stealing focus to an element outside the table.
    // The actionJustFired guard (set synchronously in wrappedOnRowAction) should
    // absorb this blur and keep the active-row highlight intact.
    const panelButton = document.createElement('button');
    document.body.appendChild(panelButton);
    fireEvent.focusOut(rows[1], { relatedTarget: panelButton });

    // Highlight must survive the focus-steal
    expect(rows[1]).toHaveClass('is-focused');

    document.body.removeChild(panelButton);
  });

  test('Enter key on a focused action row applies is-focused to that row', async () => {
    const onRowAction = jest.fn();
    getComponent({ selectionMode: 'none', onRowAction });
    const rows = screen.getAllByRole('row');

    // Tab to put keyboard focus on the first body row
    await userEvent.tab();
    expect(rows[1]).toHaveFocus();

    // Press Enter to trigger onRowAction via keyboard
    fireEvent.keyDown(rows[1], { key: 'Enter' });
    fireEvent.keyUp(rows[1], { key: 'Enter' });
    expect(onRowAction).toHaveBeenCalledWith('1');

    // The row should carry is-focused (active-row state set from keyboard action)
    expect(rows[1]).toHaveClass('is-focused');
  });

  test('active-row highlight clears when arrow keys move focus to another row', async () => {
    const onRowAction = jest.fn();
    getComponent({ onRowAction });
    const rows = screen.getAllByRole('row');

    // Click row 1 to set it as active (simulates opening a panel)
    const firstBodyRowCells = rows[1].querySelectorAll('td');
    await userEvent.click(firstBodyRowCells[0]);

    // Flush the setTimeout(0) guard so subsequent focus events are not swallowed
    actHooks(() => { jest.runAllTimers(); });

    expect(rows[1]).toHaveClass('is-focused');

    // Simulate the panel closing by returning focus to the row
    fireEvent.focus(rows[1]);

    // Arrow Down moves focus to row 2 — row 1 should lose is-focused
    fireEvent.keyDown(rows[1], { key: 'ArrowDown' });
    fireEvent.keyUp(rows[1], { key: 'ArrowDown' });
    fireEvent.focus(rows[2]);

    expect(rows[1]).not.toHaveClass('is-focused');
    expect(rows[2]).toHaveFocus();
  });
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
