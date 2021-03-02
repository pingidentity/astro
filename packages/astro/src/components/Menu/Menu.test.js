import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import { Menu, Item } from '../../index';

const testTitle = 'Test Title';
const defaultProps = {
  title: testTitle,
  'aria-label': 'testLabel',
};
const defaultItems = [
  { key: 'a', children: 'A' },
  { key: 'b', children: 'B' },
  { key: 'c', children: 'C' },
];

const getComponent = (props = {}) => render((
  <Menu {...defaultProps} {...props}>
    {defaultItems.map(item => <Item key={item.key} {...item} />)}
  </Menu>
));

test('should render basic menu with children', () => {
  getComponent();
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitem');
  expect(menuItems).toHaveLength(3);
});

test('should render items when selectionMode is set to single', () => {
  getComponent({ selectionMode: 'single' });
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitemradio');
  expect(menuItems).toHaveLength(3);
});

test('should render items when selectionMode is set to multiple', () => {
  getComponent({ selectionMode: 'multiple' });
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitemcheckbox');
  expect(menuItems).toHaveLength(3);
});

test('applies disabled class with disabled prop', () => {
  getComponent({ isDisabled: true });
  const menuItems = screen.getAllByRole('menuitem');
  menuItems.forEach(item => expect(item).toHaveClass('is-disabled'));
});

test('should be able to navigate through the items with the keyboard', () => {
  getComponent();
  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems[0]).not.toHaveFocus();

  // Need to tab to them first
  userEvent.tab();
  expect(menuItems[0]).toHaveFocus();

  // Then we can use the arrow keys
  fireEvent.keyDown(menuItems[0], { key: 'ArrowDown' });
  fireEvent.keyUp(menuItems[0], { key: 'ArrowDown' });
  expect(menuItems[0]).not.toHaveFocus();
  expect(menuItems[1]).toHaveFocus();

  fireEvent.keyDown(menuItems[1], { key: 'ArrowDown' });
  fireEvent.keyUp(menuItems[1], { key: 'ArrowDown' });
  expect(menuItems[1]).not.toHaveFocus();
  expect(menuItems[2]).toHaveFocus();
});

test('should fire onAction', () => {
  const onAction = jest.fn();
  getComponent({ onAction });
  const menuItems = screen.getAllByRole('menuitem');
  expect(onAction).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onAction).toHaveBeenNthCalledWith(1, defaultItems[0].key);

  // Click events
  userEvent.click(menuItems[1]);
  expect(onAction).toHaveBeenNthCalledWith(2, defaultItems[1].key);
});

test('should not fire onSelectionChange when selectionMode is none', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const menuItems = screen.getAllByRole('menuitem');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Click events
  userEvent.click(menuItems[1]);
  expect(onSelectionChange).not.toHaveBeenCalled();
});

test('should fire onSelectionChange when selectionMode is not none', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange, selectionMode: 'single' });
  const menuItems = screen.getAllByRole('menuitemradio');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onSelectionChange).toHaveBeenNthCalledWith(
    1,
    expect.any(Set),
  );

  // Click events
  userEvent.click(menuItems[1]);
  expect(onSelectionChange).toHaveBeenNthCalledWith(
    2,
    expect.any(Set),
  );
});
