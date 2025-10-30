import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item } from '../..';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import GridList from './GridList';

const items = [
  { name: 'Item 1', key: 'item1' },
  { name: 'Item 2', key: 'item2' },
  { name: 'Item 3', key: 'item3' },
];

const getDefaultComponent = (props?: object) => render(
  <GridList items={items} {...props}>
    {item => (
      <Item key={item.key} textValue={item.name}>
        {item.name}
      </Item>
    )}
  </GridList>,
);

describe('GridList Component', () => {
  test('renders GridList with items', () => {
    getDefaultComponent({});
    const list = screen.getByRole('grid');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('row');
    expect(listItems).toHaveLength(items.length);

    items.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test('renders GridListRow for each item', () => {
    getDefaultComponent({});
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(items.length);
  });

  test('handles keyboard navigation', async () => {
    getDefaultComponent();
    const rows = screen.getAllByRole('row');

    await userEvent.tab();
    expect(rows[0]).toHaveClass('is-focused');

    fireEvent.keyDown(rows[0], { key: 'ArrowDown' });
    expect(rows[1]).toHaveClass('is-focused');

    fireEvent.keyDown(rows[1], { key: 'ArrowUp' });
    expect(rows[0]).toHaveClass('is-focused');
  });

  test('handles drag and drop functionality', async () => {
    const onReorder = jest.fn();
    getDefaultComponent({ isReorderable: true, onReorder });

    const rows = screen.getAllByRole('row');
    const list = screen.getByRole('grid');
    const buttons = screen.getAllByRole('button');
    await userEvent.tab();

    fireEvent.keyDown(rows[0], { key: 'ArrowRight' });
    fireEvent.keyUp(rows[0], { key: 'ArrowRight' });
    fireEvent.keyDown(buttons[0], { key: 'Enter' });
    fireEvent.keyUp(buttons[0], { key: 'Enter' });
    const insertionIndicator = await screen.findByTestId('insertion-indicator');
    await userEvent.type(list, '{arrowdown}');
    await userEvent.type(insertionIndicator, '{enter}');
    expect(onReorder).toHaveBeenCalled();
  });

  test('able to drop at bottom', async () => {
    const onReorder = jest.fn();
    getDefaultComponent({ isReorderable: true, onReorder });

    const rows = screen.getAllByRole('row');
    const list = screen.getByRole('grid');
    const buttons = screen.getAllByRole('button');
    await userEvent.tab();

    fireEvent.keyDown(rows[0], { key: 'ArrowRight' });
    fireEvent.keyUp(rows[0], { key: 'ArrowRight' });
    fireEvent.keyDown(buttons[0], { key: 'Enter' });
    fireEvent.keyUp(buttons[0], { key: 'Enter' });
    const insertionIndicator = await screen.findByTestId('insertion-indicator');
    await userEvent.type(list, '{arrowdown}');
    await userEvent.type(list, '{arrowdown}');
    await userEvent.type(insertionIndicator, '{enter}');
    expect(onReorder).toHaveBeenCalled();
  });

  test('renders GridList with containerProps', () => {
    getDefaultComponent({
      containerProps: { sx: { background: 'red' } },
    });
    const list = screen.getByRole('grid');
    expect(list).toHaveStyle('background: red');
  });

  test('renders GridList with rowProps', () => {
    getDefaultComponent({
      rowProps: { sx: { background: 'red' } },
    });
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveStyle('background: red');
  });

  test('renders GridList with cellProps', () => {
    getDefaultComponent({
      cellProps: { sx: { background: 'red' } },
    });
    const gridCells = screen.getAllByRole('gridcell');
    expect(gridCells[0]).toHaveStyle('background: red');
  });
});
